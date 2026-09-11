export type Lang = 'en' | 'id'

export type LocalizedString = {
  en: string
  id: string
}

export type Profile = {
  fullName: string
  university: LocalizedString
  status: LocalizedString
  semester: LocalizedString
  phone: string
  email: string
  social: string
  instagram: string
  website: string
  location: LocalizedString
  summary: LocalizedString
  focus: string[]
}

export type Project = {
  id: string
  titleLead: string
  titleAccent: string
  role: string
  date: LocalizedString
  description: LocalizedString
  publicationLabel: LocalizedString
  publicationUrl: string
  layout: 'image-right' | 'image-left'
  image: string
}

export const uiStrings = {
  en: {
    candidateName: 'Candidate Name',
    universityDegree: 'University / Degree',
    contactInfo: 'Contact Information',
    submissionFor: 'Portfolio Submission for',
    submissionCohort: 'Indonesia Cohort',
    copied: 'Copied!',
    copyTitle: 'Click to copy email',
    copyAria: 'Copy email address',
    instagramTitle: 'Visit Instagram @j.mahiswara_',
    githubTitle: 'Visit GitHub Profile',
    websiteTitle: 'Visit Personal Website',
    mapsTitle: 'View location on Google Maps',
    nextSlide: 'Next slide',
    backToCover: 'Back to cover',
    currentSlide: 'Current slide',
    of: 'of',
  },
  id: {
    candidateName: 'Nama Kandidat',
    universityDegree: 'Universitas / Jenjang',
    contactInfo: 'Informasi Kontak',
    submissionFor: 'Pengajuan Portofolio untuk',
    submissionCohort: 'Angkatan Indonesia',
    copied: 'Tersalin!',
    copyTitle: 'Klik untuk menyalin email',
    copyAria: 'Salin alamat email',
    instagramTitle: 'Kunjungi Instagram @j.mahiswara_',
    githubTitle: 'Kunjungi Profil GitHub',
    websiteTitle: 'Kunjungi Website Pribadi',
    mapsTitle: 'Lihat lokasi di Google Maps',
    nextSlide: 'Slide berikutnya',
    backToCover: 'Kembali ke sampul',
    currentSlide: 'Slide saat ini',
    of: 'dari',
  },
} as const

export const profile: Profile = {
  fullName: 'Gadang Jatu Mahiswara',
  university: {
    en: 'Universitas Negeri Surabaya',
    id: 'Universitas Negeri Surabaya',
  },
  status: {
    en: 'Informatics Engineering · GPA 3.74',
    id: 'Teknik Informatika · IPK 3.74',
  },
  semester: {
    en: 'Bachelor Undergraduate (2023 – Present)',
    id: 'S1 Sarjana (2023 – Sekarang)',
  },
  phone: '+62 812-1631-2645',
  email: 'gadangjatumahiswara@gmail.com',
  social: 'github.com/jmahiswara1',
  instagram: '@j.mahiswara_',
  website: 'jmahiswara.my.id',
  location: {
    en: 'Surabaya, East Java',
    id: 'Surabaya, Jawa Timur',
  },
  summary: {
    en: 'Informatics Engineering undergraduate at UNESA with over 2 years of experience in full-stack web development and AI engineering. Experienced in building modern, scalable web applications, RAG chatbot pipelines, and award-winning solutions across front-end and back-end systems.',
    id: 'Mahasiswa S1 Teknik Informatika di UNESA dengan pengalaman lebih dari 2 tahun dalam pengembangan web full-stack dan rekayasa AI. Berpengalaman membangun aplikasi web modern yang skalabel, pipeline RAG chatbot, serta solusi berprestasi di seluruh sistem front-end dan back-end.',
  },
  focus: [
    'Full-Stack Web Development',
    'Generative AI & RAG Engineering',
    'UI/UX & Frontend Architecture',
    'Cloud, Microservices & Databases',
  ],
}

