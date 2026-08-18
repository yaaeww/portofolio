export type ProjectContribution = {
  title: string;
  detail: string;
  points?: string[];
};

export type Project = {
  title: string;
  problem: string;
  architecture: string;
  impact: string;
  description: string;
  tech: string[];
  image?: string;
  contributions?: ProjectContribution[];
};

export type Certificate = {
  title: string;
  issuer: string;
  year: string;
  image?: string;
};

export type Experience = {
  role: string;
  company: string;
  duration: string;
  points: string[];
};

export type FeaturedSkill = {
  title: string;
  subtitle: string;
  skills: string[];
  icon: "brain" | "layers" | "trend" | "shield" | "database" | "server" | "layout" | "cloud";
};

export type Organization = {
  role: string;
  organization: string;
  duration: string;
  description?: string;
};

export type Education = {
  school: string;
  degree?: string;
  year: string;
};

export type CVData = {
  name: string;
  title: string;
  summary: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  linkedinCertifications: string;
  linkedinSkills: string;
  skills: string[];
  featuredSkills: FeaturedSkill[];
  projects: Project[];
  certificates: Certificate[];
  experience: Experience;
  organizations: Organization[];
  education: Education[];
};

export const cvData: CVData = {
  name: "MUHAMMAD IHYA 'ULUMUDDIN",
  title: "Backend & Full Stack Software Engineer",
  summary:
    "Backend & Full Stack Software Engineer focused on building reliable, scalable systems. Experienced with Go, Node.js, PostgreSQL, and Redis in production payment platforms during internship at PT Aplikasi Dagang Teknologi. Strong believer that great software starts with understanding the problem deeply before writing a single line of code.",
  location: "Indonesia",
  email: "muhammadihya11289@gmail.com",
  github: "https://github.com/yaaeww",
  linkedin: "https://www.linkedin.com/in/muhammad-ihya-ulumuddin/",
  linkedinCertifications:
    "https://www.linkedin.com/in/muhammad-ihya-ulumuddin/details/certifications/",
  linkedinSkills:
    "https://www.linkedin.com/in/muhammad-ihya-ulumuddin/details/skills/",
  skills: [
    "Go",
    "PostgreSQL",
    "Node.js",
    "Docker",
    "Redis",
    "React",
    "TypeScript",
    "Next.js",
  ],
  featuredSkills: [
    {
      title: "Back-End Development",
      subtitle: "REST APIs & scalable services",
      skills: ["Go", "Node.js", "Express.js", "Gin", "Laravel"],
      icon: "server",
    },
    {
      title: "SQL & Database",
      subtitle: "Query optimization at scale",
      skills: ["PostgreSQL", "MySQL", "Redis", "Advanced SQL", "BigQuery"],
      icon: "database",
    },
    {
      title: "Cloud & Infrastructure",
      subtitle: "Containerized deployments & cloud services",
      skills: ["Docker", "AWS S3", "Azure Functions", "CI/CD"],
      icon: "cloud",
    },
    {
      title: "Front-End Development",
      subtitle: "Interactive web experiences",
      skills: ["React", "Next.js", "TypeScript", "Web Applications"],
      icon: "layout",
    },
    {
      title: "Machine Learning & AI",
      subtitle: "Modeling, feature engineering & deep learning",
      skills: ["Python", "scikit-learn", "Deep Learning", "Feature Engineering"],
      icon: "brain",
    },
    {
      title: "Data Science & Visualization",
      subtitle: "From raw data to clear insights",
      skills: ["Data Cleaning", "Data Visualization", "Geospatial Analysis"],
      icon: "layers",
    },
    {
      title: "Time Series Forecasting",
      subtitle: "Forecasting with hybrid models",
      skills: ["Forecasting", "Multistep Strategy", "Hybrid Models"],
      icon: "trend",
    },
    {
      title: "AI Ethics & Explainability",
      subtitle: "Transparent, responsible AI",
      skills: ["SHAP Values", "PDP", "Permutation Importance", "Bias Mitigation"],
      icon: "shield",
    },
  ],
  projects: [
    {
      title: "UangKu — Family Finance Management",
      problem:
        "Families lack transparent, collaborative tools for managing income, expenses, savings goals, and debts across multiple household members. Existing apps are either single-user or lack depth in multi-wallet tracking, budget enforcement, and financial coaching.",
      architecture:
        "Go (Gin) backend + PostgreSQL + React.js frontend. Multi-tenant isolation via JWT family_id claims with role-based access. GORM row-level locking prevents race conditions on concurrent wallet updates. Monthly PostgreSQL table partitioning (SAS method) scales transaction storage. A separate Node.js microservice (port 3002) handles OCR receipt scanning via Tesseract with bilingual support (Indonesian/English).",
      impact:
        "Atomic multi-wallet transactions with automatic reversal on delete/update. AI financial coach using OpenAI with a 3D behavioral persona framework (Discipline × Spending Nature × Consistency). WhatsApp alerting for budget thresholds via Fonnte API. OCR receipt scanning with regex-based merchant/amount extraction across IDR and USD formats.",
      description:
        "A full-stack family finance management platform built with Go, PostgreSQL, and React.js — featuring multi-wallet architecture, AI financial coaching, OCR receipt scanning, and dynamic budget planning.",
      tech: ["Golang", "Gin Framework", "PostgreSQL", "React.js", "Node.js"],
      image: "/project/uangku.webp",
      contributions: [
        {
          title: "Multi-Tenant Family Architecture",
          detail:
            "Implemented JWT-based authentication with family_id and family_role claims. A TenantMiddleware validates subscription status in real-time — expired or blocked families are denied access immediately. Legacy trial auto-recovery fills missing trial dates with a 7-day default.",
          points: [
            "JWT token isolation ensures every database query is automatically scoped to the correct family.",
            "Super Admin bypass for global system parameter management without family_id constraints.",
          ],
        },
        {
          title: "Multi-Wallet & Atomic Reversal Transactions",
          detail:
            "Developed a multi-wallet system supporting parallel fund sources (Main Account, Savings, Cash Wallet). GORM row-level locking prevents race conditions when multiple family members record transactions simultaneously.",
          points: [
            "Atomic reversal logic automatically returns funds to the original wallet on transaction delete or update.",
            "Savings allocation and debt deduction are handled within the same transaction boundary.",
          ],
        },
        {
          title: "AI Financial Coach (OpenAI Integration)",
          detail:
            "Built a behavioral analysis engine that classifies users into financial personas based on three axes: Discipline (Savings Rate), Spending Nature (wants vs needs ratio), and Consistency (balance stability). Integrated OpenAI for personalized financial advice.",
          points: [
            "Leak Detection Engine flags anomalous spending (e.g., food > 25% of monthly expenses when savings rate is low).",
            "Persona labels like 'Structured Essentialist — Steady' provide actionable self-awareness.",
          ],
        },
        {
          title: "OCR Receipt Scanning (Bilingual Tesseract)",
          detail:
            "Developed a Node.js microservice running Tesseract OCR with persistent bilingual workers (Indonesian + English). The Go backend parses extracted text using regex to identify merchants, transaction amounts (supporting Rp, USD, $, comma/dot decimals), and dates (ISO, DD-MM-YYYY, Indonesian month names).",
          points: [
            "Supports receipts up to 10MB with low latency via persistent worker processes.",
            "Merchant extraction excludes operational keywords (kasir, cashier) to improve accuracy.",
          ],
        },
        {
          title: "Budget Planning (50/30/10/10) & WhatsApp Alerting",
          detail:
            "Implemented automatic budget category seeding based on the 50/30/10/10 rule (Needs/Savings/Emergency/Wants) adapted for Indonesian household context. Integrated WhatsApp notifications via Fonnte API for real-time budget alerts.",
          points: [
            "Categories auto-created on family registration: Makanan & Dapur, Tagihan Rumah, Pendidikan, Transportasi, Kesehatan, Zakat & Sedekah, Hiburan.",
            "Async WhatsApp alerts fire when spending approaches or exceeds budget limits.",
          ],
        },
        {
          title: "Debt & Saving Goals with Asset Conversion",
          detail:
            "Built dynamic installment tracking with overpayment detection (auto-advances next due date) and H+1 overdue penalty engine. When a savings goal reaches 100%, the ConvertToAsset function moves funds into a family asset record.",
          points: [
            "Dynamic Cycle Advancement: overpayments accumulate to the next installment automatically.",
            "Saving goals transition from 'active' to 'converted' with full audit trail.",
          ],
        },
        {
          title: "TriPay Payment Gateway Integration",
          detail:
            "Integrated TriPay for premium subscription payments with HMAC-SHA256 callback signature verification. Precise customer fee calculation: Charge = (Price + Flat) / (1 - Percent/100).",
          points: [
            "Automatic premium activation after verified callback — no manual intervention.",
            "Supports multiple payment channels through TriPay's unified API.",
          ],
        },
        {
          title: "Dynamic Database Table Partitioning (SAS Method)",
          detail:
            "Implemented PostgreSQL range partitioning on the transactions table (transactions_YYYY_MM) to maintain query performance at scale. A daemon worker creates future partitions preemptively, with JIT fallback for edge cases.",
          points: [
            "Composite indexes (idx_transactions_performance_v4) keep financial analytics queries under 500ms.",
            "EnsurePartitionForDate handles late-arriving transactions gracefully.",
          ],
        },
      ],
    },
    {
      title: "Sistem Payment Point Online Bank (PPOB)",
      problem:
        "Payment platform handling bill payments and digital products needed a multi-level affiliate commission system, real-time product sync with external suppliers, and secure third-party API access with rate limiting.",
      architecture:
        "Node.js + Express.js backend with PostgreSQL and Sequelize ORM. Recursive CTE for 5-level commission traversal in a single query (avoids N+1). Redis for rate limiting (daily cap per API key) and price caching (30-min TTL). JWT + SHA-256 API key authentication. Gemini AI integration for automated SEO content generation with semantic validation pipeline.",
      impact:
        "Automated 5-level affiliate commission with anti-boncos hard cap preventing company losses. Dual caching (Redis + JSON file) prevented supplier API quota exhaustion. SEO articles auto-generated with structured data (JSON-LD FAQ Schema) and dynamic sitemap updates.",
      description:
        "Payment Point Online Bank platform for bill payments and digital product purchasing — built during internship at PT Aplikasi Dagang Teknologi with Node.js, PostgreSQL, and Redis.",
      tech: [
        "Node.js",
        "Express.js",
        "PostgreSQL",
        "Redis",
        "Sequelize ORM",
      ],
      image: "/project/ppob.webp",
      contributions: [
        {
          title: "5-Level Affiliate Commission System",
          detail:
            "Designed and implemented a multi-level commission distribution engine using Recursive CTE on PostgreSQL. The system traces the full sponsor chain in a single query, calculates commissions for all 5 upline levels, and applies an anti-boncos hard cap to prevent company losses.",
          points: [
            "Recursive CTE eliminates the N+1 Query Problem — one query traverses the entire sponsor hierarchy.",
            "Dynamic company profit margin adjusts upward (5-10%) when financial coverage drops below 50%.",
            "Hard Cap logic: if total planned commissions exceed allocated profit, all amounts are scaled by a ratio to prevent overdraft.",
          ],
        },
        {
          title: "SEO & Gemini AI Article Automation",
          detail:
            "Integrated Google Gemini AI (gemini-2.0-flash with exponential backoff fallback to flash-lite) for automated blog content generation. Built a semantic audit pipeline that validates HTML structure, keyword density (1.0-4.5%), and JSON-LD FAQ Schema before publishing.",
          points: [
            "Retry with corrective feedback if audit fails (missing H1, insufficient H2s, wrong keyword density).",
            "Dynamic sitemap XML auto-updates on new product/article creation.",
          ],
        },
        {
          title: "Role-Based Access Control (RBAC)",
          detail:
            "Implemented authentication via JWT and middleware-level RBAC on Express.js routes. Each API request is validated against PostgreSQL-stored permissions to ensure the token's role matches the endpoint's required actions.",
          points: [
            "Roles: Super Admin (full control), Admin (operational), Marketing (promo & content).",
            "Modular database-level permission schema prevents token misuse.",
          ],
        },
        {
          title: "Developer API & Redis Rate Limiter",
          detail:
            "Built a third-party integration module with SHA-256 API key authentication and Redis-based rate limiting. Daily request caps are enforced in real-time using Redis in-memory counters.",
          points: [
            "API Key validation on every request header prevents unauthorized access.",
            "Redis rate limiter protects against DDoS and vendor quota abuse.",
          ],
        },
        {
          title: "Supplier API Integration (Digiflazz)",
          detail:
            "Integrated with Digiflazz API for real-time product data and digital product transactions. Built dual-disk caching (JSON file with 30-min TTL) to prevent quota exhaustion, and single-SKU inquiry for price verification before each transaction.",
          points: [
            "MD5 signature verification (username + apiKey + refId) for transaction integrity.",
            "Double disk caching reduces API hit count by ~60% during peak hours.",
          ],
        },
      ],
    },
    {
      title: "FoodDash",
      problem:
        "Full-stack food delivery platform requiring multi-role access (customer/merchant/admin), real-time order tracking, integrated payment processing, and rating system — all within a single codebase.",
      architecture:
        "Laravel (PHP) + MySQL. Role-based middleware separates customer, merchant, and admin access. Midtrans Snap API handles payment processing with HMAC webhook signature verification for status confirmation.",
      impact:
        "End-to-end delivery system: multi-role authentication → product catalog with search/filter → cart → Midtrans payment → real-time order status tracking → rating & review → admin dashboard with analytics.",
      description:
        "Full-stack food delivery application built with Laravel — featuring multi-role access, Midtrans payment integration, real-time order tracking, and a complete admin dashboard.",
      tech: ["PHP", "Laravel", "MySQL", "Midtrans"],
      image: "/project/fooddash.webp",
      contributions: [
        {
          title: "Multi-Role Authentication & Access Control",
          detail:
            "Built secure login/registration with Laravel Auth and role-based middleware separating customer, merchant, and admin access paths. Multi-address support for delivery locations.",
          points: [
            "Session-based authentication with encrypted password storage.",
            "Role middleware ensures customers cannot access merchant/admin routes.",
          ],
        },
        {
          title: "Product Catalog & Search",
          detail:
            "Full CRUD for menu items and restaurants with category management, search by name, and filtering by price, category, and rating.",
          points: [
            "Restaurant owners manage their own menus (name, price, image, stock, category).",
            "Aggregated ratings displayed in catalog for quick comparison.",
          ],
        },
        {
          title: "Cart, Checkout & Order Management",
          detail:
            "Shopping cart with per-user subtotal, delivery fee, and total calculation. Checkout generates unique order codes with complete transaction history. Real-time status updates from merchant acceptance through delivery completion.",
          points: [
            "Order status flow: received → cooking → ready → delivering → completed.",
            "Full transaction history accessible to both users and admin.",
          ],
        },
        {
          title: "Midtrans Payment Integration",
          detail:
            "Integrated Midtrans Snap API supporting bank transfer, e-wallets, QRIS, and other channels. Webhook callback with signature key verification ensures payment status only changes on confirmed transactions.",
          points: [
            "Status handling for pending, success, and failure states.",
            "Automatic stock deduction after successful payment confirmation.",
          ],
        },
        {
          title: "Rating, Review & Notifications",
          detail:
            "Post-completion rating system for restaurants and menu items. Aggregated ratings auto-update in catalog. In-app notifications for order status changes and payment confirmations. Admin dashboard with order reports, revenue, and user management.",
          points: [
            "Rating validation restricts reviews to completed orders only.",
            "Admin dashboard provides real-time platform analytics.",
          ],
        },
      ],
    },
    {
      title: "AI-Based Mango Freshness Analysis",
      problem:
        "Manual fruit quality assessment is subjective, slow, and inconsistent across supply chains. There is no standardized, automated system to classify mango freshness from visual data.",
      architecture:
        "Python + scikit-learn (Random Forest) for multi-class classification. OpenCV pipeline for image segmentation and feature extraction (color in RGB/HSV, texture, size). Geographic API integration for land suitability analysis based on soil, climate, and elevation data.",
      impact:
        "Multi-class freshness classification (fresh / wilting / rotten) with optimized hyperparameters. Geographic land recommendation system combines prediction results with environmental data to advise optimal cultivation locations.",
      description:
        "AI-powered mango freshness analysis using Random Forest classification and OpenCV image processing, combined with geographic API for land suitability recommendations.",
      tech: ["Python", "scikit-learn", "Random Forest", "OpenCV", "Geographic API"],
      image: "/project/mangga.webp",
      contributions: [
        {
          title: "Random Forest Classification Model",
          detail:
            "Built a multi-class classifier using scikit-learn to categorize mango freshness (fresh, wilting, rotten) from extracted visual features. Evaluated using accuracy, precision, recall, and F1-score with hyperparameter tuning to prevent overfitting.",
          points: [
            "Feature extraction from skin color, surface texture, and fruit dimensions.",
            "Cross-validation and hyperparameter optimization for robust generalization.",
          ],
        },
        {
          title: "OpenCV Image Processing Pipeline",
          detail:
            "Developed a preprocessing pipeline using OpenCV for fruit segmentation (separating mango from background) and feature extraction (RGB/HSV color histograms, texture descriptors, size measurements).",
          points: [
            "Background subtraction isolates the mango region for consistent feature extraction.",
            "Color space conversion (RGB → HSV) improves feature robustness under varying lighting.",
          ],
        },
        {
          title: "Geographic Land Suitability Analysis",
          detail:
            "Integrated a geographic API to fetch soil condition, climate, and elevation data for given coordinates. Combined with freshness prediction to recommend optimal cultivation locations.",
          points: [
            "Spatial data (soil fertility, rainfall, elevation) fetched per coordinate.",
            "Suitability scoring combines environmental factors with freshness model output.",
          ],
        },
        {
          title: "REST API & Visualization Dashboard",
          detail:
            "Exposed prediction via REST API (image input → JSON response with class, confidence score, and recommendation). Built a dashboard showing classification distribution and interactive land suitability map.",
          points: [
            "Batch testing visualization shows freshness distribution across test samples.",
            "Interactive map displays land suitability results by geographic location.",
          ],
        },
      ],
    },
  ],
  certificates: [
    {
      title: "Sertifikat Magang — Programmer (Intern)",
      issuer: "PT Aplikasi Dagang Teknologi",
      year: "2026",
      image: "/sertifikat/sertifikat_magang_pt_adt.webp",
    },
    {
      title: "Sertifikat Kompetensi (UKK) — Teknik Komputer dan Jaringan",
      issuer: "Cisco Networking Academy",
      year: "2022",
      image: "/sertifikat/sertifikat_cisco_ukk.webp",
    },
    {
      title: "Techcomfest Web Application Competition",
      issuer: "Techcomfest — Politeknik Negeri Indramayu",
      year: "2026",
      image: "/sertifikat/techcomfest-2026.webp",
    },
    {
      title: "AI Ready ASEAN",
      issuer: "ASEAN Foundation",
      year: "2026",
      image: "/sertifikat/ai-ready-asean.webp",
    },
    {
      title: "Advanced SQL",
      issuer: "Kaggle",
      year: "2026",
      image: "/sertifikat/kaggle-advanced-sql.webp",
    },
    {
      title: "Intro to Machine Learning",
      issuer: "Kaggle",
      year: "2026",
      image: "/sertifikat/kaggle-intro-to-machine-learning.webp",
    },
    {
      title: "Intro to Programming",
      issuer: "Kaggle",
      year: "2026",
      image: "/sertifikat/kaggle-intro-to-programming.webp",
    },
    {
      title: "Intro to SQL",
      issuer: "Kaggle",
      year: "2026",
      image: "/sertifikat/kaggle-intro-to-sql.webp",
    },
    {
      title: "Pandas",
      issuer: "Kaggle",
      year: "2026",
      image: "/sertifikat/kaggle-pandas.webp",
    },
    {
      title: "Python",
      issuer: "Kaggle",
      year: "2026",
      image: "/sertifikat/kaggle-python.webp",
    },
    {
      title: "AWS S3 Basics",
      issuer: "Coursera Guided Project",
      year: "2026",
      image: "/sertifikat/thumbs/AWS-S3-Basics.webp",
    },
    {
      title: "Azure: create a REST API using NodeJS Serverless Functions",
      issuer: "Coursera Guided Project",
      year: "2026",
      image:
        "/sertifikat/thumbs/Azure-create-a-REST-API-using-NodeJS-Serverless-Functions.webp",
    },
    {
      title: "Build a computer vision app with Azure Cognitive Services",
      issuer: "Coursera Guided Project — Microsoft",
      year: "2026",
      image:
        "/sertifikat/thumbs/Build-a-computer-vision-app-with-Azure-Cognitive-Services.webp",
    },
    {
      title: "Build a free website with WordPress",
      issuer: "Coursera Guided Project",
      year: "2026",
      image: "/sertifikat/thumbs/Build-a-free-website-with-WordPress.webp",
    },
    {
      title: "Build a mobile app with Google Sheets on Glide and no coding",
      issuer: "Coursera Guided Project",
      year: "2026",
      image:
        "/sertifikat/thumbs/Build-a-mobile-app-with-Google-Sheets-on-Glide-and-no-coding.webp",
    },
    {
      title: "Business Analysis & Process Management",
      issuer: "Coursera Guided Project",
      year: "2026",
      image: "/sertifikat/thumbs/Business-Analysis-Process-Management.webp",
    },
    {
      title: "Create a Financial Statement using Microsoft Excel",
      issuer: "Coursera Guided Project",
      year: "2026",
      image:
        "/sertifikat/thumbs/Create-a-Financial-Statement-using-Microsoft-Excel.webp",
    },
    {
      title: "Create a Lead Generation Messenger Chatbot using Chatfuel",
      issuer: "Coursera Guided Project",
      year: "2026",
      image:
        "/sertifikat/thumbs/Create-a-Lead-Generation-Messenger-Chatbot-using-Chatfuel.webp",
    },
    {
      title: "Create your e-commerce store with Shopify",
      issuer: "Coursera Guided Project",
      year: "2026",
      image: "/sertifikat/thumbs/Create-your-e-commerce-store-with-Shopify.webp",
    },
    {
      title: "Create Your First Python Program From UST",
      issuer: "Coursera Guided Project",
      year: "2026",
      image: "/sertifikat/thumbs/Create-Your-First-Python-Program-From-UST.webp",
    },
    {
      title: "Creating a Budget with Microsoft Excel",
      issuer: "Coursera Guided Project",
      year: "2026",
      image: "/sertifikat/thumbs/Creating-a-Budget-with-Microsoft-Excel.webp",
    },
    {
      title: "Discounted Cash Flow Modeling",
      issuer: "Coursera Guided Project",
      year: "2026",
      image: "/sertifikat/thumbs/Discounted-Cash-Flow-Modeling.webp",
    },
    {
      title: "Getting Started in Google Analytics",
      issuer: "Coursera Guided Project",
      year: "2026",
      image: "/sertifikat/thumbs/Getting-Started-in-Google-Analytics.webp",
    },
    {
      title: "Google Ads for Beginners",
      issuer: "Coursera Guided Project",
      year: "2026",
      image: "/sertifikat/thumbs/Google-Ads-for-Beginners.webp",
    },
    {
      title: "How to Use Lookup Reference Math and Text Functions in Excel",
      issuer: "Coursera Guided Project",
      year: "2026",
      image:
        "/sertifikat/thumbs/How-to-Use-Lookup-Reference-Math-and-Text-Functions-in-Excel.webp",
    },
    {
      title: "Introduction to Business Analysis Using Spreadsheets: Basics",
      issuer: "Coursera Guided Project",
      year: "2026",
      image:
        "/sertifikat/thumbs/Introduction-to-Business-Analysis-Using-Spreadsheets-Basics.webp",
    },
    {
      title: "Introduction to CRM with HubSpot",
      issuer: "Coursera Guided Project",
      year: "2026",
      image: "/sertifikat/thumbs/Introduction-to-CRM-with-HubSpot.webp",
    },
    {
      title: "Introduction to Project Management with ClickUp",
      issuer: "Coursera Guided Project",
      year: "2026",
      image:
        "/sertifikat/thumbs/Introduction-to-Project-Management-with-ClickUp.webp",
    },
    {
      title: "Machine Learning Pipelines with Azure ML Studio",
      issuer: "Coursera Guided Project",
      year: "2026",
      image:
        "/sertifikat/thumbs/Machine-Learning-Pipelines-with-Azure-ML-Studio.webp",
    },
    {
      title: "Search Engine Optimization (SEO) with Squarespace",
      issuer: "Coursera Guided Project",
      year: "2026",
      image: "/sertifikat/thumbs/Search-Engine-Optimization-SEO-with.webp",
    },
    {
      title: "Use Canva to Design Digital Course Collateral",
      issuer: "Coursera Guided Project",
      year: "2026",
      image: "/sertifikat/thumbs/Use-Canva-to-Design-Digital-Course-Collateral.webp",
    },
    {
      title: "Working with BigQuery",
      issuer: "Coursera Guided Project",
      year: "2026",
      image: "/sertifikat/thumbs/Working-with-BigQuery.webp",
    },
  ],
  experience: {
    role: "Programmer (Intern)",
    company: "PT Aplikasi Dagang Teknologi",
    duration: "Jan 2026 – Jun 2026",
    points: [
      "Developed and maintained payment/financial product features serving daily transactions on the PPOB platform",
      "Implemented a 5-level affiliate commission system using recursive CTE on PostgreSQL with anti-fraud hard cap logic",
      "Optimized API response times through Redis caching layer and PostgreSQL query optimization",
      "Collaborated across React frontend and Go backend teams in a cross-functional engineering environment",
    ],
  },
  organizations: [
    {
      role: "Head Organizer",
      organization:
        "HIMARPL — Himpunan Mahasiswa Program Studi Rekayasa Perangkat Lunak, Politeknik Negeri Indramayu",
      duration: "Jun 2025 · 1 month",
      description:
        "Led the P3M community program as Head Organizer, coordinating logistics, volunteers, and event execution for student-led community service.",
    },
    {
      role: "External Relations Secretary",
      organization:
        "HIMARPL — Himpunan Mahasiswa Program Studi Rekayasa Perangkat Lunak, Politeknik Negeri Indramayu",
      duration: "Oct 2024 – Feb 2025",
    },
    {
      role: "Junior Staff — Internal Relations",
      organization:
        "BEM Politeknik Negeri Indramayu, Kabinet Narayana",
      duration: "Jun 2023 – Jun 2024",
    },
  ],
  education: [
    {
      school: "Politeknik Negeri Indramayu",
      degree: "S1 Terapan Rekayasa Perangkat Lunak",
      year: "2023 – 2027",
    },
    {
      school: "SMK PONPES CadangPinggan",
      year: "2019 – 2022",
    },
    {
      school: "SMPN 3 Jatibarang",
      year: "2016 – 2019",
    },
    {
      school: "SDN Jatisawit Lor 3",
      year: "2010 – 2016",
    },
  ],
};
