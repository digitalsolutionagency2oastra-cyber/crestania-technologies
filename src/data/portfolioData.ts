export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  metrics: string[];
  techStack: string[];
  image: string;
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
}

export interface Milestone {
  id: string;
  type: 'experience' | 'education';
  title: string;
  organization: string;
  location: string;
  period: string;
  status: 'completed' | 'current';
  description: string[];
  technologies: string[];
  gradeOrMetric?: string;
}

export interface Certification {
  id: string;
  code: string;
  title: string;
  issuer: string;
  issueDate: string;
  verificationHash: string;
  credentialUrl: string;
  badgeAccent: string;
  competencies: string[];
  summary: string;
}

export interface SkillCategory {
  category: string;
  skills: {
    name: string;
    proficiency: number;
    highlight?: boolean;
  }[];
}

export const CANDIDATE = {
  name: 'Astra',
  fullName: 'Astra V.',
  role: 'Full-Stack Developer, UI/UX Designer & AI Engineer',
  shortBio:
    'Creative and technology-focused Web Developer, UI/UX Designer, and AI Chatbot Developer with skills in designing modern digital experiences and developing functional websites and web applications across the full lifecycle.',
  fullBio:
    'I architect end-to-end digital experiences — spanning intuitive UI/UX design, precision frontend systems, robust backend architectures, distributed APIs, databases, and autonomous AI-powered chatbot integrations. My focus is engineering websites that are blisteringly fast, hyper-responsive, and visually indelible.',
  email: 'digitalsolutionagency2.o.astra@gmail.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://x.com',
  location: 'Global / Remote',
  availableForHire: true,
  statusMessage: 'OPEN TO OPPORTUNITIES & CONTRACTS',
  metrics: [
    { label: 'Academic CGPA', value: '8.94 / 10', detail: 'Computer Science & Engineering' },
    { label: 'Production Projects', value: '38+', detail: 'Web Apps & AI Deployments' },
    { label: 'DSA Problems Solved', value: '450+', detail: 'LeetCode & CodeChef' },
    { label: 'System Uptime Avg', value: '99.98%', detail: 'Production Cloud SLA' },
  ],
};

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-1',
    code: 'AWS-SAA-9042',
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    issueDate: '2024',
    verificationHash: 'SHA256://8f94e2b07e81cc1309d94b08a192809e3a',
    credentialUrl: 'https://aws.amazon.com/verification',
    badgeAccent: '#FF9900',
    competencies: ['VPC Architecture', 'Serverless Lambda', 'High Availability', 'IAM Security', 'S3 / CloudFront'],
    summary: 'Validated expertise in architecting secure, resilient, and elastic cloud infrastructure on AWS enterprise systems.'
  },
  {
    id: 'cert-2',
    code: 'META-FE-7819',
    title: 'Meta Senior Frontend Engineer Professional',
    issuer: 'Meta Platforms Inc.',
    issueDate: '2023',
    verificationHash: 'SHA256://3b81c4e1291884dc9210aa394f0e72901a',
    credentialUrl: 'https://coursera.org/verify/meta',
    badgeAccent: '#0668E1',
    competencies: ['React 19 Architecture', 'Web Performance Tuning', 'Advanced State Management', 'UI/UX Accessibility (a11y)'],
    summary: 'Advanced mastery of modern React component design patterns, DOM rendering reconciliation, and WCAG AA accessibility compliance.'
  },
  {
    id: 'cert-3',
    code: 'OAI-AI-4420',
    title: 'OpenAI Certified AI & LLM Systems Engineer',
    issuer: 'Deep Learning & AI Consortium',
    issueDate: '2024',
    verificationHash: 'SHA256://9c18f3d8a0112839b208c909e44b50912f',
    credentialUrl: 'https://credentials.deeplearning.ai',
    badgeAccent: '#10A37F',
    competencies: ['Retrieval Augmented Generation (RAG)', 'Tool Calling & Agents', 'Vector Indexing (Pinecone)', 'Context Window Optimization'],
    summary: 'Specialized certification in productionizing multi-agent workflows, autonomous LLM pipelines, and vector semantic retrieval.'
  },
  {
    id: 'cert-4',
    code: 'GCP-PCD-3310',
    title: 'Google Professional Cloud Developer',
    issuer: 'Google Cloud Platform',
    issueDate: '2023',
    verificationHash: 'SHA256://d47a90b1e77ca8992019b88301fa31872d',
    credentialUrl: 'https://cloud.google.com/certification',
    badgeAccent: '#4285F4',
    competencies: ['Cloud Run Microservices', 'Firestore / Cloud SQL', 'Artifact Registry', 'Cloud Pub/Sub Messaging'],
    summary: 'Demonstrated proficiency in building cloud-native microservices, automated CI/CD pipelines, and secure API gateways.'
  },
  {
    id: 'cert-5',
    code: 'NNG-UX-5521',
    title: 'UI/UX Interaction Design Master',
    issuer: 'Interaction Design Foundation',
    issueDate: '2023',
    verificationHash: 'SHA256://7e66d1f900114782bb190209ae8430a90e',
    credentialUrl: 'https://interaction-design.org',
    badgeAccent: '#E0002A',
    competencies: ['Design Systems', 'Micro-interactions', 'Information Architecture', 'Figma Prototyping', 'Heuristic Evaluation'],
    summary: 'Rigorous credential covering visual psychology, cognitive ergonomics, zero-pill layout discipline, and design system governance.'
  },
  {
    id: 'cert-6',
    code: 'MDB-DEV-2098',
    title: 'MongoDB Certified Developer Associate',
    issuer: 'MongoDB Inc.',
    issueDate: '2022',
    verificationHash: 'SHA256://1a58e9d3004817a99c98a280c44c88390b',
    credentialUrl: 'https://learn.mongodb.com/verify',
    badgeAccent: '#00ED64',
    competencies: ['Aggregation Pipelines', 'Schema Modeling', 'Indexing Strategies', 'Atlas Vector Search'],
    summary: 'Proven capability in designing high-throughput NoSQL schemas, compound indexing, and vector similarity clustering.'
  },
];

