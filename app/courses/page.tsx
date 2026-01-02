"use client"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import axios from "axios"
import Cookies from "js-cookie"

// Placeholder for missing components
const BrandGlassCard = ({ children, className, variant, intensity }: { children: React.ReactNode; className?: string; variant?: unknown; intensity?: unknown }) => <div className={`bg-gray-800/50 p-4 rounded-xl ${className}`}>{children}</div>
const BlurFade = ({ children, inView, duration, delay }: { children: React.ReactNode; inView?: boolean; duration?: number; delay?: number }) => <div>{children}</div>

interface Course {
    id: string
    title: string
    description: string
    content: string
    instructor: string
    price: number
    thumbnail: string
    originalPrice: number
    discountedPrice: number
    gstPercentage: number
    isPurchased?: boolean
}

// Helper to determine region (placeholder logic)
const getRegion = () => {
    return Cookies.get("region") || "IN"
}

const CourseCard = ({ course, index }: { course: Course; index: number }) => {
    const router = useRouter()
    const variants = ["primary", "secondary", "accent", "success", "info"] as const
    const variant = variants[index % variants.length]

    return (
        <BlurFade inView duration={0.6} delay={index * 0.1}>
            <BrandGlassCard variant={variant} className="h-full overflow-hidden group" intensity="high">
                {/* Image Container with Overlay */}
                <div className="relative h-48 overflow-hidden rounded-t-xl mb-4">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                    <img
                        src={course.thumbnail} // Use direct URL from API
                        alt={course.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge variant="secondary" className="absolute top-3 right-3 z-20 backdrop-blur-md bg-black/30 text-white border-white/20">
                        {course.instructor}
                    </Badge>
                </div>

                {/* Content */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        {course.title}
                    </h3>

                    <p className="text-gray-400 text-sm line-clamp-2 min-h-[40px]">
                        {course.description}
                    </p>

                    {/* Features (Mock features based on description if not in course object) */}
                    <div className="space-y-2">
                        <div className="flex items-center text-xs text-gray-300">
                            <CheckCircle2 className="w-3 h-3 mr-2 text-green-400" />
                            <span>Comprehensive Curriculum</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-300">
                            <CheckCircle2 className="w-3 h-3 mr-2 text-green-400" />
                            <span>Lifetime Access</span>
                        </div>
                    </div>


                    {/* Price Section */}
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-white">₹{(course.discountedPrice ? course.discountedPrice / 100 : course.price / 100).toLocaleString()}</span>
                        {(course.originalPrice > course.discountedPrice) && (
                            <span className="text-sm text-gray-400 line-through">₹{(course.originalPrice / 100).toLocaleString()}</span>
                        )}
                    </div>
                    <Badge variant="outline" className="text-xs border-white/20 text-gray-300 w-full justify-center">
                        + {course.gstPercentage || 18}% GST
                    </Badge>

                    {/* Enroll Button */}
                    <Button
                        className="w-full bg-gradient-to-r from-[#833AB4] to-[#4079ff] hover:from-[#833AB4]/80 hover:to-[#4079ff]/80 text-white border-0"
                        disabled={course.isPurchased}
                        onClick={() => router.push(`/checkout?courseId=${course.id}`)}
                    >
                        {course.isPurchased ? (
                            "Already Enrolled"
                        ) : (
                            <>
                                Enroll Now
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </>
                        )}
                    </Button>
                </div>
            </BrandGlassCard>
        </BlurFade>
    )
}

export default function Courses() {
    const [courses, setCourses] = useState<Course[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const region = getRegion()
                // Use env var or fallback to the known URL
                const baseUrl = process.env.NEXT_PUBLIC_COURSE_PLATFORM_URL || "https://techdivehub.siyaratechin.com"

                // Fetch user purchased courses (Mocking userId for now as we don't have auth context fully ported)
                // In a real scenario, you'd get userId from auth context
                const userId = "guest"

                const response = await axios.get(`${baseUrl}/api/courses`)

                // If we implemented purchased courses logic, we would merge it here.
                // For now, honestly fetching the list.
                setCourses(response.data)
                setLoading(false)
            } catch (err) {
                console.error("Error fetching courses:", err)
                setError("Failed to load courses. Please check your internet connection.")
                setLoading(false)
            }
        }

        fetchCourses()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#833AB4]"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Error</h2>
                    <p>{error}</p>
                    <Button onClick={() => window.location.reload()} className="mt-4">Retry</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen relative overflow-hidden bg-black">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.1),rgba(0,0,0,0))]" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-20" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-20 mt-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] mb-6"
                    >
                        Master Modern Tech
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto"
                    >
                        Elevate your skills with our premium courses designed for the future of technology.
                    </motion.p>
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, index) => (
                        <CourseCard key={course.id} course={course} index={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}
