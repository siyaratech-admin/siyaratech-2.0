"use client"

import type React from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import NextImage from "next/image"
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card"
import { cn } from "@/lib/utils" // Assuming cn utility is available
// import createGlobe from "cobe" // For SkeletonFour


// Define types for case study data
type CaseStudySectionData = {
    title: string
    image: string
    description: string
    list?: string[]
    className?: string // For grid layout
}

type CaseStudyDetails = {
    mainTitle: string
    mainDescription: string
    sections: CaseStudySectionData[]
}

// Static data for multiple case studies
const caseStudiesData: Record<string, CaseStudyDetails> = {
    "influencer-driven-ecommerce-platform": {
        mainTitle: "🛍️ Influencer-Driven E-Commerce Platform",
        mainDescription:
            "🎯 Goal: Transform traditional online shopping into a social-first discovery experience powered by influencers.",
        sections: [
            {
                title: "🏠 Homepage – 'Shop by Influencer'",
                image: "/IS_Homepage.png",
                description:
                    "The homepage highlights influencers as mini-brands with profile images, taglines, and featured products.",
                className: "col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800",
            },
            {
                title: "👤 Influencer Profile Page",
                image: "/IS_InfluencerProfile.png",
                description:
                    "Each influencer has a profile page with bio, curated collections, social links, and credibility metrics like follower count.",
                list: [
                    "A personal bio and banner",
                    "Curated collections or recommended products",
                    "Social media links",
                    "A following count or recent picks to build credibility",
                ],
                className: "border-b col-span-1 lg:col-span-2 dark:border-neutral-800",
            },
            {
                title: "🛒 Personalized Cart Experience",
                image: "/IS_Cart.png",
                description:
                    "Unified cart for all products, but influencer tags stay visible throughout checkout to track source creators.",
                className: "col-span-1 lg:col-span-3 dark:border-neutral-800 border-b lg:border-r dark:border-neutral-800",
            },
            {
                title: "📦 Orders Dashboard",
                image: "/IS_Order.png",
                description: "Order history includes influencer associations per product, reinforcing trust and connection.",
                className: "col-span-1 lg:col-span-3 border-b lg:border-r dark:border-neutral-800",
            },
            {
                title: "🔍 Discovery Tools",
                image: "/IS_Search.png",
                description: "Customers can filter by influencer trends, search by name, or explore top-rated picks.",
                list: [
                    'Filters like "Trending by Influencers", "New Picks This Week"',
                    "Search by influencer name or category",
                ],
                className: "col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800",
            },
            {
                title: "📊 Admin Dashboard Overview",
                image: "/IS_Admin_Dashboard.png",
                description:
                    "Quick insights like total sales, top influencers, best products, and active customers in one view.",
                className: "border-b col-span-1 lg:col-span-2 dark:border-neutral-800",
            },
            {
                title: "🛍️ Product Management",
                image: "/IS_Admin_Products.png",
                description:
                    "Admins can add or edit products, manage pricing, inventory, and link them to collections or influencers.",
                className: "col-span-1 lg:col-span-3 lg:border-r  dark:border-neutral-800",
            },
            {
                title: "👑 Influencer Management",
                image: "/IS_Admin_Influencer.png",
                description:
                    "Tools for onboarding influencers, tracking their performance, and assigning collections/products.",
                className: "col-span-1 lg:col-span-3 border-b lg:border-none",
            },
            {
                title: "🗂️ Collections",
                image: "/IS_Admin_Collection.png",
                description:
                    "Create and manage product collections to group items by themes, influencer picks, or marketing campaigns. Enhance discoverability and curation.",
                className: "col-span-1 lg:col-span-6 border-b dark:border-neutral-800", // Full width for the last one
            },
        ],
    },
    "digital-transformation-for-a-retail-chain": {
        mainTitle: "Digital Transformation for a Retail Chain",
        mainDescription:
            "We helped a leading retail chain undergo a complete digital transformation, resulting in a 30% increase in online sales and improved customer engagement.",
        sections: [
            {
                title: "Overview",
                image: "/DT_Retail_Industry.png",
                description: "Details about the digital transformation project for a retail chain.",
                className: "col-span-1 lg:col-span-6 border-b dark:border-neutral-800",
            },
        ],
    },
    "ai-implementation-in-healthcare": {
        mainTitle: "AI Implementation in Healthcare",
        mainDescription:
            "Our AI solution optimised patient scheduling and reduced wait times by 25% in a major hospital network",
        sections: [
            {
                title: "AI Solution Overview",
                image: "/healthcare.png",
                description: "Details about the AI implementation in healthcare.",
                className: "col-span-1 lg:col-span-6 border-b dark:border-neutral-800",
            },
        ],
    },
}

