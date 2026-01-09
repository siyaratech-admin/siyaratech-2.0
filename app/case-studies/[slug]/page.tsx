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



// Import the shared data
// import { CaseStudyDetails } from "@/components/CaseStudyDetails";
import { caseStudies } from "@/lib/caseStudies"

export default function CaseStudyDetailPage() {
    const router = useRouter()
    const params = useParams()
    const slug = params?.slug as string

    // Find the case study from the shared data
    const currentCaseStudy = caseStudies.find(c => c.slug === slug)

    const handleBack = () => router.back()

    if (!currentCaseStudy) {
        const title = slug
            ? slug
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
            : ""
        return (
            <div className="max-w-6xl mx-auto px-4 py-12 pt-24">
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
        <div className="pt-24 pb-12 min-h-screen bg-background relative z-10">
            {/* Back Button Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <Button
                    onClick={handleBack}
                    variant="ghost"
                    className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors pl-0 hover:bg-transparent"
                >
                    <div className="p-2 rounded-full bg-secondary/50 group-hover:bg-primary/10 transition-colors">
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    </div>
                    <span className="font-medium text-lg">Back to Case Studies</span>
                </Button>
            </div>
            <div className="relative mx-auto my-10 flex h-screen w-full max-w-7xl flex-col items-center justify-center overflow-hidden rounded-3xl">
                <h2 className="relative z-20 mx-auto max-w-4xl text-center text-2xl font-bold text-balance text-white md:text-4xl lg:text-6xl">
                    {mainTitle || currentCaseStudy.title}
                </h2>
                <p className="relative z-20 mx-auto max-w-2xl my-8 text-center text-sm font-semibold  text-neutral-200 md:text-base">
                    {mainDescription || currentCaseStudy.challenge}
                </p>

                {/* overlay */}
                <div className="absolute inset-0 z-10 h-full w-full bg-black/80 dark:bg-black/40" />
                <NextImage
                    src={currentCaseStudy.image}
                    alt={currentCaseStudy.title}
                    fill
                    className="object-cover absolute inset-0 z-0 opacity-50 blur-sm"
                />
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
                        {sections && sections.map((section, index) => (
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
