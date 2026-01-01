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
    Bot,
    BookOpen,

    ShoppingCartIcon,
    FileText,
    LayoutDashboard,
    PenTool
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
        content: (
            <div className="space-y-6">
                <p>
                    The healthcare industry is undergoing a digital renaissance, shifting from reactive treatment models to proactive, data-driven patient care. Siyaratech empowers this transformation by providing robust, HIPAA-compliant digital ecosystems that bridge the gap between providers and patients. Our solutions are not just about digitization; they are about humanizing technology to ensure that every interaction—whether a telehealth consult or an automated prescription refill—feels personal, secure, and efficient. By integrating disparate systems like EHRs, billing, and pharmacy management into a unified interface, we reduce administrative burnout and allow medical professionals to focus on what they do best: saving lives.
                </p>
                <p>
                    In an era where remote care is essential, our telemedicine platforms offer high-definition video consultations, secure messaging, and remote patient monitoring (RPM) capabilities. These tools extend the reach of specialized care to rural and underserved areas, ensuring equity in healthcare access. We incorporate IoT integration to stream vitals directly from wearable devices to doctor dashboards, enabling real-time interventions before critical events occur. This continuous loop of data ensures that care plans are dynamic, personalized, and effective.
                </p>
                <p>
                    Data security and interoperability are the cornerstones of our architecture. We understand the sensitivity of health data and adhere to the strictest global standards, including HIPAA and GDPR. our solutions feature advanced encryption and role-based access controls to protect patient privacy without hindering the seamless flow of information between authorized departments. This operational transparency builds trust with patients and protects institutions from costly data breaches and compliance violations.
                </p>
                <p>
                    Looking ahead, we are pioneering the use of AI in diagnostic assistance and operational forecasting. Imagine an ER that predicts patient influx based on seasonal trends or an AI assistant that flags potential drug interactions in real-time. These future-ready features are designed to augment decision-making, reduce human error, and optimize resource allocation. With Siyaratech, healthcare providers are equipped not just for today&apos;s challenges but for tomorrow&apos;s medical breakthroughs.
                </p>
                <p>
                    Our commitment extends beyond software; we partner with hospitals, clinics, and labs to drive measurable outcomes. Whether it is reducing patient wait times, minimizing claim rejections, or improving post-discharge recovery rates, our technology acts as a catalyst for excellence. Join us in shaping a healthier world where technology serves as the heartbeat of modern medicine.
                </p>
            </div>
        ),
        features: [
            "Telemedicine & Remote Patient Monitoring",
            "EHR/EMR Integration",
            "Healthcare Analytics & AI",
            "HIPAA-Compliant Cloud Solutions",
            "Patient Engagement Portals"
        ],
        cta: "Learn More",
        backgroundImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
        className: "md:col-span-2",
    },
    {
        id: "finance",
        icon: DollarSign,
        name: "Finance",
        description:
            "Transform your financial services with our innovative technology solutions and expert consulting.",
        longDescription: "We help financial institutions navigate the complex landscape of fintech, regulatory changes, and cybersecurity. our solutions enable secure transactions, real-time analytics, and personalized customer experiences.",
        content: (
            <div className="space-y-6">
                <p>
                    The financial sector is operating in a high-velocity environment where trust, speed, and security are paramount. Siyaratech helps traditional banks, fintech startups, and insurance firms modernize their legacy infrastructure to compete in a digital-first economy. Our solutions are designed to dismantle operational silos, enabling a seamless flow of data that powers instant payments, automated lending, and personalized wealth management. We turn friction-heavy financial processes into invisible, frictionless experiences for the end-user.
                </p>
                <p>
                    Security is woven into the DNA of our financial products. Recognizing the escalating innovations in cyber threats, we employ zero-trust architectures and AI-driven fraud detection systems that analyze transaction patterns in milliseconds. This proactive security stance safeguards assets and preserves customer confidence. From multi-factor authentication to blockchain-verified audit trails, we ensure that every digital handshake is authentic and immutable, meeting rigorous compliance standards like PCI-DSS and SOX.
                </p>
                <p>
                    We also unlock the power of data for strategic advantage. Financial institutions sit on mountains of data that often go untapped. Our advanced analytics and machine learning models turn this raw data into actionable insights—predicting market trends, identifying credit risks, and segmenting customers for hyper-personalized offers. This intelligence allows institutions to pivot from being mere transaction processors to becoming trusted financial advisors who anticipate their customers&apos; life goals.
                </p>
                <p>
                    Innovation is at our core. We are actively integrating decentralized finance (DeFi) concepts and open banking APIs to create interoperable financial ecosystems. Whether it is building a neo-bank from scratch or integrating a crypto-payment gateway, our agile development teams deliver scalable, future-proof solutions. We empower you to launch new products in weeks rather than months, keeping you ahead of the curve in a fiercely competitive market.
                </p>
                <p>
                    Partner with Siyaratech to redefine what is possible in finance. We combine deep domain expertise with cutting-edge engineering to build platforms that are resilient, compliant, and customer-centric. Let us help you build the financial infrastructure of the future—one that is inclusive, intelligent, and instantaneous.
                </p>
            </div>
        ),
        features: [
            "Fintech App Development",
            "Blockchain & Cryptocurrency Solutions",
            "Fraud Detection & Risk Management",
            "Automated Trading Systems",
            "Secure Payment Gateways"
        ],
        cta: "Learn More",
        backgroundImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
        className: "md:col-span-1",
    },
    {
        id: "manufacturing",
        icon: Factory,
        name: "Manufacturing",
        description:
            "Optimize your manufacturing processes and drive innovation with our industry-specific solutions.",
        longDescription: "Embrace Industry 4.0 with our smart manufacturing solutions. We connect your factory floor to the cloud, enabling predictive maintenance, real-time monitoring, and supply chain optimization.",
        content: (
            <div className="space-y-6">
                <p>
                    Manufacturing is evolving into a connected, intelligent ecosystem known as Industry 4.0, and Siyaratech is your partner in this industrial revolution. We move beyond traditional automation to create &lsquo;Smart Factories&rsquo; where machines, sensors, and enterprise systems talk to each other. By converging IT (Information Technology) with OT (Operational Technology), we provide manufacturers with a digital twin of their production floor—enabling real-time visibility into every bolt tightened and every pallet shipped.
                </p>
                <p>
                    Our predictive maintenance solutions are a game-changer for asset-heavy industries. Instead of relying on rigid service schedules or reacting to costly breakdowns, our IoT-enabled systems monitor equipment health 24/7. Vibration analysis, thermal imaging using IoT sensors, and machine learning algorithms predict failures before they happen, allowing you to schedule maintenance during planned downtime. This drastic reduction in unplanned outages translates directly to higher OEE (Overall Equipment Effectiveness) and profit margins.
                </p>
                <p>
                    Supply chain resilience is another critical focus. In a volatile global market, visibility is resilience. Our supply chain management platforms integrate data from suppliers, logistics partners, and inventory warehouses in real-time. This end-to-end transparency helps you anticipate shortages, optimize inventory levels, and route shipments dynamically. We turn your supply chain from a logistical burden into a strategic differentiator that responds instantly to market demand.
                </p>
                <p>
                    Quality assurance is automated and digitized through our computer vision solutions. High-speed cameras and AI models inspect products on the line with superhuman accuracy/precision, rejecting defects instantly and feeding data back to adjust production parameters. This ensures zero-defect manufacturing and protects your brand reputation. We blend speed with precision, ensuring that your production targets are met without quality compromises.
                </p>
                <p>
                    At Siyaratech, we understand that manufacturing is the backbone of the economy. Our scalable solutions are designed to grow with you, whether you operate a single facility or a global network of plants. Let us help you build a manufacturing operation that is leaner, faster, and smarter—ready to tackle the challenges of the modern industrial landscape.
                </p>
            </div>
        ),
        features: [
            "IoT & Smart Factory Solutions",
            "Supply Chain Management Systems",
            "Predictive Maintenance",
            "Production Planning & Scheduling",
            "Quality Control Automation"
        ],
        cta: "Learn More",
        backgroundImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
        className: "md:col-span-1",
    },
    {
        id: "retail",
        icon: ShoppingBag,
        name: "Retail",
        description:
            "Elevate your retail business with our cutting-edge technology solutions and strategic consulting.",
        longDescription: "In the age of omnichannel retail, we provide solutions that bridge the gap between physical and digital stores. enhancing customer engagement, inventory management, and sales performance.",
        content: (
            <div className="space-y-6">
                <p>
                    Retail is no longer about just selling products; it is about crafting memorable experiences. Siyaratech empowers retailers to bridge the digital and physical divide, creating a unified &lsquo;Phygital&rsquo; commerce strategy. We help brands move away from channel silos to a truly omnichannel state where a customer can start a journey on Instagram, customize a product on your app, and pick it up in-store—all without a hitch. Our platforms centralize customer data, ensuring that your sales associates know VIP preferences the moment they walk through the door.
                </p>
                <p>
                    Inventory visibility is the holy grail of modern retail, and our systems deliver it with pinpoint accuracy. Real-time synchronization across warehouses, stores, and drop-ship vendors prevents the dreaded &lsquo;out of stock&rsquo; scenario. We implement smart order routing algorithms that fulfill orders from the nearest location, slashing shipping costs and delivery times. Whether it is BOPIS (Buy Online, Pick Up In-Store) or same-day delivery, our backend logic handles the complexity so you can promise convenience.
                </p>
                <p>
                    Personalization is at the heart of our customer engagement tools. Using AI and behavioral analytics, we help you deliver hyper-relevant product recommendations and dynamic pricing. We move beyond generic email blasts to triggered, context-aware communication that resonates with individual shoppers. Our loyalty management systems are gamified and flexible, turning casual buyers into brand advocates who feel genuinely valued.
                </p>
                <p>
                    For the brick-and-mortar aspect, we bring digital intelligence to the shop floor. Mobile POS (Point of Sale) systems untether your staff from the counter, allowing them to check out customers anywhere in the store. Interactive kiosks and smart mirrors create immersive discovery moments. We provide the tools to make your physical stores as analytical and responsive as your website, capturing footfall data and heatmaps to optimize layout and staffing.
                </p>
                <p>
                    Siyaratech is dedicated to powering the next generation of retail. We build scalable, secure, and user-centric platforms that handle the peaks of Black Friday as smoothly as a quiet Tuesday. Let us help you reimagine retail, turning every transaction into a relationship and every challenge into a sales opportunity.
                </p>
            </div>
        ),
        features: [
            "E-commerce Platform Development",
            "POS System Integration",
            "Inventory Management",
            "Customer Loyalty Programs",
            "Omnichannel Retail Strategies"
        ],
        cta: "Learn More",
        backgroundImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
        className: "md:col-span-1",
    },
    {
        id: "education",
        icon: GraduationCap,
        name: "Education",
        description:
            "Empowering institutions with innovative educational technology solutions.",
        longDescription: "We are transforming education through technology. Our EdTech solutions facilitate remote learning, student management, and personalized learning experiences for schools and universities.",
        content: (
            <div className="space-y-6">
                <p>
                    Education is the foundation of progress, and technology is its new accelerator. Siyaratech partners with schools, universities, and training centers to democratize access to quality learning. We build comprehensive Learning Management Systems (LMS) that go beyond file repositories to become vibrant community hubs. Our platforms support synchronous and asynchronous learning, enabling institutions to offer flexible, hybrid models that cater to diverse student needs and learning styles.
                </p>
                <p>
                    Personalization is key to student success. Our adaptive learning algorithms analyze student performance in real-time to tailor content and pacing. If a student struggles with a concept, the system automatically suggests remedial resources or practice exercises. This ensures that no learner is left behind. For educators, our analytics dashboards provide deep insights into class engagement and comprehension, allowing for timely, data-backed interventions rather than end-of-term surprises.
                </p>
                <p>
                    Administrative efficiency is equally important. We digitize the entire student lifecycle—from admission and enrollment to alumni management. Our Student Information Systems (SIS) automate fee collection, timetable scheduling, and grading, freeing up faculty to focus on mentorship rather than paperwork. We create a seamless digital campus where parents, teachers, and administrators are connected and informed.
                </p>
                <p>
                    We also embrace immersive technologies like VR (Virtual Reality) and AR (Augmented Reality) to bring abstract concepts to life. Imagine medical students practicing surgery in a virtual OR or history students visiting ancient civilizations. Siyaratech is at the forefront of integrating these experiential tools into standard curriculums, making learning deeply engaging and memorable.
                </p>
                <p>
                    Siyaratech keeps your institution ahead of the curve. We ensure that your digital infrastructure is robust, secure, and scalable, compliant with educational data privacy laws. Join us in building the classroom of the future—one that is boundary-less, inclusive, and inspiring.
                </p>
            </div>
        ),
        features: [
            "Learning Management Systems (LMS)",
            "Virtual Classroom Solutions",
            "Student Information Systems",
            "E-learning Content Development",
            "Campus Management Software"
        ],
        cta: "Learn More",
        backgroundImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
        className: "md:col-span-1",
    },
    {
        id: "technology",
        icon: Laptop,
        name: "Technology",
        description:
            "Partnering with tech companies for innovative software development and IT services.",
        longDescription: "We collaborate with technology companies to accelerate product development, scale infrastructure, and drive innovation. Our expertise covers the full software development lifecycle.",
        content: (
            <div className="space-y-6">
                <p>
                    In the fast-paced world of technology, speed to market is everything. Siyaratech serves as a strategic accelerator for tech companies, startups, and enterprises building software products. We don&apos;t just write code; we co-create value. Our engineering pods integrate seamlessly with your internal teams, bringing niche expertise in cloud-native architecture, microservices, and DevOps. We help you clear technical debt, modernize legacy stacks, and scale your infrastructure to handle millions of users.
                </p>
                <p>
                    Our approach to software development is deeply rooted in Agile and DevOps best practices. We implement CI/CD (Continuous Integration/Continuous Deployment) pipelines that automate testing and deployment, allowing you to release features daily with confidence. This reliability allows your product teams to run experiments and iterate faster based on real user feedback. We treat infrastructure as code (IaC), ensuring environments are reproducible, secure, and scalable at the click of a button.
                </p>
                <p>
                    Innovation requires looking beyond the horizon. Our R&D labs explore emerging technologies like Generative AI, Edge Computing, and Web3 so you don&apos;t have to. We help you prototype MVP (Minimum Viable Products) rapidly to validate market hypotheses. Whether it is integrating a Large Language Model (LLM) into your SaaS app or building a decentralized identity system, we provide the technical scaffolding to turn ambitious ideas into shipping products.
                </p>
                <p>
                    Quality Assurance (QA) is not an afterthought; it is shifted left in our process. We employ automated testing frameworks that cover unit, integration, and UI levels, ensuring regression bugs are caught instantly. Our security-first mindset means we conduct vulnerability assessments and penetration testing throughout the SDLC, not just before launch. We build software that is robust, performant, and secure by design.
                </p>
                <p>
                    Siyaratech is your force multiplier. We bring the discipline of enterprise engineering with the agility of a startup. Let us handle the heavy lifting of technology so you can focus on vision, strategy, and user growth. Together, we build the digital products that define the future.
                </p>
            </div>
        ),
        features: [
            "Custom Software Development",
            "SaaS Product Engineering",
            "Cloud Migration & DevOps",
            "QA & Testing Services",
            "IT Staff Augmentation"
        ],
        cta: "Learn More",
        backgroundImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
        className: "md:col-span-3",
    },
    {
        id: "construction",
        icon: Hammer,
        name: "Construction",
        description:
            "Streamline project management, safety compliance, and resource allocation with our construction tech solutions.",
        longDescription: "Digitize your construction projects with our specialized solutions. We help you manage timelines, budgets, and resources effectively while ensuring safety and compliance on site.",
        content: (
            <div className="space-y-6">
                <p>
                    The construction industry is notorious for complexity, with projects often plagued by delays and cost overruns. Siyaratech brings clarity to the chaos with specialized Construction Tech solutions. We digitize the job site, moving you away from paper blueprints and clipboard checklists to cloud-based collaboration. Our platforms connect architects, engineers, contractors, and owners in a single data environment (CDE), ensuring everyone builds from the same latest version of the truth.
                </p>
                <p>
                    Project management in construction is about managing dependencies. Our advanced scheduling tools (Gantt/CPM) integrate with resource management to highlight bottlenecks before they stall progress. We track labor productivity and material consumption in real-time, giving you a daily &lsquo;Project Health Score&rsquo;. This financial visibility allows you to detect budget drift early and take corrective action, protecting your razor-thin margins.
                </p>
                <p>
                    Safety is paramount. Our EHS (Environment, Health, and Safety) modules digitize safety inspections, permits to work, and incident reporting. We use mobile apps to ensure compliance checks are done and documented on the ground. By analyzing safety data, we help you identify high-risk activities and conduct targeted training, fostering a culture of safety that protects your most valuable asset: your people.
                </p>
                <p>
                    We are also embracing the future of construction with BIM (Building Information Modeling) integration. Our tools allow field teams to visualize 3D models on tablets, resolving clashes and Request for Information (RFIs) instantly on-site. We are exploring drone mapping for site surveys and IoT sensors for tracking expensive machinery. These technologies reduce rework and accelerate project closeout.
                </p>
                <p>
                    Siyaratech builds the digital foundation for your physical structures. Whether you are building high-rises, highways, or homes, our technology ensures you deliver on time, on budget, and with superior quality. Let us help you construct the skyline of tomorrow with the efficiency of digital speed.
                </p>
            </div>
        ),
        features: [
            "Project Management Software",
            "BIM (Building Information Modeling)",
            "Resource & Equipment Tracking",
            "Safety Compliance Tools",
            "Construction ERP & Accounting"
        ],
        cta: "Learn More",
        backgroundImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
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
        content: (
            <div className="space-y-6">
                <p>
                    Artificial Intelligence is no longer a futuristic concept; it is the engine of modern business efficiency. Siyaratech helps organizations harness the transformative power of AI to automate complex processes that previously required human cognition. From intelligent document processing that reads and classifies thousands of invoices in seconds to customer service bots that handle inquiries with empathy and accuracy, we build systems that work 24/7 without fatigue. Our goal is not to replace humans but to elevate them, freeing your workforce from mundane tasks to focus on creative and strategic initiatives.
                </p>
                <p>
                    Our Machine Learning expertise allows us to build predictive models that see around corners. Whether it is forecasting demand for retail chains, predicting equipment failure in manufacturing, or identifying churn risk in SaaS businesses, our algorithms turn historical data into future competitive advantage. We handle the entire ML pipeline—from data cleaning and feature engineering to model training and deployment—ensuring that your AI initiatives move rapidly from the lab to production.
                </p>
                <p>
                    Natural Language Processing (NLP) is another core strength. We build systems that understand the nuance of human communication. Imagine an internal search engine that understands semantic queries, or a sentiment analysis tool that gauges brand health across millions of social media posts. Our NLP solutions break down language barriers, enabling real-time translation and accessible interfaces for global audiences.
                </p>
                <p>
                    Robotic Process Automation (RPA) serves as the bridge for legacy systems. Where APIs don&apos;t exist, our software robots mimic human interactions to move data between disparate applications. This allows you to modernize operations without ripping and replacing your core infrastructure. We design resilient bots that handle exceptions gracefully and scale seamlessly with your workload.
                </p>
                <p>
                    Ethics and explainability are at the forefront of our AI philosophy. We build transparent models where decisions can be audited and understood. As we march towards an AI-native future, Siyaratech ensures that your organization adopts these powerful technologies responsibly, securely, and effectively. Let us help you build the intelligent enterprise of tomorrow.
                </p>
            </div>
        ),
        features: [
            "Machine Learning Models",
            "Natural Language Processing (NLP)",
            "Robotic Process Automation (RPA)",
            "Chatbots & Virtual Assistants",
            "Predictive Analytics"
        ],
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
    },
    {
        id: "cloud-services",
        icon: Cloud,
        title: "Cloud Services",
        description: "Scalable and secure cloud infrastructure to support your growing business needs.",
        longDescription: "We provide comprehensive cloud services, from migration strategy to ongoing management. Secure, scalable, and cost-effective cloud solutions tailored to your business.",
        content: (
            <div className="space-y-6">
                <p>
                    The cloud is the bedrock of digital agility. Siyaratech provides end-to-end cloud services that guide you through every stage of your cloud journey. Whether you are migrating a monolithic legacy application to the cloud or building a cloud-native microservices architecture, our certified architects ensure a smooth transition. We support multi-cloud and hybrid strategies, giving you the flexibility to choose the best services from AWS, Azure, and Google Cloud without getting locked into a single vendor.
                </p>
                <p>
                    Cost optimization is a critical component of our offering. The cloud&apos;s pay-as-you-go model can quickly become expensive without proper governance. We implement FinOps practices to monitor usage patterns, right-size instances, and utilize spot instances for non-critical workloads. Our automated scaling policies ensure that you have enough compute power during peak traffic but aren&apos;t paying for idle resources at night. We turn your infrastructure cost from a fixed capital expense into a flexible operational one.
                </p>
                <p>
                    Security in the cloud requires a new paradigm. We implement a &lsquo;Security by Design&rsquo; approach, leveraging Infrastructure as Code (IaC) to ensure every environment is hardened from day one. From configuring VPCs and firewalls to managing identity and access (IAM) with least privilege principles, we wrap your data in layers of protection. Our automated compliance checks ensure you meet regulatory standards like GDPR, HIPAA, and SOC2 continuously.
                </p>
                <p>
                    Disaster recovery and business continuity are built-in. We design high-availability architectures that span multiple availability zones and regions. If a data center goes down, your application fails over instantly with zero data loss. Our backup strategies are immutable and air-gapped, protecting you even from ransomware attacks.
                </p>
                <p>
                    Siyaratech empowers you to innovate faster. By abstracting the complexity of infrastructure management, your developers can focus on shipping features. From serverless computing to container orchestration with Kubernetes, we provide the modern platform your engineering teams need to excel.
                </p>
            </div>
        ),
        features: [
            "Cloud Migration Strategy",
            "AWS/Azure/GCP Management",
            "Cloud Security & Compliance",
            "Serverless Architecture",
            "Disaster Recovery Planning"
        ],
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    },
    {
        id: "talent-outsourcing",
        icon: Users,
        title: "Talent Outsourcing",
        description: "Access top-tier IT talent to augment your team and accelerate development.",
        longDescription: "Scale your development team quickly with our skilled IT professionals. We provide dedicated developers, designers, and QA engineers who integrate seamlessly with your in-house team.",
        content: (
            <div className="space-y-6">
                <p>
                    The war for talent is fierce, and finding the right skills at the right time can bottleneck your growth. Siyaratech&apos;s Talent Outsourcing service connects you with a global pool of pre-vetted, high-caliber IT professionals. We don&apos;t just fill seats; we provide engineers, designers, and product managers who possess both technical excellence and cultural adaptability. Whether you need a single specialist to plug a skills gap or a full-stack squad to build a product from scratch, we scale your team on demand.
                </p>
                <p>
                    Our vetting process is rigorous. Only the top 3% of applicants make it through our technical assessments and soft skills interviews. This means the talent you get is ready to contribute from day one. We handle all the administrative burden—hiring, payroll, benefits, and equipment—so you get a simplified monthly invoice. You retain full control over the daily management and direction of your augmented team, ensuring they align perfectly with your internal processes.
                </p>
                <p>
                    Flexibility is at the core of our model. In a fluctuating economy, the ability to scale your workforce up or down without long-term liabilities is a strategic advantage. You can ramp up a team for a critical launch and ramp down once the product stabilizes. We offer various engagement models, including staff augmentation, dedicated teams, and project-based outsourcing, to suit your budget and timeline.
                </p>
                <p>
                    We believe in seamless integration. Our professionals work in your time zone, use your communication tools (Slack, Teams), and participate in your agile ceremonies. To your internal team, they feel like colleagues sitting in a digital cubicle next door. We invest in their continuous learning, ensuring they stay updated with the latest technologies and best practices.
                </p>
                <p>
                    With Siyaratech, you stop chasing candidates and start chasing deadlines. We give you the recruitment velocity of a staffing agency with the engineering quality of a premier consultancy. Let us build your dream team while you build your dream product.
                </p>
            </div>
        ),
        features: [
            "Dedicated Development Teams",
            "Staff Augmentation",
            "Project-Based Outsourcing",
            "access to Global Talent Pool",
            "Flexible Engagement Models"
        ],
        color: "text-green-500",
        bg: "bg-green-500/10",
        image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
    },
    {
        id: "software-dev",
        icon: Code,
        title: "Software Dev",
        description: "Custom software solutions tailored to your specific business challenges.",
        longDescription: "We build robust, scalable, and secure software applications that solve complex business problems. From web apps to mobile solutions, we deliver high-quality code.",
        content: (
            <div className="space-y-6">
                <p>
                    Off-the-shelf software often forces you to change your business processes to fit the tool. Siyaratech&apos;s Custom Software Development service builds technology that wraps around your unique business needs. We specialize in architecting complex, high-performance applications that serve as the backbone of your operations. From enterprise resource planning extensions to customer-facing portals, our solutions are built to be robust, secure, and infinitely scalable.
                </p>
                <p>
                    Our engineering philosophy is rooted in craftsmanship. We write clean, testable, and documented code that is easy to maintain and extend. We use modern tech stacks—React, Node.js, Python, Go—that offer the best balance of performance and developer community support. We don&apos;t just build for launch; we build for longevity. Our architectural choices anticipate future growth, ensuring that your application doesn&apos;t become a legacy burden in two years.
                </p>
                <p>
                    Mobile first is not just a buzzword for us; it is a mandate. We develop native (iOS/Android) and cross-platform (Flutter/React Native) mobile apps that deliver silky-smooth user experiences. We understand the nuances of touch interfaces, offline capabilities, and battery optimization. Whether it is a consumer app for millions of users or a rugged field app for industrial workers, we deliver excellence in the palm of your hand.
                </p>
                <p>
                    API-driven development allow us to integrate your new software with the rest of your ecosystem. We build secure REST and GraphQL APIs that connect your customized solution with Salesforce, SAP, Stripe, or any other third-party service. This interoperability ensures data flows freely across your enterprise, eliminating silos and manual data entry.
                </p>
                <p>
                    Siyaratech partners with you from the napkin sketch to the IPO. Our product managers and UX designers work closely with your stakeholders to define requirements and validate prototypes before a line of code is written. We minimize risk and maximize value delivery. Let us turn your software vision into a tangible, revenue-generating reality.
                </p>
            </div>
        ),
        features: [
            "Custom Web Application Development",
            "Mobile App Development (iOS/Android)",
            "Enterprise Software Solutions",
            "API Development & Integration",
            "Legacy System Modernization"
        ],
        color: "text-pink-500",
        bg: "bg-pink-500/10",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
    },
    {
        id: "digital-transformation",
        icon: Zap,
        title: "Digital Transformation",
        description: "Modernize your operations and stay ahead in the digital age.",
        longDescription: "Reimagine your business for the digital era. We help you adopt new technologies, optimize processes, and change your organizational culture to drive innovation and growth.",
        content: (
            <div className="space-y-6">
                <p>
                    Digital Transformation is more than just digitizing paper records; it is a fundamental reimagining of how an organization creates value. Siyaratech guides legacy enterprises through this metamorphosis. We start by auditing your current processes, identifying bottlenecks where technology can inject speed and accuracy. Our goal is to create a &lsquo;Digital Core&rsquo; for your business—a unified platform where data flows in real-time between sales, operations, and finance.
                </p>
                <p>
                    Customer experience (CX) is often the primary driver of transformation. Today&apos;s customers expect Amazon-like convenience from every service provider. We help you map customer journeys and identify friction points. By implementing self-service portals, omnichannel support, and personalized engagement engines, we help you exceed modern expectations. We turn passive customers into active participants in your digital ecosystem.
                </p>
                <p>
                    Culture change is the hardest part of digital transformation, and we tackle it head-on. Technology implementation fails if people don&apos;t use it. We provide change management consulting, training your workforce to embrace new tools and data-driven mindsets. We help you move from hierarchical decision-making to agile, data-backed experimentation. We empower your employees to be innovators.
                </p>
                <p>
                    Data capitalization is the final pillar. We help you break down data silos and build a data lake that serves as a single source of truth. With advanced analytics and BI dashboards, we give your leadership team the cockpit visibility they need to steer the ship. Decisions are no longer based on gut feeling but on hard, real-time evidence.
                </p>
                <p>
                    Siyaratech is your navigator in the digital storm. We help you balance the need for speed with the need for stability. Whether you are a bank competing with fintechs or a retailer competing with e-commerce giants, we provide the strategy and execution muscle to ensure you don&apos;t just survive the digital age, but thrive in it.
                </p>
            </div>
        ),
        features: [
            "Digital Strategy Consulting",
            "Process Re-engineering",
            "Technology Adoption Roadmaps",
            "Customer Experience Transformation",
            "Data-Driven Decision Making"
        ],
        color: "text-yellow-500",
        bg: "bg-yellow-500/10",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    },
    {
        id: "business-consulting",
        icon: TrendingUp,
        title: "Business Consulting",
        description: "Strategic insights to optimize performance and drive sustainable growth.",
        longDescription: "Our business consultants work with you to identify opportunities, overcome challenges, and achieve your strategic goals. We bring industry expertise and analytical rigor to every engagement.",
        content: (
            <div className="space-y-6">
                <p>
                    In a volatile economic landscape, strategy is your compass. Siyaratech&apos;s Business Consulting practice bridges the gap between high-level strategy and ground-level execution. We don&apos;t just deliver PowerPoint decks; we deliver outcomes. Our consultants are industry veterans who have walked the path before. We work side-by-side with your leadership team to diagnose root causes of stagnation, whether they are operational inefficiencies, market misalignment, or organizational inertia.
                </p>
                <p>
                    Market analysis is the starting point. We conduct deep-dive research into your competitors, customer demographics, and emerging trends. We help you identify &lsquo;Blue Ocean&rsquo; opportunities—uncontested market spaces where you can grow without fierce competition. We help you refine your value proposition, ensuring it resonates clearly with your target audience.
                </p>
                <p>
                    Operational excellence is our operational mantra. We use Lean and Six Sigma methodologies to trim waste and optimize workflows. We help you do more with less. From supply chain optimization to workforce productivity analysis, we find the hidden margins in your business. We believe that efficiency fuels growth—the money you save on waste can be reinvested in innovation.
                </p>
                <p>
                    Risk management is increasingly critical. In a connected world, threats can come from anywhere—cyberattacks, supply chain disruptions, or regulatory changes. We help you build a resilient organization. We conduct comprehensive risk assessments and build business continuity plans that ensure you can weather any storm. We turn resilience into a competitive advantage.
                </p>
                <p>
                    Siyaratech is your partner in growth. We align your people, processes, and technology towards a singular vision of success. Whether you are looking to enter a new market, launch a new product, or restructure for profitability, we provide the objective, expert guidance you need to make bold decisions with confidence.
                </p>
            </div>
        ),
        features: [
            "Market Analysis & Strategy",
            "Operational Efficiency Improvement",
            "Risk Management",
            "Financial Advisory",
            "Change Management"
        ],
        color: "text-orange-500",
        bg: "bg-orange-500/10",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
    },
];

