export const caseStudies = [
    {
        title: "TechDiveHub",
        client: "TechDiveHub",
        industry: "EdTech",
        challenge: "Transforming technical education into an engaging, interactive journey for students and professionals.",
        result: "Built a vibrant learning ecosystem with browser-based IDEs, gamification, and community features.",
        metrics: [
            { label: "Completion Rate", value: "85%", improvement: "40% increase" },
            { label: "Active Learners", value: "10k+", improvement: "Growing fast" },
            { label: "User Satisfaction", value: "4.9/5", improvement: "Top rated" },
        ],
        image: "/images/coursevidhya.png",
        tags: ["Next.js", "TailwindCSS", "Monaco Editor", "Gamification"],
        slug: "techdivehub",
        mainTitle: "TechDiveHub: Interactive Learning Ecosystem",
        mainDescription: "Goal: Create a platform where learning code is as engaging as playing a game, with real-time feedback and community support.",
        sections: [
            {
                title: "Browser-Based IDE",
                image: "/images/coursevidhya.png",
                description: "Integrated Monaco Editor allowing students to write and run code directly in the browser without setup.",
                className: "col-span-1 lg:col-span-6 border-b dark:border-neutral-800"
            },
            {
                title: "Gamification Engine",
                image: "/images/coursevidhya_2.png",
                description: "XP, Badges, and Streaks to keep learners motivated and consistent.",
                className: "col-span-1 lg:col-span-3 border-r dark:border-neutral-800"
            },
            {
                title: "Community Forums",
                image: "/images/sidefolio-aceternity-2.png",
                description: "Real-time discussion boards and peer review systems to foster collaborative learning.",
                className: "col-span-1 lg:col-span-3 border-b dark:border-neutral-800"
            }
        ]
    },
    {
        title: "Consortium",
        client: "Consortium",
        industry: "Business Services",
        challenge: "Fragmented communication and project tracking across multiple stakeholders in complex joint ventures.",
        result: "Developed a unified collaborative platform for real-time document sharing, consensus building, and project tracking.",
        metrics: [
            { label: "Decision Speed", value: "2x", improvement: "50% faster" },
            { label: "Transparency", value: "100%", improvement: "Full audit trail" },
            { label: "Stakeholder Trust", value: "High", improvement: "Improved relations" },
        ],
        image: "/Consortium.png",
        tags: ["React", "Node.js", "WebSockets", "Secure Cloud"],
        slug: "consortium",
        mainTitle: "Consortium: Unified Collaboration Platform",
        mainDescription: "Goal: Streamline multi-stakeholder decision making and document management in a secure environment.",
        sections: [
            {
                title: "Real-Time Collaboration",
                image: "/Consortium.png",
                description: "Live document editing and commenting to reach consensus faster.",
                className: "col-span-1 lg:col-span-6 border-b dark:border-neutral-800"
            }
        ]
    },
    {
        title: "Construction ERP",
        client: "Construction Giants",
        industry: "Construction",
        challenge: "Cost overruns, material leakage, and lack of real-time visibility into multiple construction sites.",
        result: "Implemented an end-to-end ERP for BOQ tracking, sub-contractor billing, and labor management.",
        metrics: [
            { label: "Material Waste", value: "-20%", improvement: "Significant saving" },
            { label: "Project Delays", value: "-30%", improvement: "On-time delivery" },
            { label: "Profit Margins", value: "+15%", improvement: "Better control" },
        ],
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
        tags: ["ERP", "Construction", "IoT", "Analytics"],
        slug: "construction-erp",
        mainTitle: "BuildSmart: End-to-End Construction ERP",
        mainDescription: "Goal: Gain total control over material, man-power, and money across all construction sites.",
        sections: [
            {
                title: "Material Tracking",
                image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800&q=80",
                description: "Real-time inventory tracking against BOQ to prevent leakage.",
                className: "col-span-1 lg:col-span-6 border-b dark:border-neutral-800"
            },
            {
                title: "Labor Management",
                image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
                description: "Biometric attendance and wage automation for daily wagers.",
                className: "col-span-1 lg:col-span-3 border-r dark:border-neutral-800"
            }
        ]
    },
    {
        title: "HRMS & Payroll Automation",
        client: "Enterprise HR",
        industry: "Corporate Services",
        challenge: "Manual payroll processing and attendance tracking led to errors and compliance risks.",
        result: "Deployed an AI-powered HRMS with facial recognition attendance and one-click payroll generation.",
        metrics: [
            { label: "Processing Time", value: "-90%", improvement: "Days to minutes" },
            { label: "Attendance Accuracy", value: "100%", improvement: "Zero fraud" },
            { label: "Employee Satisfaction", value: "4.8/5", improvement: "Timely payouts" },
        ],
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
        tags: ["HR Tech", "AI", "Automation", "Compliance"],
        slug: "hrms-payroll",
        mainTitle: "AI-Powered HRMS Suite",
        mainDescription: "Goal: Automate the entire employee lifecycle from hire to retire.",
        sections: [
            {
                title: "Facial Recognition Attendance",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
                description: "Touchless, geo-fenced attendance marking.",
                className: "col-span-1 lg:col-span-6 border-b dark:border-neutral-800"
            }
        ]
    }
];
