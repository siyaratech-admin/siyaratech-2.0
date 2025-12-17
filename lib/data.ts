import {
    Heart,
    DollarSign,
    Factory,
    ShoppingBag,
    GraduationCap,
    Laptop,
    Hammer,
    Brain,
    Cloud,
    Users,
    Code,
    Zap,
    TrendingUp,
    CheckSquare,
    Briefcase,
    Bot
} from "lucide-react";
import React from "react";

export const industries = [
    {
        id: "healthcare",
        icon: Heart,
        name: "Healthcare",
        description:
            "Revolutionize patient care and streamline operations with our cutting-edge healthcare solutions.",
        longDescription: "Our healthcare solutions are designed to improve patient outcomes, optimize clinical workflows, and ensure regulatory compliance. From telemedicine platforms to electronic health records (EHR) integration, we empower healthcare providers to deliver better care.",
        features: [
            "Telemedicine & Remote Patient Monitoring",
            "EHR/EMR Integration",
            "Healthcare Analytics & AI",
            "HIPAA-Compliant Cloud Solutions",
            "Patient Engagement Portals"
        ],
        cta: "Learn More",
        backgroundImage: "/healthcare.png",
        className: "md:col-span-2",
    },
    {
        id: "finance",
        icon: DollarSign,
        name: "Finance",
        description:
            "Transform your financial services with our innovative technology solutions and expert consulting.",
        longDescription: "We help financial institutions navigate the complex landscape of fintech, regulatory changes, and cybersecurity. our solutions enable secure transactions, real-time analytics, and personalized customer experiences.",
        features: [
            "Fintech App Development",
            "Blockchain & Cryptocurrency Solutions",
            "Fraud Detection & Risk Management",
            "Automated Trading Systems",
            "Secure Payment Gateways"
        ],
        cta: "Learn More",
        backgroundImage: "/finance.png",
        className: "md:col-span-1",
    },
    {
        id: "manufacturing",
        icon: Factory,
        name: "Manufacturing",
        description:
            "Optimize your manufacturing processes and drive innovation with our industry-specific solutions.",
        longDescription: "Embrace Industry 4.0 with our smart manufacturing solutions. We connect your factory floor to the cloud, enabling predictive maintenance, real-time monitoring, and supply chain optimization.",
        features: [
            "IoT & Smart Factory Solutions",
            "Supply Chain Management Systems",
            "Predictive Maintenance",
            "Production Planning & Scheduling",
            "Quality Control Automation"
        ],
        cta: "Learn More",
        backgroundImage: "/manufacturing.png",
        className: "md:col-span-1",
    },
    {
        id: "retail",
        icon: ShoppingBag,
        name: "Retail",
        description:
            "Elevate your retail business with our cutting-edge technology solutions and strategic consulting.",
        longDescription: "In the age of omnichannel retail, we provide solutions that bridge the gap between physical and digital stores. enhancing customer engagement, inventory management, and sales performance.",
        features: [
            "E-commerce Platform Development",
            "POS System Integration",
            "Inventory Management",
            "Customer Loyalty Programs",
            "Omnichannel Retail Strategies"
        ],
        cta: "Learn More",
        backgroundImage: "/retail.png",
        className: "md:col-span-1",
    },
    {
        id: "education",
        icon: GraduationCap,
        name: "Education",
        description:
            "Empowering institutions with innovative educational technology solutions.",
        longDescription: "We are transforming education through technology. Our EdTech solutions facilitate remote learning, student management, and personalized learning experiences for schools and universities.",
        features: [
            "Learning Management Systems (LMS)",
            "Virtual Classroom Solutions",
            "Student Information Systems",
            "E-learning Content Development",
            "Campus Management Software"
        ],
        cta: "Learn More",
        backgroundImage: "/education.png",
        className: "md:col-span-1",
    },
    {
        id: "technology",
        icon: Laptop,
        name: "Technology",
        description:
            "Partnering with tech companies for innovative software development and IT services.",
        longDescription: "We collaborate with technology companies to accelerate product development, scale infrastructure, and drive innovation. Our expertise covers the full software development lifecycle.",
        features: [
            "Custom Software Development",
            "SaaS Product Engineering",
            "Cloud Migration & DevOps",
            "QA & Testing Services",
            "IT Staff Augmentation"
        ],
        cta: "Learn More",
        backgroundImage: "/technology.png",
        className: "md:col-span-3",
    },
    {
        id: "construction",
        icon: Hammer,
        name: "Construction",
        description:
            "Streamline project management, safety compliance, and resource allocation with our construction tech solutions.",
        longDescription: "Digitize your construction projects with our specialized solutions. We help you manage timelines, budgets, and resources effectively while ensuring safety and compliance on site.",
        features: [
            "Project Management Software",
            "BIM (Building Information Modeling)",
            "Resource & Equipment Tracking",
            "Safety Compliance Tools",
            "Construction ERP & Accounting"
        ],
        cta: "Learn More",
        backgroundImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
        className: "md:col-span-1",
    },
];