export default function CaseStudyDetailPage() {
    const router = useRouter()
    const params = useParams()
    const slug = params?.slug as string

    const currentCaseStudy = caseStudiesData[slug || ""]

    const handleBack = () => router.back()

    if (!currentCaseStudy) {
        const title = slug
            ? slug
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
            : ""
        return (
            <div className="max-w-6xl mx-auto px-4 py-12">
                <Button onClick={handleBack} variant="ghost" className="mb-8">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Case Studies
                </Button>
                <h1 className="text-3xl font-bold mb-4">{title}</h1>
                <p>Case study details coming soon or not found.</p>
            </div>
        )
    }


    const { mainTitle, mainDescription, sections } = currentCaseStudy

    return (
        <div className="mt-12 max-w-8xl mx-auto px-4 py-12 z-10 h-fit relative">
            <Button onClick={handleBack} variant="default" className="mb-8">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Case Studies
            </Button>
            <div className="relative mx-auto my-10 flex h-screen w-full max-w-7xl flex-col items-center justify-center overflow-hidden rounded-3xl">
                <h2 className="relative z-20 mx-auto max-w-4xl text-center text-2xl font-bold text-balance text-white md:text-4xl lg:text-6xl">
                    {mainTitle}
                </h2>
                <p className="relative z-20 mx-auto max-w-2xl my-8 text-center text-sm font-semibold  text-neutral-200 md:text-base">
                    {mainDescription}
                </p>

                {/* overlay */}
                <div className="absolute inset-0 z-10 h-full w-full bg-black/80 dark:bg-black/40" />
            </div>

            <div className="relative z-20 py-10 lg:py-40 max-w-7xl mx-auto">
                <div className="px-8">
                    <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
                        Key Features & Sections
                    </h4>
                    <p className="text-sm lg:text-base  max-w-2xl  my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
                        Explore the different facets of this project, from customer-facing storefronts to powerful admin dashboards.
                    </p>
                </div>
                <div className="relative ">
                    <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border rounded-md dark:border-neutral-800">
                        {sections.map((section, index) => (
                            <FeatureCard key={index} className={section.className}>
                                <FeatureTitle>{section.title}</FeatureTitle>
                                <FeatureDescription>{section.description}</FeatureDescription>
                                <div className="h-full w-full">
                                    <CaseStudySectionSkeleton {...section} />
                                </div>
                            </FeatureCard>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

// Reusable FeatureCard components
const FeatureCard = ({ children, className }: { children?: React.ReactNode; className?: string }) => {
    return <div className={cn(`p-4 sm:p-8 relative overflow-hidden`, className)}>{children}</div>
}

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
    return (
        <p className=" max-w-5xl mx-auto text-left font-bold tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug">
            {children}
        </p>
    )
}

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
    return (
        <p
            className={cn(
                "text-sm md:text-base  max-w-4xl text-left mx-auto",
                "text-neutral-500 text-center font-semibold dark:text-neutral-300",
                "text-left max-w-sm mx-0 md:text-sm my-2",
            )}
        >
            {children}
        </p>
    )
}

// Skeleton component to render the actual case study section content
const CaseStudySectionSkeleton = ({ title, image, list }: CaseStudySectionData) => {
    return (
        <div className="relative flex flex-col items-start p-4 gap-4 h-full overflow-hidden">
            <CardContainer className="inter-var w-full">
                <CardBody className="bg-white dark:bg-black border border-gray-200 h-full dark:border-neutral-800 rounded-xl w-full overflow-hidden">
                    <CardItem translateZ="50" className="w-full !h-full relative">
                        <div className="w-fit h-full md:h-fit flex items-center justify-center">
                            <NextImage
                                src={image || "/placeholder.svg"}
                                alt={title}
                                width={800}
                                height={600}
                                className="max-w-full max-h-full object-contain rounded-lg shadow-md"
                            />
                        </div>
                    </CardItem>
                </CardBody>
            </CardContainer>
            {list && (
                <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                    {list.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}
