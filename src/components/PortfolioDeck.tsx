import type { ReactNode } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowUpRight,
  Check,
  EnvelopeSimple,
  GithubLogo,
  Globe,
  Info,
  InstagramLogo,
  MapPin,
  Student,
  UserCircle,
} from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'motion/react'
import {
  profile,
  projects,
  uiStrings,
  type Lang,
  type Project,
} from '../data/portfolio'

type SlideProps = {
  lang: Lang
  setSlideRef: (index: number) => (node: HTMLElement | null) => void
}

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
}

export function PortfolioDeck() {
  const deckRef = useRef<HTMLElement | null>(null)
  const slideRefs = useRef<(HTMLElement | null)[]>([])
  const reduceMotion = useReducedMotion()
  const [activeSlide, setActiveSlide] = useState(0)
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem('portfolio_lang')
      return saved === 'id' ? 'id' : 'en'
    } catch {
      return 'en'
    }
  })

  const toggleLang = (newLang: Lang) => {
    setLang(newLang)
    try {
      localStorage.setItem('portfolio_lang', newLang)
    } catch {}
  }

  const totalSlides = projects.length + 2

  const slideIds = useMemo(
    () => ['cover', 'biodata', ...projects.map((project) => project.id)],
    [],
  )

  const setSlideRef = (index: number) => (node: HTMLElement | null) => {
    slideRefs.current[index] = node
  }

  const goToSlide = useCallback(
    (index: number) => {
      const target = slideRefs.current[index]

      if (!target) return

      target.scrollIntoView({
        block: 'start',
        behavior: reduceMotion ? 'auto' : 'smooth',
      })
    },
    [reduceMotion],
  )

  const goToNextSlide = useCallback(() => {
    const nextIndex = activeSlide === totalSlides - 1 ? 0 : activeSlide + 1
    goToSlide(nextIndex)
  }, [activeSlide, goToSlide, totalSlides])

  useEffect(() => {
    const root = deckRef.current

    if (!root) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (!visibleEntry) return

        const index = Number(
          (visibleEntry.target as HTMLElement).dataset.slideIndex,
        )

        if (Number.isFinite(index)) {
          setActiveSlide(index)
        }
      },
      {
        root,
        threshold: [0.58, 0.72, 0.86],
      },
    )

    slideRefs.current.forEach((slide) => {
      if (slide) observer.observe(slide)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const nextKeys = ['ArrowDown', 'PageDown']
      const previousKeys = ['ArrowUp', 'PageUp']

      if (nextKeys.includes(event.key)) {
        event.preventDefault()
        goToSlide(Math.min(activeSlide + 1, totalSlides - 1))
      }

      if (previousKeys.includes(event.key)) {
        event.preventDefault()
        goToSlide(Math.max(activeSlide - 1, 0))
      }

      if (event.key === 'Home') {
        event.preventDefault()
        goToSlide(0)
      }

      if (event.key === 'End') {
        event.preventDefault()
        goToSlide(totalSlides - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeSlide, goToSlide, totalSlides])

  return (
    <main
      ref={deckRef}
      className="deck"
      aria-label="Apple Developer Academy portfolio slides"
    >
      <LanguageSwitcher lang={lang} onToggle={toggleLang} />
      <HeroSlide setSlideRef={setSlideRef} lang={lang} />
      <BioSlide setSlideRef={setSlideRef} lang={lang} />
      {projects.map((project, index) => (
        <ProjectSlide
          key={project.id}
          project={project}
          lang={lang}
          slideIndex={index + 2}
          setSlideRef={setSlideRef}
        />
      ))}

      <SlideNavigation
        activeSlide={activeSlide}
        totalSlides={totalSlides}
        currentSlideId={slideIds[activeSlide]}
        lang={lang}
        onNext={goToNextSlide}
      />
    </main>
  )
}

function HeroSlide({ setSlideRef }: SlideProps) {
  const reduceMotion = useReducedMotion()

  return (
    <section
      ref={setSlideRef(0)}
      id="cover"
      className="slide hero-slide"
      data-slide-index="0"
      aria-label="Portfolio cover"
    >
      <motion.div
        className="hero-frame"
        initial={reduceMotion ? false : 'hidden'}
        animate="show"
        transition={{ staggerChildren: reduceMotion ? 0 : 0.08 }}
      >
        <motion.p className="name-pill" variants={reveal}>
          {profile.fullName.toUpperCase()}
        </motion.p>

        <motion.div className="poster-lockup" variants={reveal}>
          <h1
            className="poster-title"
            aria-label="Personal portfolio for Apple Developer Academy"
          >
            <span className="poster-line poster-line-blue">PERSONAL</span>
            <span className="academy-stamp" aria-hidden="true">
              <span>APPLE</span>
              <span>DEVELOPER</span>
              <span>ACADEMY</span>
            </span>
            <span className="poster-line">PORTFOLIO</span>
          </h1>
        </motion.div>
      </motion.div>
    </section>
  )
}

function BioSlide({ setSlideRef, lang }: SlideProps) {
  const reduceMotion = useReducedMotion()

  return (
    <section
      ref={setSlideRef(1)}
      id="biodata"
      className="slide bio-slide"
      data-slide-index="1"
      aria-label="Biodata"
    >
      <div className="slide-inner bio-inner">
        <div className="bio-strip" aria-label="Portfolio biodata summary">
          <InfoBlock
            icon={<UserCircle size={19} weight="bold" />}
            title={uiStrings[lang].candidateName}
            value={profile.fullName}
            note="Full-Stack & AI Engineer"
          />
          <InfoBlock
            icon={<Student size={19} weight="bold" />}
            title={uiStrings[lang].universityDegree}
            value={profile.university[lang]}
            note={profile.status[lang]}
          />
          <InfoBlock
            icon={<EnvelopeSimple size={19} weight="bold" />}
            title={uiStrings[lang].contactInfo}
            value={profile.phone}
            note={profile.email}
          />
          <div className="submission-mark">
            <span>{uiStrings[lang].submissionFor}</span>
            <strong>Apple Developer Academy Indonesia</strong>
          </div>
        </div>

        <div className="bio-content">
          <motion.div
            className="bio-photo-wrapper"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src="/profile.svg"
              alt={profile.fullName}
              className="bio-photo"
              loading="lazy"
            />
          </motion.div>

          <div className="bio-details">
            <motion.div
              className="bio-title-block"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="name-pill bio-pill">BIODATA</p>
              <h2 className="bio-title">
                <span>INTRO</span>
                <span>DUCTION</span>
              </h2>
              <p className="bio-summary">{profile.summary[lang]}</p>
            </motion.div>

            <motion.div
              className="bio-facts"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: reduceMotion ? 0 : 0.5,
                delay: reduceMotion ? 0 : 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {profile.focus.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </motion.div>
          </div>
        </div>

        <ContactStrip lang={lang} />
      </div>
    </section>
  )
}

type InfoBlockProps = {
  icon: ReactNode
  title: string
  value: string
  note: string
}

function InfoBlock({ icon, title, value, note }: InfoBlockProps) {
  return (
    <div className="info-block">
      <div className="info-icon" aria-hidden="true">
        {icon}
      </div>
      <div>
        <strong>{title}</strong>
        <span>{value}</span>
        <em>{note}</em>
      </div>
    </div>
  )
}

type ProjectSlideProps = {
  project: Project
  slideIndex: number
  lang: Lang
  setSlideRef: (index: number) => (node: HTMLElement | null) => void
}

function ProjectSlide({
  project,
  slideIndex,
  lang,
  setSlideRef,
}: ProjectSlideProps) {
  const reduceMotion = useReducedMotion()
  const isImageLeft = project.layout === 'image-left'

  return (
    <section
      ref={setSlideRef(slideIndex)}
      id={project.id}
      className="slide project-slide"
      data-slide-index={slideIndex}
      aria-label={`${project.titleLead} ${project.titleAccent}`}
    >
      <div className="slide-inner project-inner">
        <header className="project-header">
          <p className="name-pill role-pill">{project.role}</p>
          <p className="date-mark">
            <Info size={22} weight="bold" aria-hidden="true" />
            {project.date[lang]}
          </p>
        </header>

        <div
          className={`project-grid ${
            isImageLeft ? 'project-grid-image-left' : ''
          }`}
        >
          <motion.div
            className="project-copy"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: reduceMotion ? 0 : 0.52, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="project-title">
              <span>{project.titleLead}</span>
              <span>{project.titleAccent}</span>
            </h2>
            <p className="project-description">{project.description[lang]}</p>
            <a
              className="publication-link"
              href={`https://${project.publicationUrl}`}
              target="_blank"
              rel="noreferrer"
            >
              <strong>{project.publicationLabel[lang]}</strong>
              <span>{project.publicationUrl}</span>
            </a>
          </motion.div>

          <motion.div
            className="project-media"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: reduceMotion ? 0 : 0.56,
              delay: reduceMotion ? 0 : 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <img
              src={project.image}
              alt={`${project.titleLead} ${project.titleAccent}`}
              className="project-image"
              loading="lazy"
              width={1500}
              height={1000}
            />
          </motion.div>
        </div>

        <ContactStrip lang={lang} />
      </div>
    </section>
  )
}

function ContactStrip({ lang }: { lang: Lang }) {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <footer className="contact-strip" aria-label={uiStrings[lang].contactInfo}>
      <button
        type="button"
        className={`contact-item contact-btn ${copied ? 'copied' : ''}`}
        onClick={handleCopyEmail}
        title={uiStrings[lang].copyTitle}
        aria-label={copied ? uiStrings[lang].copied : uiStrings[lang].copyAria}
      >
        {copied ? (
          <Check size={19} weight="bold" aria-hidden="true" />
        ) : (
          <EnvelopeSimple size={19} weight="bold" aria-hidden="true" />
        )}
        <span>{copied ? uiStrings[lang].copied : profile.email}</span>
      </button>

      <a
        href="https://instagram.com/j.mahiswara_"
        target="_blank"
        rel="noreferrer"
        className="contact-item contact-link"
        title={uiStrings[lang].instagramTitle}
      >
        <InstagramLogo size={19} weight="bold" aria-hidden="true" />
        <span>{profile.instagram}</span>
      </a>

      <a
        href={`https://${profile.social}`}
        target="_blank"
        rel="noreferrer"
        className="contact-item contact-link"
        title={uiStrings[lang].githubTitle}
      >
        <GithubLogo size={19} weight="bold" aria-hidden="true" />
        <span>{profile.social}</span>
      </a>

      <a
        href={`https://${profile.website}`}
        target="_blank"
        rel="noreferrer"
        className="contact-item contact-link"
        title={uiStrings[lang].websiteTitle}
      >
        <Globe size={19} weight="bold" aria-hidden="true" />
        <span>{profile.website}</span>
      </a>

      <a
        href="https://maps.google.com/?q=Surabaya,+Indonesia"
        target="_blank"
        rel="noreferrer"
        className="contact-item contact-link"
        title={uiStrings[lang].mapsTitle}
      >
        <MapPin size={19} weight="bold" aria-hidden="true" />
        <span>{profile.location[lang]}</span>
      </a>
    </footer>
  )
}

type SlideNavigationProps = {
  activeSlide: number
  totalSlides: number
  currentSlideId: string
  lang: Lang
  onNext: () => void
}

function SlideNavigation({
  activeSlide,
  totalSlides,
  currentSlideId,
  lang,
  onNext,
}: SlideNavigationProps) {
  const isLastSlide = activeSlide === totalSlides - 1

  return (
    <div className="slide-navigation" aria-label="Slide navigation">
      <span className="sr-only" aria-live="polite">
        {uiStrings[lang].currentSlide} {activeSlide + 1} {uiStrings[lang].of}{' '}
        {totalSlides}: {currentSlideId}
      </span>
      <button
        type="button"
        className="slide-next"
        onClick={onNext}
        aria-label={
          isLastSlide ? uiStrings[lang].backToCover : uiStrings[lang].nextSlide
        }
        title={
          isLastSlide ? uiStrings[lang].backToCover : uiStrings[lang].nextSlide
        }
      >
        <ArrowUpRight size={29} weight="regular" aria-hidden="true" />
      </button>
    </div>
  )
}

type LanguageSwitcherProps = {
  lang: Lang
  onToggle: (lang: Lang) => void
}

function LanguageSwitcher({ lang, onToggle }: LanguageSwitcherProps) {
  return (
    <nav className="lang-switcher" aria-label="Language selection">
      <button
        type="button"
        className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
        onClick={() => onToggle('en')}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
      <span className="lang-divider" aria-hidden="true">
        /
      </span>
      <button
        type="button"
        className={`lang-btn ${lang === 'id' ? 'active' : ''}`}
        onClick={() => onToggle('id')}
        aria-pressed={lang === 'id'}
      >
        ID
      </button>
    </nav>
  )
}