export const services = [
    {
        id: "ai-automation",
        icon: Brain,
        title: "AI & Automation",
        description: "Automate processes and improve decision-making with cutting-edge AI solutions.",
        longDescription: "Leverage the power of Artificial Intelligence and Machine Learning to automate repetitive tasks, gain data-driven insights, and create intelligent systems that learn and adapt.",
        features: [
            "Machine Learning Models",
            "Natural Language Processing (NLP)",
            "Robotic Process Automation (RPA)",
            "Chatbots & Virtual Assistants",
            "Predictive Analytics"
        ],
        color: "text-purple-500",
        bg: "bg-purple-500/10",
    },
    {
        id: "cloud-services",
        icon: Cloud,
        title: "Cloud Services",
        description: "Scalable and secure cloud infrastructure to support your growing business needs.",
        longDescription: "We provide comprehensive cloud services, from migration strategy to ongoing management. Secure, scalable, and cost-effective cloud solutions tailored to your business.",
        features: [
            "Cloud Migration Strategy",
            "AWS/Azure/GCP Management",
            "Cloud Security & Compliance",
            "Serverless Architecture",
            "Disaster Recovery Planning"
        ],
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    {
        id: "talent-outsourcing",
        icon: Users,
        title: "Talent Outsourcing",
        description: "Access top-tier IT talent to augment your team and accelerate development.",
        longDescription: "Scale your development team quickly with our skilled IT professionals. We provide dedicated developers, designers, and QA engineers who integrate seamlessly with your in-house team.",
        features: [
            "Dedicated Development Teams",
            "Staff Augmentation",
            "Project-Based Outsourcing",
            "access to Global Talent Pool",
            "Flexible Engagement Models"
        ],
        color: "text-green-500",
        bg: "bg-green-500/10",
    },
    {
        id: "software-dev",
        icon: Code,
        title: "Software Dev",
        description: "Custom software solutions tailored to your specific business challenges.",
        longDescription: "We build robust, scalable, and secure software applications that solve complex business problems. From web apps to mobile solutions, we deliver high-quality code.",
        features: [
            "Custom Web Application Development",
            "Mobile App Development (iOS/Android)",
            "Enterprise Software Solutions",
            "API Development & Integration",
            "Legacy System Modernization"
        ],
        color: "text-pink-500",
        bg: "bg-pink-500/10",
    },
    {
        id: "digital-transformation",
        icon: Zap,
        title: "Digital Transformation",
        description: "Modernize your operations and stay ahead in the digital age.",
        longDescription: "Reimagine your business for the digital era. We help you adopt new technologies, optimize processes, and change your organizational culture to drive innovation and growth.",
        features: [
            "Digital Strategy Consulting",
            "Process Re-engineering",
            "Technology Adoption Roadmaps",
            "Customer Experience Transformation",
            "Data-Driven Decision Making"
        ],
        color: "text-yellow-500",
        bg: "bg-yellow-500/10",
    },
    {
        id: "business-consulting",
        icon: TrendingUp,
        title: "Business Consulting",
        description: "Strategic insights to optimize performance and drive sustainable growth.",
        longDescription: "Our business consultants work with you to identify opportunities, overcome challenges, and achieve your strategic goals. We bring industry expertise and analytical rigor to every engagement.",
        features: [
            "Market Analysis & Strategy",
            "Operational Efficiency Improvement",
            "Risk Management",
            "Financial Advisory",
            "Change Management"
        ],
        color: "text-orange-500",
        bg: "bg-orange-500/10",
    },
];

export const erpSolutions = [
    {
        id: "hrms",
        title: "HRMS",
        subtitle: "Human Resource Reinvented",
        description: "Put your workforce on autopilot with AI-driven HR operations. Automate recruitment, attendance, payroll, and compliance.",
        longDescription: "Your HR is no longer manual. Siyaratech HRMS automates recruitment, attendance, payroll, performance reviews, compliance, and employee lifecycle — all from a single dashboard.",
        icon: Users,
        features: [
            "Smart attendance with face recognition",
            "Automated payroll & statutory compliance",
            "AI-powered hiring assistant",
            "Performance analytics with predictive insights",
            "Employee self-service portal",
            "Leave, shift & workforce planning"
        ],
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
        className: "md:col-span-1",
        cta: "Explore HRMS",
    },
    {
        id: "task-manager",
        title: "Task Manager",
        subtitle: "Intelligent Work Execution",
        description: "Plan, monitor, and deliver work with AI assisting every step. Replace scattered spreadsheets and never-ending follow-ups.",
        longDescription: "Our AI Agent assigns tasks, sends reminders, predicts delays, and ensures nothing falls through the cracks.",
        icon: CheckSquare,
        features: [
            "Kanban, calendar & timeline views",
            "AI-based delay prediction",
            "Team productivity score",
            "Automated task reminders & escalations",
            "Cross-department workflow automation"
        ],
        image: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=800&q=80",
        className: "md:col-span-1",
        cta: "Explore Task Manager",
    },
    {
        id: "accounts-billing",
        title: "Accounts & Billing",
        subtitle: "Accuracy Meets Automation",
        description: "Handle your finances with precision, transparency, and speed. From invoicing to GST to expense tracking.",
        longDescription: "Automate accounting workflows end-to-end. Handle your finances with precision, transparency, and speed.",
        icon: DollarSign,
        features: [
            "Auto-generated invoices & payment reminders",
            "GST, taxation & compliance built-in",
            "Vendor & purchase management",
            "Financial dashboards with real-time projections",
            "AI-based anomaly detection"
        ],
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
        className: "md:col-span-1",
        cta: "Explore Accounts",
    },
    {
        id: "project-manager",
        title: "Project Manager",
        subtitle: "Deliver Projects Faster",
        description: "Plan, execute & track projects with clarity and control. Ensure your projects stay on schedule and within budget.",
        longDescription: "Siyaratech Project Manager ensures your projects stay on schedule, within budget, and on track — with intelligent alerts and forecasting.",
        icon: Briefcase,
        features: [
            "Gantt charts & milestone tracking",
            "Resource allocation & load balancing",
            "Budget vs actual cost monitoring",
            "AI-based risk prediction",
            "Real-time project health score"
        ],
        image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&q=80",
        className: "md:col-span-1",
        cta: "Explore Projects",
    },
    {
        id: "labour-management",
        title: "Labour Management",
        subtitle: "Workforce Made Intelligent",
        description: "Manage your labour force with precision and transparency. Ideal for manufacturing, construction, logistics, and field teams.",
        longDescription: "Manage your labour force with precision and transparency. Ideal for manufacturing, construction, logistics, and field teams.",
        icon: Users,
        features: [
            "Attendance & shift tracking",
            "Skill-based job allocation",
            "Wage & overtime automation",
            "Productivity monitoring",
            "AI-based workforce forecasting"
        ],
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
        className: "md:col-span-2",
        cta: "Explore Labour Mgmt",
    },
    {
        id: "plant-machinery",
        title: "Plant & Machinery",
        subtitle: "Zero Downtime. Full Control.",
        description: "Optimize the life and performance of every machine you own. Reduce breakdowns and manage maintenance.",
        longDescription: "Reduce breakdowns, manage maintenance, and plan capacity with AI support. Optimize the life and performance of every machine you own.",
        icon: Factory,
        features: [
            "Maintenance scheduling (AMC/preventive)",
            "Asset health monitoring",
            "Depreciation & lifecycle tracking",
            "Spare parts & consumables management",
            "AI-based breakdown prediction"
        ],
        image: "https://images.unsplash.com/photo-1581093458791-9f30b910a5ae?w=800&q=80",
        className: "md:col-span-1",
        cta: "Explore Machinery",
    },
    {
        id: "crm-ai-agent",
        title: "CRM With AI Agent",
        subtitle: "Your Smart Sales Co-Pilot",
        description: "Turn every lead into a revenue opportunity with AI. Your sales team gets a 24×7 AI assistant.",
        longDescription: "Your sales team gets a 24×7 AI assistant that qualifies leads, sends follow-ups, books meetings, prepares proposals, and ensures no lead is missed.",
        icon: Bot,
        features: [
            "AI lead qualification & scoring",
            "Automated email/SMS/WhatsApp follow-ups",
            "Pipeline management & forecasting",
            "Customer 360° profile",
            "Workflow automation + deal tracking",
            "Real-time revenue prediction"
        ],
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
        className: "md:col-span-3",
        cta: "Explore CRM AI",
    },
];