export const MILESTONES: Milestone[] = [
  {
    id: 'exp-1',
    type: 'experience',
    title: 'Lead Full-Stack & AI Solutions Developer',
    organization: 'NextGen Cyber Labs & Agency',
    location: 'Remote',
    period: '2023 — Present',
    status: 'current',
    description: [
      'Architected and delivered 14+ client web applications featuring autonomous AI chatbot workflows and dynamic interactive frontends.',
      'Reduced average page load latency by 52% across client portfolios using Next.js / Vite server-side rendering, code splitting, and asset optimization.',
      'Integrated enterprise RAG chatbot systems with vector embeddings, slashing client tier-1 support ticket resolution time by 68%.'
    ],
    technologies: ['React 19', 'TypeScript', 'Node.js', 'Tailwind CSS', 'OpenAI / Gemini SDK', 'PostgreSQL', 'Docker'],
    gradeOrMetric: '+52% Load Velocity'
  },
  {
    id: 'exp-2',
    type: 'experience',
    title: 'Senior UI/UX & Frontend Engineer',
    organization: 'CyberPulse Interactive',
    location: 'Contract',
    period: '2022 — 2023',
    status: 'completed',
    description: [
      'Designed end-to-end design systems in Figma and implemented pixel-perfect component libraries in React with Tailwind CSS.',
      'Constructed cursor-driven 3D WebGL scenes, interactive canvas shaders, and smooth kinetic micro-interactions.',
      'Collaborated closely with cross-functional product teams to ensure WCAG 2.1 AA accessibility across all digital platforms.'
    ],
    technologies: ['Figma', 'React', 'TypeScript', 'Tailwind CSS', 'Motion', 'WebGL / Canvas', 'GraphQL'],
    gradeOrMetric: 'Award-Nominated UI'
  },
  {
    id: 'exp-3',
    type: 'experience',
    title: 'Web Developer & AI Automation Specialist',
    organization: 'Apex Digital Agency',
    location: 'Hybrid',
    period: '2021 — 2022',
    status: 'completed',
    description: [
      'Engineered bespoke eCommerce portals, customer support bots, and internal workflow automation tooling for regional brands.',
      'Built and maintained high-throughput REST APIs and GraphQL microservices connected to MongoDB and PostgreSQL.',
      'Spearheaded automated testing with Jest and Cypress, reducing regression bugs in production releases by 35%.'
    ],
    technologies: ['JavaScript', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'Tailwind CSS', 'CI/CD'],
    gradeOrMetric: '35% Fewer Bugs'
  },
  {
    id: 'edu-1',
    type: 'education',
    title: 'B.Tech in Computer Science & Engineering',
    organization: 'Institute of Technology & Engineering',
    location: 'Campus',
    period: '2018 — 2022',
    status: 'completed',
    description: [
      'Graduated with honors with a focus on Distributed Computing, Human-Computer Interaction (HCI), and Artificial Intelligence.',
      'Lead Developer for the University Innovation Hub — created the central campus events and project collaboration platform.',
      'Authored capstone research on real-time neural semantic parsing for conversational interfaces.'
    ],
    technologies: ['Algorithms & Data Structures', 'Operating Systems', 'Database Systems', 'Computer Networks', 'Machine Learning'],
    gradeOrMetric: 'CGPA: 8.94 / 10'
  },
  {
    id: 'edu-2',
    type: 'education',
    title: 'Advanced Specialization in Deep Learning & NLP',
    organization: 'DeepLearning.AI / Stanford Online',
    location: 'Online Credential',
    period: '2022 — 2023',
    status: 'completed',
    description: [
      'Comprehensive study of Transformer architectures, attention mechanisms, vector databases, and multi-agent orchestration.',
      'Implemented custom fine-tuning pipelines and semantic search indexes using Python, PyTorch, and Hugging Face.'
    ],
    technologies: ['PyTorch', 'Transformers', 'Vector Embeddings', 'Prompt Engineering', 'LangChain'],
    gradeOrMetric: 'Honor Roll (98.4%)'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'CyberAgent OS',
    subtitle: 'Autonomous Multi-Model AI Chatbot Platform',
    category: 'AI & Full-Stack',
    description:
      'Production-grade multi-agent chatbot engine with real-time vector search retrieval, tool-calling execution, streaming responses, and customizable UI widgets for website integration.',
    metrics: ['Sub-200ms latency', '99.4% intent accuracy', '10k+ daily queries'],
    techStack: ['React 19', 'TypeScript', 'FastAPI', 'Gemini API', 'Pinecone', 'Tailwind CSS'],
    image: '/src/assets/images/project_cyber_agent_1790230805169.jpg',
    demoUrl: '#',
    githubUrl: 'https://github.com',
    featured: true
  },
  {
    id: 'proj-2',
    title: 'QuantVibe Terminal',
    subtitle: 'High-Frequency Analytics & WebGL Visualization',
    category: 'Frontend & Data',
    description:
      'Dark cybernetic financial terminal with streaming WebSocket price action, GPU-accelerated candlestick visualizations, interactive depth charts, and automated algorithmic signal alerts.',
    metrics: ['60 FPS WebGL rendering', '<12ms WebSocket feed', '12 real-time indicators'],
    techStack: ['TypeScript', 'WebGL', 'React', 'Tailwind CSS', 'WebSockets', 'RxJS'],
    image: '/src/assets/images/project_trading_desk_1790230818779.jpg',
    demoUrl: '#',
    githubUrl: 'https://github.com',
    featured: true
  },
  {
    id: 'proj-3',
    title: 'Aetheria Design System',
    subtitle: 'Dark Neo-Brutalist Component Architecture',
    category: 'UI/UX & Design',
    description:
      'Enterprise design system crafted for dark-mode-first applications. Features 60+ accessible components, strict zero-pill discipline, typographic hierarchy, and tokenized CSS variables.',
    metrics: ['60+ atomic components', 'WCAG AA 100% pass', 'Zero-runtime tokens'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Figma Tokens', 'Storybook'],
    image: '/src/assets/images/cyber_developer_hero_1790230770127.jpg',
    demoUrl: '#',
    githubUrl: 'https://github.com',
    featured: false
  },
  {
    id: 'proj-4',
    title: 'NeuroCanvas Studio',
    subtitle: 'Generative AI Creative Artboard & Shader Suite',
    category: 'Creative Tech',
    description:
      'Interactive canvas workstation enabling visual artists to orchestrate image synthesis, real-time GLSL shader distortions, and multi-layer compositing directly in the browser.',
    metrics: ['Multi-layer canvas engine', 'GLSL custom shaders', 'Instant export'],
    techStack: ['Canvas API', 'WebGL', 'TypeScript', 'Node.js', 'Express', 'Tailwind'],
    image: '/src/assets/images/cyber_developer_side_1790230780672.jpg',
    demoUrl: '#',
    githubUrl: 'https://github.com',
    featured: false
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Languages',
    skills: [
      { name: 'TypeScript', proficiency: 96, highlight: true },
      { name: 'JavaScript (ESNext)', proficiency: 98, highlight: true },
      { name: 'Python', proficiency: 88, highlight: true },
      { name: 'SQL', proficiency: 85 },
      { name: 'C++', proficiency: 78 },
      { name: 'HTML5 & Modern CSS', proficiency: 98, highlight: true }
    ]
  },
  {
    category: 'Frontend Engineering',
    skills: [
      { name: 'React 19 / Next.js', proficiency: 95, highlight: true },
      { name: 'Tailwind CSS', proficiency: 98, highlight: true },
      { name: 'Motion / Framer', proficiency: 92, highlight: true },
      { name: 'WebGL & Canvas API', proficiency: 84 },
      { name: 'State (Zustand/Redux)', proficiency: 90 },
      { name: 'Performance & Web Vitals', proficiency: 94, highlight: true }
    ]
  },
  {
    category: 'Backend & APIs',
    skills: [
      { name: 'Node.js & Express', proficiency: 92, highlight: true },
      { name: 'FastAPI / Python', proficiency: 86 },
      { name: 'REST & GraphQL APIs', proficiency: 94, highlight: true },
      { name: 'WebSockets & SSE', proficiency: 89 },
      { name: 'Microservices Design', proficiency: 84 }
    ]
  },
  {
    category: 'Databases & Vectors',
    skills: [
      { name: 'PostgreSQL', proficiency: 90, highlight: true },
      { name: 'MongoDB', proficiency: 88 },
      { name: 'Redis (Caching)', proficiency: 86 },
      { name: 'Pinecone / Vector DBs', proficiency: 85, highlight: true },
      { name: 'Supabase / Firebase', proficiency: 88 }
    ]
  },
  {
    category: 'AI & Chatbots',
    skills: [
      { name: 'AI Chatbot Engineering', proficiency: 94, highlight: true },
      { name: 'RAG Pipeline Design', proficiency: 91, highlight: true },
      { name: 'Gemini / OpenAI APIs', proficiency: 95, highlight: true },
      { name: 'Prompt Orchestration', proficiency: 96 },
      { name: 'Autonomous Tool Use', proficiency: 88 }
    ]
  },
  {
    category: 'UI/UX & Creative',
    skills: [
      { name: 'Figma & Design Systems', proficiency: 95, highlight: true },
      { name: 'Kinetic Micro-interactions', proficiency: 92, highlight: true },
      { name: 'Zero-Pill Typography', proficiency: 96 },
      { name: 'Wireframing & Prototyping', proficiency: 90 },
      { name: 'Accessibility (WCAG AA)', proficiency: 92 }
    ]
  }
];
