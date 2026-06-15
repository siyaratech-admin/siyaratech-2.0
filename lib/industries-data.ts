// lib/industries-data.ts

export interface IndustryChallenge {
  title: string;
  description: string;
}

export interface IndustrySolution {
  title: string;
  description: string;
  icon: string; // emoji or icon name
}

export interface IndustryStat {
  value: string;
  label: string;
}

export interface IndustryData {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  accentColor: string; // tailwind color token used in gradients
  stats: IndustryStat[];
  challenges: IndustryChallenge[];
  solutions: IndustrySolution[];
  caseStudy: {
    company: string;
    result: string;
    quote: string;
    author: string;
    role: string;
  };
}

export const industriesData: Record<string, IndustryData> = {
  healthcare: {
    slug: "healthcare",
    name: "Healthcare",
    tagline: "Revolutionizing Patient Care Through Intelligent Technology",
    description:
      "We partner with hospitals, clinics, and health systems to deliver digital solutions that improve patient outcomes, streamline clinical workflows, and ensure regulatory compliance across every touchpoint.",
    heroImage:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1400&h=800&fit=crop",
    accentColor: "#3b82f6",
    stats: [
      { value: "40%", label: "Reduction in admin overhead" },
      { value: "98%", label: "HIPAA compliance rate" },
      { value: "2.5×", label: "Faster patient onboarding" },
      { value: "60+", label: "Healthcare clients served" },
    ],
    challenges: [
      {
        title: "Fragmented Patient Data",
        description:
          "Clinical records spread across disparate systems make cohesive care nearly impossible.",
      },
      {
        title: "Regulatory Complexity",
        description:
          "Navigating HIPAA, HL7, and FHIR standards while maintaining agility is a constant burden.",
      },
      {
        title: "Rising Operational Costs",
        description:
          "Manual workflows and outdated infrastructure drive up costs without improving outcomes.",
      },
      {
        title: "Patient Engagement Gaps",
        description:
          "Lack of digital touchpoints leaves patients disengaged between clinical visits.",
      },
    ],
    solutions: [
      {
        title: "Unified EHR Integration",
        description:
          "Seamlessly connect disparate electronic health record systems into one interoperable platform using HL7 FHIR standards.",
        icon: "🏥",
      },
      {
        title: "AI-Powered Diagnostics",
        description:
          "Machine learning models that assist clinicians with early diagnosis, risk stratification, and treatment recommendations.",
        icon: "🧠",
      },
      {
        title: "Telehealth Platform",
        description:
          "HIPAA-compliant virtual care infrastructure with real-time video, secure messaging, and remote monitoring.",
        icon: "📱",
      },
      {
        title: "Revenue Cycle Management",
        description:
          "Automated billing, coding, and claims processing to maximize reimbursements and reduce denials.",
        icon: "💰",
      },
      {
        title: "Patient Engagement Portal",
        description:
          "Digital portals that empower patients to manage appointments, view records, and communicate with care teams.",
        icon: "🤝",
      },
      {
        title: "Compliance Automation",
        description:
          "Continuous monitoring and automated reporting to maintain HIPAA, HITECH, and Joint Commission compliance.",
        icon: "🔒",
      },
    ],
    caseStudy: {
      company: "MedCore Health Network",
      result:
        "Reduced patient wait times by 55% and cut administrative costs by $2.4M annually.",
      quote:
        "Siyaratech transformed how we deliver care. Their EHR integration alone saved our team hundreds of hours each month.",
      author: "Dr. Priya Menon",
      role: "Chief Medical Officer, MedCore Health",
    },
  },

  finance: {
    slug: "finance",
    name: "Finance",
    tagline:
      "Powering the Future of Financial Services with Precision Technology",
    description:
      "From fintech startups to global banks, we deliver technology solutions that modernize core banking, automate compliance, and create personalized financial experiences at scale.",
    heroImage:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1400&h=800&fit=crop",
    accentColor: "#10b981",
    stats: [
      { value: "99.99%", label: "Platform uptime SLA" },
      { value: "3×", label: "Faster loan processing" },
      { value: "$12B+", label: "Transactions processed" },
      { value: "150ms", label: "Avg. API response time" },
    ],
    challenges: [
      {
        title: "Legacy Core Systems",
        description:
          "Decades-old mainframe infrastructure that resists modernization yet underpins critical operations.",
      },
      {
        title: "Evolving Regulations",
        description:
          "Keeping pace with Basel IV, MiFID II, GDPR, and rapidly shifting local compliance requirements.",
      },
      {
        title: "Fraud & Cyber Threats",
        description:
          "Increasingly sophisticated attacks targeting financial data and transaction integrity.",
      },
      {
        title: "Customer Experience Gap",
        description:
          "Fintech disruptors raising the bar for seamless, digital-first banking experiences.",
      },
    ],
    solutions: [
      {
        title: "Core Banking Modernization",
        description:
          "API-first, cloud-native banking platforms that replace or layer over legacy systems without operational disruption.",
        icon: "🏦",
      },
      {
        title: "Real-Time Fraud Detection",
        description:
          "ML models that analyze transaction patterns in milliseconds to flag and prevent fraudulent activity.",
        icon: "🛡️",
      },
      {
        title: "RegTech Automation",
        description:
          "Automated compliance reporting, KYC/AML workflows, and audit trail management.",
        icon: "📋",
      },
      {
        title: "Open Banking APIs",
        description:
          "PSD2-compliant open banking infrastructure enabling third-party integrations and new revenue streams.",
        icon: "🔗",
      },
      {
        title: "Wealth Management Platform",
        description:
          "Robo-advisory tools and portfolio analytics that scale personalized investment advice.",
        icon: "📈",
      },
      {
        title: "Payment Processing Engine",
        description:
          "High-throughput, low-latency payment rails supporting multi-currency and cross-border transactions.",
        icon: "⚡",
      },
    ],
    caseStudy: {
      company: "Apex Capital Group",
      result:
        "Reduced fraud losses by 78% and achieved 3× faster loan decisioning within 6 months.",
      quote:
        "Their real-time fraud detection system paid for itself in the first quarter. The ROI has been extraordinary.",
      author: "James Holloway",
      role: "CTO, Apex Capital Group",
    },
  },

  manufacturing: {
    slug: "manufacturing",
    name: "Manufacturing",
    tagline: "Driving Industry 4.0 Transformation on the Factory Floor",
    description:
      "We help manufacturers harness IoT, AI, and digital twin technologies to optimize production, predict equipment failures, and create intelligent supply chains that adapt in real time.",
    heroImage:
      "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=1400&h=800&fit=crop",
    accentColor: "#f59e0b",
    stats: [
      { value: "35%", label: "OEE improvement avg." },
      { value: "70%", label: "Reduction in unplanned downtime" },
      { value: "22%", label: "Supply chain cost savings" },
      { value: "500+", label: "IoT devices integrated" },
    ],
    challenges: [
      {
        title: "Unplanned Downtime",
        description:
          "Equipment failures disrupting production lines and causing cascading delays across facilities.",
      },
      {
        title: "Supply Chain Volatility",
        description:
          "Global disruptions, demand spikes, and supplier uncertainty making inventory management extremely difficult.",
      },
      {
        title: "Quality Control Gaps",
        description:
          "Manual inspection processes that miss defects and slow production velocity.",
      },
      {
        title: "Workforce Skill Gaps",
        description:
          "Retiring expertise and difficulty attracting talent proficient in modern industrial systems.",
      },
    ],
    solutions: [
      {
        title: "Predictive Maintenance",
        description:
          "IoT sensor networks and ML algorithms that predict equipment failures days before they occur.",
        icon: "🔧",
      },
      {
        title: "Digital Twin Platform",
        description:
          "Virtual replicas of physical assets and production lines for simulation, optimization, and risk-free testing.",
        icon: "🏭",
      },
      {
        title: "Computer Vision QC",
        description:
          "AI-powered visual inspection systems that detect defects at speeds and accuracy levels humans cannot match.",
        icon: "👁️",
      },
      {
        title: "Smart Supply Chain",
        description:
          "End-to-end supply chain visibility with real-time tracking, demand forecasting, and automated procurement.",
        icon: "🚚",
      },
      {
        title: "MES Integration",
        description:
          "Manufacturing Execution Systems that connect shop floor operations with enterprise planning layers.",
        icon: "⚙️",
      },
      {
        title: "Energy Management",
        description:
          "Real-time energy monitoring and optimization to reduce consumption and meet sustainability targets.",
        icon: "⚡",
      },
    ],
    caseStudy: {
      company: "Vortex Precision Components",
      result:
        "Achieved 70% reduction in unplanned downtime and $3.1M in annual savings within one year.",
      quote:
        "The predictive maintenance system was a game-changer. We now fix problems before customers ever know they existed.",
      author: "Rajesh Kumar",
      role: "VP Operations, Vortex Precision",
    },
  },

  retail: {
    slug: "retail",
    name: "Retail",
    tagline: "Crafting Seamless Commerce Experiences Across Every Channel",
    description:
      "We empower retailers to unify online and offline experiences, personalize customer journeys at scale, and build the intelligent commerce infrastructure needed to compete in a digital-first world.",
    heroImage:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&h=800&fit=crop",
    accentColor: "#ec4899",
    stats: [
      { value: "45%", label: "Increase in conversion rate" },
      { value: "3.2×", label: "Customer lifetime value uplift" },
      { value: "28%", label: "Inventory cost reduction" },
      { value: "90 days", label: "Avg. time to first revenue" },
    ],
    challenges: [
      {
        title: "Omnichannel Fragmentation",
        description:
          "Disconnected in-store, online, and mobile experiences that frustrate customers and erode loyalty.",
      },
      {
        title: "Inventory Inaccuracy",
        description:
          "Overstocking and stockouts costing millions in lost sales and carrying costs annually.",
      },
      {
        title: "Personalization at Scale",
        description:
          "Delivering relevant, individualized experiences to millions of customers in real time.",
      },
      {
        title: "Margin Pressure",
        description:
          "Rising fulfillment costs, returns, and price competition squeezing already thin margins.",
      },
    ],
    solutions: [
      {
        title: "Unified Commerce Platform",
        description:
          "Single platform connecting POS, e-commerce, mobile, and marketplace channels with one inventory truth.",
        icon: "🛍️",
      },
      {
        title: "AI Personalization Engine",
        description:
          "Real-time recommendation systems that personalize product discovery, pricing, and promotions per customer.",
        icon: "🎯",
      },
      {
        title: "Intelligent Inventory",
        description:
          "Demand forecasting and automated replenishment that minimize stockouts and reduce carrying costs.",
        icon: "📦",
      },
      {
        title: "Loyalty & CRM",
        description:
          "Next-generation loyalty programs with behavioral segmentation and automated lifecycle marketing.",
        icon: "❤️",
      },
      {
        title: "Returns Intelligence",
        description:
          "ML-powered returns prediction and optimization to reduce return rates and improve recovery value.",
        icon: "🔄",
      },
      {
        title: "Store Analytics",
        description:
          "Computer vision and IoT-based foot traffic analysis, shelf monitoring, and customer behavior insights.",
        icon: "📊",
      },
    ],
    caseStudy: {
      company: "Meridian Lifestyle Brands",
      result:
        "Grew online revenue by 140% YoY and reduced inventory costs by $1.8M after platform launch.",
      quote:
        "Siyaratech didn't just build us a website. They built us a commerce engine. The difference is enormous.",
      author: "Sarah Okonkwo",
      role: "Chief Digital Officer, Meridian Brands",
    },
  },

  education: {
    slug: "education",
    name: "Education",
    tagline: "Empowering Every Learner with Adaptive, Intelligent Technology",
    description:
      "We partner with K-12 institutions, universities, and EdTech platforms to build adaptive learning systems, modernize campus operations, and make quality education accessible to every student.",
    heroImage:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1400&h=800&fit=crop",
    accentColor: "#8b5cf6",
    stats: [
      { value: "38%", label: "Improvement in student outcomes" },
      { value: "2M+", label: "Learners on our platforms" },
      { value: "60%", label: "Reduction in admin workload" },
      { value: "4.8/5", label: "Avg. student satisfaction" },
    ],
    challenges: [
      {
        title: "Equity & Access Gaps",
        description:
          "Significant disparities in technology access and learning quality across student demographics.",
      },
      {
        title: "Engagement & Retention",
        description:
          "Keeping students motivated and preventing dropout, especially in online and hybrid environments.",
      },
      {
        title: "Administrative Burden",
        description:
          "Educators spending more time on paperwork and compliance than actual teaching.",
      },
      {
        title: "Outcome Measurement",
        description:
          "Difficulty attributing learning outcomes to specific interventions and measuring real impact.",
      },
    ],
    solutions: [
      {
        title: "Adaptive Learning Engine",
        description:
          "AI that personalizes content difficulty, pacing, and format based on each learner's real-time performance.",
        icon: "🧩",
      },
      {
        title: "LMS Modernization",
        description:
          "Next-generation Learning Management Systems with intuitive UX, analytics dashboards, and deep integrations.",
        icon: "📚",
      },
      {
        title: "Student Success Platform",
        description:
          "Early-warning systems that identify at-risk students and trigger timely, targeted interventions.",
        icon: "🎓",
      },
      {
        title: "Campus Operations Hub",
        description:
          "Unified platform for admissions, scheduling, grading, and compliance that reduces administrative overhead.",
        icon: "🏫",
      },
      {
        title: "Virtual Lab & Simulation",
        description:
          "Immersive virtual labs for STEM subjects, reducing equipment costs while expanding experimental access.",
        icon: "🔬",
      },
      {
        title: "Learning Analytics",
        description:
          "Granular insights into engagement, comprehension, and progression to inform curriculum decisions.",
        icon: "📊",
      },
    ],
    caseStudy: {
      company: "Greenfield University",
      result:
        "Reduced dropout rates by 32% and increased first-year GPA averages by 0.4 points in two semesters.",
      quote:
        "The student success platform is remarkable. We're catching students before they fall behind, not after.",
      author: "Prof. Linda Ashford",
      role: "Provost, Greenfield University",
    },
  },

  technology: {
    slug: "technology",
    name: "Technology",
    tagline: "Accelerating Innovation for the Companies Building Tomorrow",
    description:
      "We partner with software companies, SaaS platforms, and tech enterprises to accelerate product development, scale infrastructure, and build the engineering culture needed to compete at a global level.",
    heroImage:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1400&h=800&fit=crop",
    accentColor: "#06b6d4",
    stats: [
      { value: "50%", label: "Faster time-to-market" },
      { value: "99.95%", label: "Infrastructure uptime" },
      { value: "4×", label: "Developer velocity increase" },
      { value: "200+", label: "Tech products shipped" },
    ],
    challenges: [
      {
        title: "Scaling Engineering Teams",
        description:
          "Hiring, onboarding, and retaining top engineering talent while maintaining velocity and culture.",
      },
      {
        title: "Technical Debt",
        description:
          "Legacy codebases slowing feature delivery and increasing the cost of every new change.",
      },
      {
        title: "Infrastructure Complexity",
        description:
          "Managing multi-cloud environments, microservices, and distributed systems at scale.",
      },
      {
        title: "Security & Reliability",
        description:
          "Ensuring enterprise-grade security posture and fault tolerance as products grow.",
      },
    ],
    solutions: [
      {
        title: "Product Engineering",
        description:
          "End-to-end product development from architecture to launch, with embedded engineers who own outcomes.",
        icon: "💻",
      },
      {
        title: "Cloud Infrastructure",
        description:
          "Multi-cloud architecture, Kubernetes orchestration, and FinOps optimization for scale and cost control.",
        icon: "☁️",
      },
      {
        title: "DevOps & Platform Engineering",
        description:
          "CI/CD pipelines, internal developer platforms, and SRE practices that ship faster with fewer incidents.",
        icon: "🚀",
      },
      {
        title: "AI/ML Integration",
        description:
          "Embedding intelligence into products via custom models, LLM integrations, and MLOps infrastructure.",
        icon: "🤖",
      },
      {
        title: "Security Engineering",
        description:
          "Threat modeling, penetration testing, and zero-trust security architecture for production systems.",
        icon: "🛡️",
      },
      {
        title: "Tech Due Diligence",
        description:
          "Rapid architecture and codebase assessment for M&A, fundraising, and strategic planning contexts.",
        icon: "🔍",
      },
    ],
    caseStudy: {
      company: "Nexus SaaS Platform",
      result:
        "Cut deployment time from 3 weeks to 2 hours and scaled from 10K to 500K users in 8 months.",
      quote:
        "Siyaratech's platform team didn't just improve our infrastructure — they completely changed how we think about shipping software.",
      author: "Arjun Patel",
      role: "Founder & CEO, Nexus",
    },
  },
};

export function getIndustryData(slug: string): IndustryData | null {
  return industriesData[slug] ?? null;
}

export function getAllIndustrySlugs(): string[] {
  return Object.keys(industriesData);
}