export const erpSolutions = [
    {
        id: "hrms",
        title: "AI Powered HRMS Module",
        subtitle: "Human Resource Reinvented",
        description: "Modern AI-powered HRMS module with ERP integration. Features include AI resume scanning, AI calling agent, face recognition & geo-tagged attendance to automate HR operations and boost productivity.",
        longDescription: "A modern HRMS module within an ERP system transforms traditional human resource operations into a smart, automated, and data-driven experience. Our advanced AI-powered HRMS is designed to simplify recruitment, attendance, payroll, and employee lifecycle management on a single platform.",
        content: (
            <div className="space-y-6">
                <p>
                    A modern HRMS module within an ERP system transforms traditional human resource operations into a smart, automated, and data-driven experience. Our advanced AI-powered HRMS is designed to simplify recruitment, attendance, payroll, and employee lifecycle management on a single platform. With AI resume scanning, the system automatically shortlists the best candidates by matching skills, experience, and job requirements, reducing hiring time significantly. An AI calling agent conducts initial candidate screening calls, asks predefined questions, records responses, and shares insights with the HR team. The HRMS also includes face recognition attendance with geo-tagging, ensuring accurate, fraud-free attendance tracking for on-site, remote, and field employees. Integrated seamlessly with ERP, the HRMS enables real-time data flow across departments, improving transparency and operational efficiency.
                </p>
                <p>
                    Implementing a smart HRMS solution helps organizations work faster, smarter, and more compliantly. Automated attendance, leave, payroll, and compliance reduce manual errors and administrative workload, allowing HR teams to focus on strategic initiatives. AI-driven hiring improves workforce quality, while geo-tagged and face-based attendance enhances accountability and productivity. With centralized employee data, performance tracking, and customizable workflows, organizations gain better decision-making capabilities and scalability. Our ERP HRMS module empowers businesses to improve employee experience, optimize costs, and drive sustainable growth using intelligent automation and AI-driven insights.
                </p>
            </div>
        ),
        icon: Users,
        features: [
            "AI Resume Scanning & Shortlisting",
            "AI Calling Agent for Screening",
            "Face Recognition & Geo-tagging",
            "Automated Payroll & Compliance",
            "Employee Lifecycle Management",
            "Real-time Data Integration"
        ],
        benefits: [
            { title: "Reduce Hiring Time", description: "AI automates resume screening and initial calls, speeding up recruitment." },
            { title: "Fraud-Free Attendance", description: "Geo-tagged face recognition ensures 100% accurate attendance tracking." },
            { title: "Strategic HR Focus", description: "Automating admin tasks allows HR to focus on culture and growth." }
        ],
        faq: [
            { question: "Is the attendance system compatible with biometrics?", answer: "Yes, we integrate seamlessly with most standard biometric devices and also offer mobile-based facial recognition." },
            { question: "Does it handle Indian statutory compliance?", answer: "Absolutely. PF, ESIC, PT, and TDS calculations are built-in and updated automatically with regulations." }
        ],
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
            "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80"
        ],
        className: "md:col-span-1",
        cta: "Explore HRMS",
        tags: ["HR", "AI", "Automation"],
    },
    {
        id: "task-manager",
        title: "ERP Task Manager Module",
        subtitle: "Intelligent Work Execution",
        description: "Manage tasks, track employee performance daily, monitor projects, and get real-time notifications with Siyaratech’s ERP Task Manager module.",
        longDescription: "Siyaratech’s ERP Task Manager module is designed to bring complete visibility and control over daily operations. It enables organizations to assign, track, and monitor employee tasks on a daily basis while aligning them with ongoing projects and business goals.",
        content: (
            <div className="space-y-6">
                <p>
                    Siyaratech’s ERP Task Manager module is designed to bring complete visibility and control over daily operations. It enables organizations to assign, track, and monitor employee tasks on a daily basis while aligning them with ongoing projects and business goals. Managers can view real-time task status, deadlines, workload distribution, and employee performance from a single dashboard. With automated notifications, reminders, and priority alerts, teams never miss critical updates, approvals, or milestones. The Task Manager seamlessly integrates with other ERP modules, ensuring smooth coordination between departments and eliminating manual follow-ups.
                </p>
                <p>
                    The Task Manager module improves productivity, accountability, and transparency across the organization. By tracking employee performance daily, management can identify bottlenecks, optimize resource allocation, and ensure timely project delivery. Clear task ownership and progress tracking reduce delays and miscommunication, while data-driven insights help leaders make faster, smarter decisions. Whether managing small teams or large, multi-project environments, Siyaratech’s ERP Task Manager helps organizations streamline workflows, enhance employee efficiency, and achieve operational excellence.
                </p>
            </div>
        ),
        icon: CheckSquare,
        features: [
            "Real-time Task Status & Deadlines",
            "Automated Notifications & Reminders",
            "Employee Performance Tracking",
            "Workload Distribution Dashboard",
            "Seamless ERP Integration",
            "Priority Alerts Management"
        ],
        benefits: [
            { title: "Enhance Efficiency", description: "Streamline workflows and eliminate manual follow-ups for better productivity." },
            { title: "Improve Accountability", description: "Clear task ownership and daily tracking reduce delays and miscommunication." },
            { title: "Data-Driven Decisions", description: "Gain insights into bottlenecks and resource allocation for smarter management." }
        ],
        faq: [
            { question: "Can I invite external clients?", answer: "Yes, you can give clients restricted 'Guest' access to view progress without seeing internal chats." },
            { question: "Does it integrate with email?", answer: "Yes, convert emails to tasks instantly and reply directly from the task comments." }
        ],
        image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&q=80",
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
            "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80"
        ],
        className: "md:col-span-1",
        cta: "Explore Task Manager",
        tags: ["Tasks", "Productivity", "Management"],
    },
    {
        id: "accounts-billing",
        title: "Smart Accounting & Invoicing Solution",
        subtitle: "Accuracy Meets Automation",
        description: "Siyaratech Accounts and Billing ERP automates invoicing, GST compliance, payments, and financial reporting. A smart, AI-driven accounting solution for every business.",
        longDescription: "Siyaratech Accounts and Billing Module is a powerful, intelligent ERP solution designed to simplify and automate end-to-end financial operations for businesses across all industries. From real-time accounting, invoicing, GST compliance, and expense tracking to automated billing cycles and financial reporting...",
        content: (
            <div className="space-y-6">
                <p>
                    Siyaratech Accounts and Billing Module is a powerful, intelligent ERP solution designed to simplify and automate end-to-end financial operations for businesses across all industries. From real-time accounting, invoicing, GST compliance, and expense tracking to automated billing cycles and financial reporting, this module ensures complete control and visibility over your finances. Built with flexibility and customization at its core, Siyaratech’s AI-driven ERP adapts seamlessly to your business processes—whether you are a startup, SME, construction company, manufacturing unit, service provider, or enterprise. By integrating accounts, billing, sales, purchases, and taxation on a single platform, businesses can eliminate manual errors, reduce dependency on spreadsheets, and ensure accurate, audit-ready financial data at all times.
                </p>
                <p>
                    The Siyaratech Accounts and Billing Module helps every business improve cash flow, accelerate billing, and make data-driven financial decisions with ease. Automated invoice generation, payment tracking, credit/debit notes, bank reconciliation, and multi-payment gateway support ensure faster collections and smoother financial workflows. With real-time dashboards, profit & loss statements, balance sheets, and compliance-ready reports, business owners and finance teams gain instant insights into financial health and performance. Whether managing high transaction volumes or complex project-based billing, Siyaratech empowers organizations to scale efficiently, stay compliant, and achieve financial clarity—making it a reliable ERP accounting solution built your way.
                </p>
            </div>
        ),
        icon: DollarSign,
        features: [
            "Automated Invoicing & GST Compliance",
            "Real-time Payment Tracking",
            "Bank Reconciliation Integration",
            "Expense & Purchase Management",
            "P&L, Balance Sheet & Reports",
            "Multi-Payment Gateway Support"
        ],
        benefits: [
            { title: "Accelerate Billing", description: "Automated invoice generation and payment tracking speed up cash flow." },
            { title: "Audit-Ready Data", description: "Real-time accuracy and compliance ensure your books are always ready." },
            { title: "Financial Clarity", description: "Instant insights into financial health empower better decision-making." }
        ],
        faq: [
            { question: "Can I generate E-way bills?", answer: "Yes, E-invoicing and E-way bill generation are integrated directly into the workflow." },
            { question: "Is my financial data secure?", answer: "We use bank-grade 256-bit encryption and regular backups to ensure total data safety." }
        ],
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1554224154-260327c00c73?w=800&q=80",
            "https://images.unsplash.com/photo-1542744095-291d1f67b221?w=800&q=80",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
        ],
        className: "md:col-span-1",
        cta: "Explore Accounts",
        tags: ["Finance", "Billing", "GST"],
    },
    {
        id: "project-manager",
        title: "AI-Powered ERP Project Management Software",
        subtitle: "Deliver Projects Faster",
        description: "Siyaratech Project Manager Module is an AI-driven ERP solution for planning, tracking, and delivering projects efficiently. Ideal for all industries to improve productivity, control costs, and ensure on-time project completion.",
        longDescription: "Siyaratech Project Manager Module is a powerful, AI-enabled ERP solution designed to help businesses plan, execute, and deliver projects on time and within budget. Built for flexibility, this module enables organizations across industries—construction, IT, manufacturing, consulting, healthcare, and service-based businesses—to manage projects from initiation to closure on a single, centralized platform.",
        content: (
            <div className="space-y-6">
                <p>
                    Siyaratech Project Manager Module is a powerful, AI-enabled ERP solution designed to help businesses plan, execute, and deliver projects on time and within budget. Built for flexibility, this module enables organizations across industries—construction, IT, manufacturing, consulting, healthcare, and service-based businesses—to manage projects from initiation to closure on a single, centralized platform. With features like project planning, task allocation, milestone tracking, real-time progress monitoring, and resource utilization, businesses gain complete visibility into every stage of a project. Automated workflows, smart alerts, and seamless integration with accounts, billing, HRMS, and task management modules ensure better coordination, reduced delays, and improved accountability.
                </p>
                <p>
                    what makes the Siyaratech Project Manager truly valuable for every business is its customization and AI-driven insights. Whether managing small internal projects or large multi-site operations, the module adapts to your business processes and scales as you grow. Managers can track timelines, costs, manpower, materials, and dependencies in real time, while AI-powered analytics help predict risks, control overruns, and improve decision-making. By eliminating manual tracking and disconnected tools, Siyaratech Project Manager boosts productivity, enhances collaboration among teams, and ensures profitable project delivery—making it an essential ERP module for businesses aiming for efficiency, transparency, and sustainable growth.
                </p>
            </div>
        ),
        icon: Briefcase,
        features: [
            "Project Planning & Task Allocation",
            "Milestone Tracking & Progress Monitoring",
            "Resource Utilization Management",
            "Automated Workflows & Smart Alerts",
            "Integration with HRMS & Billing",
            "AI-Powered Risk Prediction"
        ],
        benefits: [
            { title: "Complete Visibility", description: "Gain insights into every stage of your project from a single platform." },
            { title: "Control Costs", description: "Real-time tracking of costs and resources prevents budget overruns." },
            { title: "Improve Collaboration", description: "Seamless integration across modules enhances coordination and accountability." }
        ],
        faq: [
            { question: "Does it support Agile/Scrum?", answer: "Yes, we have dedicated Sprint views and Backlog management for Agile teams." },
            { question: "Can I export reports?", answer: "Export detailed PDF/Excel reports for clients and stakeholders instantly." }
        ],
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=800&q=80",
            "https://images.unsplash.com/photo-1553877615-2f3315790720?w=800&q=80",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
        ],
        className: "md:col-span-1",
        cta: "Explore Projects",
        tags: ["Projects", "Planning", "Gantt"],
    },
    {
        id: "labour-management",
        title: "Siyaratech Labour Management Module",
        subtitle: "Workforce Made Intelligent",
        description: "Manage workforce efficiently with Siyaratech Labour Management Module. Automate attendance, wages, compliance & productivity with AI-driven ERP solutions built your way.",
        longDescription: "Siyaratech Labour Management Module is a powerful ERP solution designed to help businesses efficiently manage their workforce, reduce operational costs, and improve productivity. Whether you operate in construction, manufacturing, logistics, infrastructure, retail, or service-based industries, this module gives you complete control over labour planning and execution.",
        content: (
            <div className="space-y-6">
                <p>
                    Siyaratech Labour Management Module is a powerful ERP solution designed to help businesses efficiently manage their workforce, reduce operational costs, and improve productivity. Whether you operate in construction, manufacturing, logistics, infrastructure, retail, or service-based industries, this module gives you complete control over labour planning and execution. From worker onboarding, attendance tracking, shift scheduling, and wage calculation to compliance management and real-time reporting, Siyaratech ensures every labour-related process is automated and error-free. With centralized data and smart dashboards, management teams gain full visibility into labour utilization, helping them make faster and more informed decisions.
                </p>
                <p>
                    what makes the Siyaratech Labour Management Module truly valuable is its flexibility and AI-driven capabilities, built to suit businesses of all sizes. The system adapts to permanent, contractual, and daily wage workers while seamlessly integrating with payroll, accounts, and project management modules of the ERP. Businesses can track productivity, reduce labour leakage, ensure statutory compliance, and optimize manpower allocation across sites or departments. By eliminating manual records and fragmented systems, Siyaratech empowers organizations to work smarter, scale faster, and maintain transparency—said differently, a future-ready labour management solution built your way.
                </p>
            </div>
        ),
        icon: Users,
        features: [
            "Worker Onboarding & Verification",
            "Shift Scheduling & Wage Calculation",
            "Compliance Management & Reporting",
            "Real-time Labour Utilization",
            "AI-Driven Productivity Tracking",
            "Seamless Payroll Integration"
        ],
        benefits: [
            { title: "Eliminate Labour Leakage", description: "Automated tracking ensures you pay only for valid work hours." },
            { title: "Ensure Compliance", description: "Stay audit-ready with automated statutory compliance features." },
            { title: "Optimize Workforce", description: "Gain insights to allocate manpower effectively across sites." }
        ],
        faq: [
            { question: "Does it work offline?", answer: "Yes, the mobile app works offline and syncs when connectivity is restored." },
            { question: "Can it handle daily wagers?", answer: "Yes, it is specifically designed to handle daily, weekly, and piece-rate payments." }
        ],
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
        className: "md:col-span-2",
        cta: "Explore Labour Mgmt",
        tags: ["Labour", "Workforce", "Tracking"],
    },
    {
        id: "plant-machinery",
        title: "Plant & Machinery ERP Software",
        subtitle: "Zero Downtime. Full Control.",
        description: "Manage plant and machinery efficiently with Siyaratech ERP. Track assets, maintenance, utilization, costs, and performance with an AI-driven, customizable ERP solution for all industries.",
        longDescription: "Siyaratech’s Plant and Machinery ERP Module is a powerful, AI-driven solution designed to help businesses efficiently manage their equipment, assets, and heavy machinery from a single, centralized platform. Whether you operate in construction, manufacturing, infrastructure, logistics, mining, or any asset-intensive industry, this module gives you complete visibility into machine lifecycle management.",
        content: (
            <div className="space-y-6">
                <p>
                    Siyaratech’s Plant and Machinery ERP Module is a powerful, AI-driven solution designed to help businesses efficiently manage their equipment, assets, and heavy machinery from a single, centralized platform. Whether you operate in construction, manufacturing, infrastructure, logistics, mining, or any asset-intensive industry, this module gives you complete visibility into machine lifecycle management. From asset registration, usage tracking, and preventive maintenance scheduling to breakdown history, AMC management, and cost tracking, Siyaratech ensures your plant and machinery operate at peak efficiency. With real-time dashboards and intelligent alerts, businesses can reduce downtime, avoid unexpected failures, and extend the lifespan of critical equipment while maintaining compliance and audit readiness.
                </p>
                <p>
                    The Siyaratech Plant and Machinery Module is built to support businesses of every size by improving productivity, controlling operational costs, and enabling smarter decision-making. Integrated seamlessly with other ERP modules like Project Management, Accounts & Billing, Inventory, and Labour Management, it provides accurate machinery costing, fuel and spare consumption tracking, and performance analytics. AI-powered insights help organizations plan maintenance proactively, optimize machine utilization, and improve ROI on high-value assets. Fully customizable and scalable, Siyaratech’s ERP adapts to your unique business processes, making it the ideal plant and machinery management solution for businesses looking to grow faster, smarter, and more profitably.
                </p>
            </div>
        ),
        icon: Factory,
        features: [
            "Asset Registration & Tracking",
            "Preventive Maintenance Scheduling",
            "Breakdown History & Cost Tracking",
            "Fuel & Spare Consumption",
            "Real-time Dashboard & Alerts",
            "AI-Powered Utilization Insights"
        ],
        benefits: [
            { title: "Reduce Downtime", description: "Prevent unexpected failures with intelligent alerts and scheduled maintenance." },
            { title: "Optimize Utilization", description: "Track asset usage and performance to maximize ROI." },
            { title: "Control Costs", description: "Monitor fuel and spare parts consumption to eliminate waste." }
        ],
        faq: [
            { question: "Can I track vehicle location?", answer: "Yes, via GPS integration you can track live location and route history." },
            { question: "Is it suitable for rental fleets?", answer: "Yes, manage rental billing and utilization logs effortlessly." }
        ],
        image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800&q=80",
        className: "md:col-span-1",
        cta: "Explore Machinery",
        tags: ["Machinery", "Maintenance", "IoT"],
    },
    {
        id: "crm-ai-agent",
        title: "AI CRM with ERP Integration",
        subtitle: "Your Smart Sales Co-Pilot",
        description: "Siyaratech CRM with ERP automates lead generation from Instagram, LinkedIn & websites using AI calling agents. Identify hot leads, boost sales & grow faster.",
        longDescription: "Siyaratech, AI-driven customer relationship management solution designed to help businesses capture, manage, and convert leads faster from multiple digital channels. Our CRM automates lead generation from Instagram, LinkedIn, websites, Facebook, and other platforms, ensuring that no opportunity is missed.",
        content: (
            <div className="space-y-6">
                <p>
                    Siyaratech, AI-driven customer relationship management solution designed to help businesses capture, manage, and convert leads faster from multiple digital channels. Our CRM automates lead generation from Instagram, LinkedIn, websites, Facebook, and other platforms, ensuring that no opportunity is missed. Every inquiry is automatically captured, stored, and tracked in a centralized dashboard. With an AI calling agent, Siyaratech CRM instantly contacts new leads, engages them through intelligent conversations, follows up automatically, and identifies hot, warm, and cold leads based on real-time responses and intent analysis. This eliminates manual calling, reduces response time, and enables your sales team to focus only on high-potential prospects.
                </p>
                <p>
                    What makes Siyaratech CRM powerful for every business is its seamless integration with ERP modules such as sales, accounts, billing, inventory, project management, and customer lifecycle tracking. From startups to enterprises, our CRM helps organizations improve sales productivity, shorten sales cycles, and increase conversion rates through AI-powered automation. Businesses gain complete visibility into customer interactions, payment status, order history, and follow-ups on a single platform. Whether you are in real estate, construction, manufacturing, retail, healthcare, education, or services, Siyaratech CRM adapts to your workflow and scales as your business grows—truly delivering Smart, AI-Driven Solutions – Built Your Way.
                </p>
            </div>
        ),
        icon: Bot,
        features: [
            "Automated Lead Generation (Social/Web)",
            "AI Calling Agent for Instant Engagement",
            "Real-time Lead Scoring (Hot/Warm/Cold)",
            "Seamless ERP Integration",
            "Centralized Interaction Dashboard",
            "Sales Pipeline Visibility"
        ],
        benefits: [
            { title: "Boost Conversions", description: "Instant engagement and lead scoring ensure you never miss a hot lead." },
            { title: "Save Time", description: "Automated calling and follow-ups free your team to focus on closing." },
            { title: "Complete Visibility", description: "See all customer interactions and history on a single platform." }
        ],
        faq: [
            { question: "Does it integrate with WhatsApp?", answer: "Yes, send official WhatsApp API messages directly from the CRM." },
            { question: "Can I import leads from Excel?", answer: "Yes, bulk import tools make migrating your existing data simple." }
        ],
        image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
            "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
        ],
        className: "md:col-span-3",
        cta: "Explore CRM AI",
        tags: ["CRM", "Sales", "AI Agent"],
    },
];