export const projects: Project[] = [
  {
    id: 'mediflow',
    titleLead: 'MEDI',
    titleAccent: 'FLOW',
    role: 'FRONTEND DEVELOPER (3RD PLACE WINNER)',
    date: {
      en: 'August 2026',
      id: 'Agustus 2026',
    },
    description: {
      en: 'Achieved 3rd Place in Healtech Frontend Code Challenge 2026. Developed a medical stock monitoring and distribution platform featuring interactive analytics dashboards, hospital network visualization, and automated stock transfer workflows with React, TypeScript, Vite, and Tailwind CSS.',
      id: 'Meraih Juara 3 dalam Healtech Frontend Code Challenge 2026. Mengembangkan platform pemantauan dan distribusi stok medis dengan dasbor analitik interaktif, visualisasi jaringan rumah sakit, dan alur transfer stok otomatis menggunakan React, TypeScript, Vite, dan Tailwind CSS.',
    },
    publicationLabel: {
      en: 'GITHUB REPOSITORY',
      id: 'REPOSITORI GITHUB',
    },
    publicationUrl: 'github.com/jmahiswara1/MediFlow',
    layout: 'image-right',
    image: '/assets/projects/mediflow.webp',
  },
  {
    id: 'bki-rag-chatbot',
    titleLead: 'BKI RAG',
    titleAccent: 'CHATBOT',
    role: 'GEN AI ENGINEER (SOLO PROJECT)',
    date: {
      en: 'April – July 2026',
      id: 'April – Juli 2026',
    },
    description: {
      en: 'Engineered an end-to-end RAG-based AI chatbot for BKI Hull 2026 maritime regulations using Python, Ollama, PostgreSQL, and pgvector. Implemented document chunking, hybrid retrieval, reranking, and guardrail pipelines to deliver accurate responses and reduce hallucinations.',
      id: 'Merancang chatbot AI berbasis RAG dari awal hingga akhir untuk regulasi maritim BKI Hull 2026 menggunakan Python, Ollama, PostgreSQL, dan pgvector. Mengimplementasikan chunking dokumen, hybrid retrieval, reranking, dan guardrail untuk menghasilkan jawaban akurat serta meminimalkan halusinasi.',
    },
    publicationLabel: {
      en: 'GITHUB REPOSITORY',
      id: 'REPOSITORI GITHUB',
    },
    publicationUrl: 'github.com/jmahiswara1/bki-rag-chatbot',
    layout: 'image-left',
    image: '/assets/projects/bki-rag-chatbot.webp',
  },
  {
    id: 'karsa',
    titleLead: 'KARSA',
    titleAccent: 'WORKSPACE',
    role: 'FULL-STACK DEVELOPER (SOLO PROJECT)',
    date: {
      en: 'May – July 2026',
      id: 'Mei – Juli 2026',
    },
    description: {
      en: 'Built a full-stack AI-powered productivity platform across three microservices. Features interactive Kanban boards with drag & drop, hierarchical notes organization, multi-view calendar with Google Calendar sync, and an AI assistant for natural language task and entity creation.',
      id: 'Membangun platform produktivitas full-stack berbasis AI di tiga microservices. Dilengkapi Kanban board interaktif dengan drag & drop, hierarki catatan terstruktur, kalender multi-tampilan tersinkronisasi Google Calendar, dan asisten AI untuk pembuatan tugas melalui bahasa alami.',
    },
    publicationLabel: {
      en: 'GITHUB REPOSITORY',
      id: 'REPOSITORI GITHUB',
    },
    publicationUrl: 'github.com/jmahiswara1/Karsa',
    layout: 'image-right',
    image: '/assets/projects/karsa.webp',
  },
  {
    id: 'minexia-optimize',
    titleLead: 'MINEXIA',
    titleAccent: 'OPTIMIZE',
    role: 'FULLSTACK DEVELOPER (BEST CAPSTONE)',
    date: {
      en: 'November 2025 – January 2026',
      id: 'November 2025 – Januari 2026',
    },
    description: {
      en: 'Achieved Best Capstone Project in Asah led by Dicoding 2025. Developed an AI decision-intelligence platform optimizing mining supply chains, with predictive ML models for production forecasting, cycle time, and equipment failure probability, backed by PostgreSQL and RESTful APIs.',
      id: 'Meraih Best Capstone Project di program Asah oleh Dicoding 2025. Mengembangkan platform decision intelligence berbasis AI untuk optimasi rantai pasok pertambangan, dengan model ML prediksi volume produksi, cycle time, dan probabilitas kegagalan alat yang terhubung dengan PostgreSQL dan RESTful API.',
    },
    publicationLabel: {
      en: 'GITHUB REPOSITORY',
      id: 'REPOSITORI GITHUB',
    },
    publicationUrl: 'github.com/jmahiswara1/minexia-optimize',
    layout: 'image-left',
    image: '/assets/projects/minexia-optimize.webp',
  },
  {
    id: 'ticketin-platform',
    titleLead: 'TICKETIN',
    titleAccent: 'PLATFORM',
    role: 'FULL-STACK DEVELOPER (SOLO PROJECT)',
    date: {
      en: 'May – September 2026',
      id: 'Mei – September 2026',
    },
    description: {
      en: 'Architected and implemented both frontend and backend of TicketIn Platform, a full-stack ticketing web application. Developed RESTful APIs, database-driven workflows, and frontend–backend data synchronization supporting end-to-end event management and booking.',
      id: 'Merancang dan mengimplementasikan frontend serta backend TicketIn Platform, sebuah aplikasi web tiket full-stack. Mengembangkan RESTful API, alur kerja berbasis database, serta sinkronisasi data frontend–backend untuk manajemen acara dan pemesanan tiket secara menyeluruh.',
    },
    publicationLabel: {
      en: 'GITHUB REPOSITORY',
      id: 'REPOSITORI GITHUB',
    },
    publicationUrl: 'github.com/jmahiswara1/TicketIn',
    layout: 'image-right',
    image: '/assets/projects/ticketin-platform.webp',
  },
]