export const innovativeProducts = [
    {
        id: "influencer-platform",
        title: "Influencer Ecommerce",
        subtitle: "Social-First Discovery",
        description: "Transform traditional online shopping into a social-first discovery experience powered by influencers.",
        longDescription: "The future of e-commerce is social. All-in-one platform for influencers to launch their own store. We handle sourcing, logistics, and payments so you can focus on creating content.",
        icon: ShoppingBag,
        gradient: "from-pink-500 to-rose-500",
        features: ["React", "Java Springboot", "Firebase", "Stripe Connect", "Video Streaming"],
        benefits: [
            { title: "Authentic Engagement", description: "Shoppers trust people over brands. Leverage creator credibility to boost sales." },
            { title: "Seamless Attribution", description: "Automated commission tracking ensures creators get paid for every sale they drive." },
            { title: "Video-First Shopping", description: "Support for shoppable videos and live streams to showcase products in action." }
        ],
        faq: [
            { question: "How do payouts work?", answer: "Integrated with Stripe Connect for automatic split payments to influencers." },
            { question: "Is it a marketplace?", answer: "It can be configured as a multi-vendor marketplace or a single-brand ambassador portal." }
        ],
        content: (
            <div className="flex flex-col space-y-6">
                <video
                    src="/videos/Admin_Video.mp4"
                    controls
                    autoPlay
                    loop
                    muted
                    className="w-full rounded-lg shadow-lg"
                />
                <p>
                    <span className="bg-black/10 px-2 rounded-md">Confidentiality Note:</span> This is a next-generation social commerce platform that empowers influencers to become digital entrepreneurs by seamlessly blending authentic content with powerful storefronts. Designed to revolutionize how creators connect with audiences and monetize their reach, the platform transforms traditional shopping into a dynamic, trust-driven experience. With personalized profiles, curated product collections, and transparent earnings, InfluenceSphere enables creators to build mini-brands while offering followers a more engaging, socially-inspired way to shop and discover trends.
                </p>
                <p>
                    The platform solves the core disconnect between content consumption and product purchase. Traditionally, a user sees a product on Instagram, clicks a bio link, navigates a third-party store, and often drops off. InfluenceSphere embeds the checkout experience directly within the creator&apos;s ecosystem. Whether through shoppable videos, live streams, or curated &lsquo;Lookbooks&rsquo;, followers can purchase without breaking the engagement flow. This frictionless path to purchase significantly increases conversion rates compared to traditional affiliate marketing.
                </p>
                <p>
                    For brands, this is a massive distribution engine. Instead of negotiating one-off deals with thousands of influencers, brands upload their catalog to the central marketplace. Creators can then &lsquo;pick&rsquo; products they love and add them to their store instantly. Inventory, shipping, and customer service are handled by the brand or the platform fulfillment, while the creator focuses purely on storytelling and sales.
                </p>
                <p>
                    Data transparency is a key pillar. Creators get a real-time dashboard showing not just clicks, but actual sales, returned orders, and commission payouts. They can see which products resonate with their audience and optimize their content strategy accordingly. Brands, in turn, get granular data on which influencer is driving which demographic, allowing for hyper-targeted marketing spend.
                </p>
                <p>
                    This is not just an e-commerce site; it is a creator economy operating system. By handling the &lsquo;boring&rsquo; bits of business—logistics, payments, legal—we empower creative individuals to build sustainable, scalable retail empires.
                </p>
            </div>
        ),
        image: "/images/IS_Admin_Dashboard.png",
        gallery: [
            "/images/IS_Homepage.png",
            "/images/IS_Admin_Dashboard.png",
            "/images/IS_Cart.png",
            "/images/IS_Col_Prods.png",
            "/images/IS_Order_Details.png",
            "/images/IS_Order.png",
            "/images/IS_ProductDetails.png",
            "/images/IS_Search.png",
            "/images/IS_Wishlist.png"
        ],
        tags: ["Social Commerce", "Influencers", "E-commerce"],
    },
    {
        id: "techdivehub",
        title: "TechDiveHub",
        subtitle: "Engaging Learning Journey",
        description: "Transforming Learning into an Engaging Journey for students and professionals.",
        longDescription: "TechDiveHub is more than an LMS; it's a vibrant learning ecosystem. Designed to make technical education accessible and engaging.",
        content: (
            <div className="space-y-6">
                <p>
                    TechDiveHub is an innovative educational platform designed to revolutionize the learning experience by making complex concepts accessible and enjoyable. By seamlessly blending real-life examples with an engaging teaching approach, the platform breaks down educational barriers and transforms traditional learning into an interactive, fun-filled adventure. Students and learners are empowered to grasp challenging subjects through conversational, relatable explanations that simplify intricate topics and make knowledge acquisition both effortless and exciting.
                </p>
                <p>
                    The platform distinguishes itself with its &lsquo;Code-First&rsquo; philosophy. Unlike traditional video courses where you watch and forget, TechDiveHub integrates a powerful browser-based IDE. Learners can pause a video, type code in the adjacent window, and see the output instantly. This active learning loop reinforces concepts immediately. We support multiple languages including Python, JavaScript, Go, and Rust, allowing for a diverse curriculum.
                </p>
                <p>
                    Community is at the heart of learning. TechDiveHub features cohort-based courses where students start and finish together. Real-time discussion forums, peer-review systems for assignments, and virtual study rooms create a campus-like atmosphere. Mentors can jump into a student&apos;s code session to debug live, bridging the gap between self-paced learning and personalized tutoring.
                </p>
                <p>
                    Gamification drives retention. We have replaced boring progress bars with an RPG-style experience system. Users earn XP for completing lessons, unlock badges for streaks, and climb leaderboards for helping others in the forum. This taps into the psychological drivers of achievement and competition, keeping motivation high even when the subject matter gets tough.
                </p>
                <p>
                    For enterprises, TechDiveHub offers a white-label solution for internal upskilling. Companies can curate custom learning paths, track employee progress, and conduct skill assessments. Whether it is onboarding new hires or retraining a workforce for a cloud migration, TechDiveHub is the engine of continuous improvement.
                </p>
            </div>
        ),
        icon: BookOpen,
        gradient: "from-blue-500 to-cyan-500",
        features: ["Next.js", "TailwindCSS", "Monaco Editor", "Gamification Engine"],
        benefits: [
            { title: "Learn by Doing", description: "Integrated code playgrounds allow learners to practice without leaving the browser." },
            { title: "Boost Completion Rates", description: "Gamification elements like badges and streaks compel users to finish courses." },
            { title: "Community Driven", description: "Built-in forums and study groups foster a collaborative learning environment." }
        ],
        faq: [
            { question: "Does it support video hosting?", answer: "Yes, it integrates with providers like Vimeo and YouTube for course content." }
        ],
        image: "/images/sidefolio-aceternity-2.png",
        gallery: [
            "/images/coursevidhya.png",
            "/images/coursevidhya_2.png"
        ],
        tags: ["EdTech", "Learning", "Community"],
    },
    {
        id: "shopsphere",
        title: "Shopshere",
        subtitle: "E-Commerce Platform",
        description: "A robust and scalable e-commerce platform designed for modern retail needs.",
        longDescription: "Shopshere offers a wide array of features, including personalized product recommendations, secure payment options, and fast, reliable delivery services.",
        content: (
            <div className="space-y-6">
                <p>
                    ShopSphere is a comprehensive e-commerce platform designed to enhance online shopping experiences for both businesses and consumers. It offers a wide array of features, including personalized product recommendations, secure payment options, and fast, reliable delivery services. The platform boasts an intuitive user interface, making navigation and product discovery seamless for users. Additionally, ShopSphere provides robust tools for vendors, such as inventory management, sales tracking, and order fulfillment capabilities, empowering businesses to manage their online presence effectively.
                </p>
                <p>
                    Performance is our obsession. We understand that a 1-second delay in load time can cost 7% in conversions. That is why ShopSphere is built on a headless architecture using Next.js and edge caching. Your storefront loads instantly for customers across the globe. Our image optimization pipeline ensures that high-resolution product photos look great on 4K screens but load fast on 3G connections.
                </p>
                <p>
                    Personalization is the key to higher cart values. Our built-in recommendation engine analyzes user behavior, purchase history, and browsing patterns to suggest relevant cross-sells and upsells. &lsquo;Customers who bought this also bought...&rsquo; isn&apos;t just a widget; it&apos;s a dynamic AI model that updates in real-time. This help merchants squeeze more revenue from every visitor.
                </p>
                <p>
                    Managing a catalog of thousands of SKUs is simple with our PIM (Product Information Management) system. Bulk edits, variant management, and multi-warehouse inventory tracking are standard features. We also integrate with major shipping carriers to generate labels and track packages automatically.
                </p>
                <p>
                    Security is non-negotiable. ShopSphere is PCI-DSS compliant and includes fraud detection algorithms that flag suspicious transactions before they charge back. We protect your business and your customers&apos; data with enterprise-grade encryption and regular security audits.
                </p>
            </div>
        ),
        icon: ShoppingCartIcon,
        gradient: "from-violet-500 to-purple-500",
        features: ["React", "NodeJS", "TailwindCSS", "ElasticSearch", "Redis"],
        benefits: [
            { title: "Blazing Fast Load Times", description: "Optimized architecture ensures sub-second page loads, boosting SEO and conversions." },
            { title: "Infinite Scalability", description: "Microservices design allows individual components to scale during peak traffic." },
            { title: "Omnichannel Ready", description: "Sell everywhere—web, app, social, and marketplaces—from one inventory." }
        ],
        faq: [
            { question: "Is it SEO friendly?", answer: "Yes, built with Next.js/SSR for maximum search engine visibility." }
        ],
        image: "/images/shopshere1.png",
        gallery: [
            "/images/shopshere1.png",
            "/images/shopshere2.png"
        ],
        tags: ["E-commerce", "Retail", "Platform"],
    },
    {
        id: "byteblog",
        title: "Byteblog",
        subtitle: "Tech Blogs Platform",
        description: "A dedicated platform for tech enthusiasts to share knowledge and insights.",
        longDescription: "Byteblog is a specialized publishing platform tailored for developers and tech writers.",
        content: (
            <div className="space-y-6">
                <p>
                    ByteBlog is a modern blogging platform designed to facilitate the sharing of stories and creative ideas. It offers a user-friendly interface that allows users to explore various categories, such as &quot;Tech News,&quot; and discover new content effortlessly. The platform&#39;s clean design and intuitive navigation enhance the reading experience, making it easy for users to engage with diverse topics.
                </p>
                <p>
                    We built ByteBlog specifically for the developer community. The editor supports Markdown natively, with syntax highlighting for over 100 programming languages. Embedding Gists, CodePens, or interactive stack blitz snippets is as easy as pasting a URL. We know that technical writing requires technical tools, and we&apos;ve removed the friction of formatting code in a rich-text editor.
                </p>
                <p>
                    Discovery is powered by a semantic tagging system. Unlike generic platforms, our algorithm understands the relationship between &lsquo;React&rsquo;, &lsquo;JavaScript&rsquo;, and &lsquo;Frontend&rsquo;. This ensures that your deep-dive article on React Hooks reaches the right audience, not just random passersby. Features like &lsquo;Series&rsquo; allow authors to chain multiple posts into a coherent course or tutorial, increasing reader retention.
                </p>
                <p>
                    Monetization is built-in for serious writers. You can enable a &lsquo;Sponsor&rsquo; button, offer premium newsletters, or put specific posts behind a paywall. We handle the subscriptions and payments via Stripe, taking a minimal platform fee. You own your audience; you can export your subscriber list at any time.
                </p>
                <p>
                    Performance is paramount. ByteBlog sites are static-generated (SSG) for instant loading and perfect Core Web Vitals. This gives your content a massive SEO advantage. Sitemaps, meta tags, and structured data schemas are generated automatically, ensuring Google loves your blog as much as your readers do.
                </p>
            </div>
        ),
        icon: FileText,
        gradient: "from-amber-500 to-orange-500",
        features: ["React", "NodeJS", "TailwindCSS", "Markdown Support", "Syntax Highlighting"],
        benefits: [
            { title: "Developer Friendly Writing", description: "Write in Markdown, paste code snippets, and publish instantly." },
            { title: "SEO Optimized", description: "Auto-generated sitemaps and meta tags ensure your content ranks well." },
            { title: "Newsletter Integration", description: "Capture emails and send newsletters directly from your blog dashboard." }
        ],
        faq: [
            { question: "Can I use my own domain?", answer: "Yes, custom domain mapping is supported on all plans." }
        ],
        image: "/images/byteblog1.png",
        gallery: [
            "/images/byteblog1.png",
            "/images/byteblog2.png"
        ],
        tags: ["Blogging", "Tech", "Content"],
    },
    {
        id: "collabease",
        title: "CollabEase",
        subtitle: "Task Management",
        description: "Streamline collaboration and manage tasks efficiently with intuitive tools.",
        longDescription: "CollabEase simplifies project management for remote and hybrid teams. By combining chat, tasks, and file storage in one intuitive interface.",
        content: (
            <div className="space-y-6">
                <p>
                    CollabEase is a task management application designed to streamline team collaboration and enhance productivity. It offers features such as swift task delegation, customizable digital forms and checklists, task automation, and dedicated communication channels for each task. These functionalities ensure clear delegation, efficient workflow automation, and focused communication, enabling teams to operate seamlessly and achieve their goals effectively.
                </p>
                <p>
                    The modern workspace is fragmented across emails, chat apps, and file drives. CollabEase unifies these into a &lsquo;Project Hub&rsquo;. Every project has a chat room, a task board, and a file repository. When you upload a design mockup to the chat, it is automatically linked to the relevant task and stored in the files tab. This context preservation saves hours of searching for &lsquo;that file you sent last Tuesday&rsquo;.
                </p>
                <p>
                    Automation is democratic here. You don&apos;t need a developer to set up workflows. Our &lsquo;If This Then That&rsquo; builder allows any user to create rules like &lsquo;When a task is moved to Review, notify the QA lead&rsquo; or &lsquo;Every Monday, create a recurring task for Weekly Report&rsquo;. These micro-automations add up to massive time savings across the organization.
                </p>
                <p>
                    Visual collaboration is a standout feature. Our built-in whiteboard allows teams to sketch ideas, sticky-note brainstorms, and wireframe interfaces in real-time during video calls. The whiteboard is infinite and persistent—you can come back to it a week later and pick up right where you left off.
                </p>
                <p>
                    Security is enterprise-grade. We offer Single Sign-On (SSO), role-based access control, and audit logs. Whether you are a startup of 5 or a corporation of 5000, CollabEase scales with you, keeping your intellectual property safe and your teams aligned.
                </p>
            </div>
        ),
        icon: CheckSquare,
        gradient: "from-emerald-500 to-green-500",
        features: ["React", "NodeJS", "TailwindCSS", "Real-time Socket.io", "File Sharing"],
        benefits: [
            { title: "Reduce Meeting Fatigue", description: "Async standups and updates keep the team informed without calls." },
            { title: "Centralized Knowledge", description: "Never lose a file or decision; everything is searchable in one place." },
            { title: "Secure collaboration", description: "Enterprise-grade encryption for all your team's communications." }
        ],
        faq: [
            { question: "Does it have a mobile app?", answer: "Yes, fully responsive capability on iOS and Android browsers." }
        ],
        image: "/images/collabease1.png",
        gallery: [
            "/images/collabease1.png",
            "/images/collabease2.png"
        ],
        tags: ["Productivity", "Task Mgmt", "Collaboration"],
    },
    {
        id: "ecommerce-dashboard",
        title: "E-commerce Dashboard",
        subtitle: "Marketplace Management",
        description: "Comprehensive Digital Marketplace Management for tracking sales and inventory.",
        longDescription: "The E-commerce Dashboard is the command center for your online business. Aggregating data from Shopify, Amazon, and your own web store.",
        content: (
            <div className="space-y-6">
                <p>
                    A robust e-commerce solution that provides a seamless online shopping experience with a powerful admin dashboard for comprehensive business management. The platform enables merchants to efficiently control product listings, track sales, manage inventory, process orders, and gain real-time insights through intuitive analytics and reporting tools, creating a streamlined and intelligent digital retail environment.
                </p>
                <p>
                    For multi-channel sellers, inventory synchronization is the holy grail. Our dashboard acts as the master record. When you sell an item on Amazon, stock is instantly reduced on your Shopify store and eBay listing. This prevents the nightmare of overselling and negative reviews. You can set low-stock alerts and automate purchase orders to suppliers, ensuring you never miss a sale due to stockouts.
                </p>
                <p>
                    Analytics are designed for profitability, not just volume. We drill down into unit economics, showing you the net profit per product after shipping, ad spend, and platform fees. You can identify which products are your &lsquo;stars&rsquo; and which are &lsquo;dogs&rsquo;. Our cohort analysis helps you understand LTV (Lifetime Value) and repurchase rates, guiding your retention marketing strategy.
                </p>
                <p>
                    Order fulfillment is streamlined. We integrate with major shipping aggregators. You can compare rates, print labels in bulk, and schedule pickups directly from the dashboard. Returns management—often a logistical headache—is simplified with a self-service portal for customers to initiate returns, which you can approve and track.
                </p>
                <p>
                    This dashboard is built for scale. Whether you are processing 10 orders a day or 10,000, our cloud-native architecture ensures stability. We support multiple users with granular permissions, so your warehouse staff can see orders but not financial reports. Run your e-commerce empire from a single screen.
                </p>
            </div>
        ),
        icon: LayoutDashboard,
        gradient: "from-indigo-500 to-blue-600",
        features: ["React", "TailwindCSS", "Express", "Data Visualization", "API Aggregation"],
        benefits: [
            { title: "Unified Data View", description: "Stop logging into five different portals; see everything in one place." },
            { title: "Actionable Insights", description: "AI-driven alerts tell you which products need restocking or promotion." },
            { title: "Multi-Store Support", description: "Manage multiple brands or regions seamlessly from one account." }
        ],
        faq: [
            { question: "Which platforms does it support?", answer: "Supports Shopify, WooCommerce, Magento, and Amazon FBA out of the box." }
        ],
        image: "/images/sidefolio-algochurn.png",
        gallery: [
            "/images/sidefolio-algochurn.png",
            "/images/sidefolio-algochurn-2.png"
        ],
        tags: ["Dashboard", "Analytics", "E-commerce"],
    },
    {
        id: "ai-interview",
        title: "AI Interview Simulator",
        subtitle: "Career Preparation",
        description: "Revolutionizing Career Preparation and Interview Skills with AI-driven simulations.",
        longDescription: "Prepare for your dream job with confidence. The AI Interview Simulator conducts realistic voice-based mock interviews tailored to your target role.",
        content: (
            <div className="space-y-6">
                <p>
                    An advanced AI-powered platform that provides realistic, interactive interview simulations designed to help job seekers build confidence, refine communication skills, and prepare comprehensively for professional interviews. Using sophisticated artificial intelligence, the simulator generates contextual questions, provides real-time feedback, analyzes verbal and non-verbal communication, and offers personalized insights to help users master interview techniques across various industries and job roles.
                </p>
                <p>
                    The core of the technology is our NLP engine, fine-tuned on thousands of actual interview transcripts. It doesn&apos;t just check for keywords; it assesses the structure, clarity, and relevance of your answers using the STAR method (Situation, Task, Action, Result). Whether you are preparing for a coding interview, a behavioral HR round, or a system design deep dive, the AI adapts its persona and difficulty level to match the target company&apos;s culture.
                </p>
                <p>
                    Voice analysis adds another layer of depth. We analyze your tone, pace, and filler words (ums, ahs). Are you speaking too fast? Do you sound uncertain? The feedback is granular and objective. We even use computer vision (optional) to analyze your posture and eye contact via webcam, ensuring you project confidence.
                </p>
                <p>
                    Review and learn. After every session, you get a detailed scorecard. You can listen to your recordings, read the AI&apos;s suggested improvements, and even hear a &lsquo;model answer&rsquo; generated by the system. This iterative practice loop—Simulate, Analyze, Improve—is the fastest way to interview mastery.
                </p>
                <p>
                    For universities and placement cells, this is a force multiplier. Instead of scheduling limited mock interviews with alumni, every student can practice unlimited times. Placement officers get a dashboard of student readiness, allowing them to intervene with coaching where it is needed most. We bridge the gap between campus and corporate.
                </p>
            </div>
        ),
        icon: Bot,
        gradient: "from-fuchsia-500 to-pink-600",
        features: ["Next.js", "TailwindCSS", "AI Integration", "Speech-to-Text", "Sentiment Analysis"],
        benefits: [
            { title: "Instant Feedback Loop", description: "Know immediately where you improved and where you stumbled." },
            { title: "Industry Specific Questions", description: "Practice with questions curated for Software, Finance, or Marketing roles." },
            { title: "Confidence Building", description: "Repeated practice in a safe environment reduces actual interview anxiety." }
        ],
        faq: [
            { question: "Is it voice enabled?", answer: "Yes, speak naturally and the AI will transcribe and analyze your response." }
        ],
        image: "/images/sidefolio-moonbeam-2.png",
        gallery: [
            "/images/sidefolio-moonbeam.png",
            "/images/sidefolio-moonbeam-2.png"
        ],
        tags: ["AI", "Career", "Recruitment"],
    },
    {
        id: "sketch-whiteboard",
        title: "Free Sketch Whiteboard",
        subtitle: "Digital Collaboration",
        description: "Unleashing Creativity through Digital Collaboration on an infinite canvas.",
        longDescription: "Brainstorm without boundaries. Free Sketch Whiteboard is a real-time collaborative canvas for teams. Draw diagrams, wireframes, and mind maps together instantly.",
        content: (
            <div className="space-y-6">
                <p>
                    A dynamic digital canvas that empowers users to brainstorm, sketch, and visualize ideas with complete freedom and intuitive design. This collaborative whiteboard platform provides a seamless, user-friendly interface where individuals and teams can draw, annotate, create mind maps, and share creative concepts in real-time, breaking down barriers between imagination and expression across personal, educational, and professional contexts.
                </p>
                <p>
                    Real-time collaboration is the heartbeat of this tool. Built on WebSockets, it synchronizes every stroke, text input, and object movement with millisecond latency. Whether you are in the same room or across continents, the experience is fluid. Multicolor cursors with name tags let you see exactly who is doing what, turning a chaotic brainstorm into a coordinated dance of ideas.
                </p>
                <p>
                    The toolkit is versatile but not overwhelming. We provide infinite canvas, sticky notes, standard geometric shapes, and freehand drawing pens. It is simple enough for a child to use but powerful enough for a UX designer to wireframe an app. We also support image dragging-and-dropping, making it easy to create mood boards or annotate screenshots.
                </p>
                <p>
                    Organization features keep the chaos at bay. You can group objects, lock backgrounds, and export specific regions. The ability to save boards to the cloud and share them via a simple link makes it the perfect companion for Zoom or Teams calls. No sign-up required for view-only guests removes the friction of getting stakeholders to look at your ideas.
                </p>
                <p>
                    Privacy is respected. We offer end-to-end encryption for private boards. For enterprise users, self-hosted options are available to ensure that sensitive product roadmaps never leave your VPC. Free Sketch Whiteboard is where great ideas are born visually.
                </p>
            </div>
        ),
        icon: PenTool,
        gradient: "from-orange-500 to-red-500",
        features: ["Next.js", "TailwindCSS", "Real-time", "Canvas API", "WebSockets"],
        benefits: [
            { title: "Zero Friction", description: "Share a link and start drawing. No sign-ups or installs needed." },
            { title: "Real-time Sync", description: "See your teammate's cursor and strokes instantly, bringing remote teams closer." },
            { title: "Export to Anywhere", description: "Save your creations as PNG, SVG, or shareable links." }
        ],
        faq: [
            { question: "Is it free?", answer: "Yes, the core whiteboard features are completely free to use." }
        ],
        image: "/images/sidefolio-tailwindmasterkit.png",
        gallery: [
            "/images/sidefolio-tailwindmasterkit.png",
            "/images/sidefolio-tailwindmasterkit-2.png"
        ],
        tags: ["Design", "Collaboration", "Creative"],
    },
    {
        id: "construction-erp",
        title: "BuildSmart ERP",
        subtitle: "Construction Management",
        description: "End-to-end ERP for construction: Project tracking, inventory, and labor management.",
        longDescription: "BuildSmart ERP is built for the unique demands of the construction industry. It seamlessly integrates project management, inventory control, and billing. Track material consumption against BOQ, manage sub-contractor billings, and ensure your sites are profitable. From ground-breaking to handover, we cover every stage.",
        content: (
            <div className="space-y-6">
                <p>
                    Construction projects are notorious for cost overruns and delays. BuildSmart ERP is the antidote. Tailored specifically for the AEC (Architecture, Engineering, and Construction) industry, it connects your site office to your head office in real-time. It starts with BOQ (Bill of Quantities) management, allowing you to create precise estimates. As the project executes, actual consumption of cement, steel, and sand is tracked against these estimates, alerting you to material wastage or theft immediately.
                </p>
                <p>
                    Sub-contractor management is robust. You can issue work orders with specific rates and terms. The system handles RA (Running Account) bills, automatically deducting advances, retention money, and TDS. This ensures that you never overpay and your financial liabilities are always clear. We also handle the complex compliance requirements of construction labor (BOCW cess, PF, etc.).
                </p>
                <p>
                    Equipment management is integrated. Track the location, fuel consumption, and running hours of your yellow machinery. Schedule maintenance to prevent breakdowns that halt site progress. The system calculates the internal hire charges, giving you the true cost of using your own equipment on a project.
                </p>
                <p>
                    Financials are project-centric. Unlike generic accounting software, BuildSmart gives you a P&L for every single project. You can see which sites are profitable and which are bleeding cash. Cash flow forecasting helps you manage liquidity, ensuring you can pay suppliers and workers on time to keep the work moving.
                </p>
                <p>
                    Mobile apps for site engineers allow them to upload daily progress reports (DPRs) with photos from the site. This gives stakeholders visual proof of progress. Siyaratech BuildSmart ERP builds the digital infrastructure that allows you to build the physical world efficiently.
                </p>
            </div>
        ),
        icon: CheckSquare,
        gradient: "from-yellow-500 to-amber-600",
        features: ["React", "NodeJS", "PostgreSQL", "BOQ Management", "Billing Engine"],
        benefits: [
            { title: "Prevent Material Theft", description: "Strict inventory controls and alerts prevent pilferage at sites." },
            { title: "Accurate Costing", description: "Track every bag of cement and hour of labor against specific project codes." },
            { title: "Sub-contractor Management", description: "Handle complex work orders, advances, and retentions effortlessly." }
        ],
        faq: [
            { question: "Can it handle multiple sites?", answer: "Yes, it supports unlimited sites with consolidated HQ reporting." }
        ],
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
            "https://images.unsplash.com/photo-1535732759880-bbd5c7265e3f?w=800&q=80"
        ],
        tags: ["Construction", "ERP", "Management"],
    },
];
