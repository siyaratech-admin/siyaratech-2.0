"use client"

import { useState, useEffect } from "react"
// import BrandGlassCard from "@/components/brand-glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
// import BlurFade from "@/components/ui/blur-fade"
import { BookOpen, Clock, Users, Star, Play, ArrowRight } from "lucide-react"
import Image from "next/image"
import axios from "axios"
import Cookies from "js-cookie"

// Placeholder for missing components
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BrandGlassCard = ({ children, className }: any) => <div className={`bg-gray-800/50 p-4 rounded-xl ${className}`}>{children}</div>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BlurFade = ({ children }: any) => <div>{children}</div>

interface Course {
    id: string
    name: string
    description: string | null
    image: string
    originalPrice: number
    discountedPrice: number
    discountPercentage: number
    gstPercentage: number
    currency: string
    isPurchased: boolean
}

// Fallback courses for demo
const fallbackCourses: Course[] = [
    {
        id: "1",
        name: "React Fundamentals",
        description: "Learn the basics of React and start building your first component with modern best practices.",
        image: "/react.png",
        originalPrice: 4999,
        discountedPrice: 2999,
        discountPercentage: 40,
        gstPercentage: 18,
        currency: "INR",
        isPurchased: false,
    },
    {
        id: "2",
        name: "Advanced React Patterns",
        description: "Dive deep into advanced React patterns and optimize your applications for production.",
        image: "/reactAdvanced.jpg",
        originalPrice: 7999,
        discountedPrice: 4999,
        discountPercentage: 38,
        gstPercentage: 18,
        currency: "INR",
        isPurchased: false,
    },
    {
        id: "3",
        name: "React with TypeScript",
        description: "Harness the power of TypeScript in your React applications for better development experience.",
        image: "/reactTS.png",
        originalPrice: 6999,
        discountedPrice: 3999,
        discountPercentage: 43,
        gstPercentage: 18,
        currency: "INR",
        isPurchased: false,
    },
]

const CourseCard = ({ course, index }: { course: Course; index: number }) => {
    const variants = ["primary", "secondary", "accent", "success", "info"] as const
    const variant = variants[index % variants.length]

    return (
        <BlurFade inView duration={0.6} delay={index * 0.1}>
            <BrandGlassCard variant={variant} className="h-full overflow-hidden group" intensity="high">
                {/* Image */}
                <div className="relative h-48 overflow-hidden rounded-t-2xl">
                    <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Discount Badge */}
                    {course.discountPercentage > 0 && (
                        <div className="absolute top-4 left-4">
                            <Badge className="bg-red-500/80 backdrop-blur-sm text-white border-red-400/50">
                                {course.discountPercentage}% OFF
                            </Badge>
                        </div>
                    )}

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                            <Play className="w-8 h-8 text-white" />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-opacity-80 transition-colors duration-200 line-clamp-2">
                        {course.name}
                    </h3>

                    <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                        {course.description || "Comprehensive course designed to enhance your skills and knowledge."}
                    </p>

                    {/* Course Stats */}
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                        <div className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            <span>12 Lessons</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>8 Hours</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>2.5k Students</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400" />
                            <span>4.8</span>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-white">₹{course.discountedPrice.toLocaleString()}</span>
                            {course.originalPrice > course.discountedPrice && (
                                <span className="text-sm text-gray-400 line-through">₹{course.originalPrice.toLocaleString()}</span>
                            )}
                        </div>
                        <Badge variant="outline" className="text-xs border-white/20 text-gray-300">
                            + {course.gstPercentage}% GST
                        </Badge>
                    </div>

                    {/* Enroll Button */}
                    <Button
                        className="w-full bg-gradient-to-r from-[#833AB4] to-[#4079ff] hover:from-[#833AB4]/80 hover:to-[#4079ff]/80 text-white border-0"
                        disabled={course.isPurchased}
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

export default function CoursesPage() {
    const [courses, setCourses] = useState<Course[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const region = Cookies.get("user-region") || "IN"
                Cookies.set("user-region", region, { expires: 365 })

                if (process.env.NEXT_PUBLIC_COURSE_PLATFORM_URL) {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_COURSE_PLATFORM_URL}/api/courses`, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                    setCourses(response.data)
                } else {
                    // Use fallback courses if no API URL is configured
                    setCourses(fallbackCourses)
                }
            } catch (error) {
                console.error("Error fetching courses:", error)
                // Use fallback courses on error
                setCourses(fallbackCourses)
                setError("Using demo courses. API connection failed.")
            } finally {
                setLoading(false)
            }
        }

        fetchCourses()
    }, [])

    return (
        <div className="min-h-screen relative overflow-hidden">

            <div className="bg-gradient-to-br from-gray-900 via-[#FCB045]/10 to-black animate-gradient-xy" />

            <div className="relative z-10 px-4 w-full max-w-7xl mx-auto py-12 mt-20">
                <header className="mb-12 text-center">
                    <BlurFade inView duration={0.6}>
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
                                <BookOpen className="w-8 h-8" style={{ color: "#FCB045" }} />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FCB045] via-[#FD1D1D] to-[#833AB4] bg-clip-text text-transparent">
                                Available Courses
                            </h1>
                        </div>
                        <div className="w-20 h-1 bg-gradient-to-r from-[#FCB045] to-[#FD1D1D] mx-auto rounded-full" />
                        <p className="mt-4 text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
                            Master new skills with our comprehensive courses designed by industry experts
                        </p>
                    </BlurFade>
                </header>

                {/* Stats Section */}
                <BlurFade inView duration={0.6} delay={0.1}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
                        {[
                            { label: "Total Courses", value: "50+", icon: <BookOpen className="w-5 h-5" /> },
                            { label: "Students Enrolled", value: "10K+", icon: <Users className="w-5 h-5" /> },
                            { label: "Expert Instructors", value: "25+", icon: <Star className="w-5 h-5" /> },
                            { label: "Hours of Content", value: "500+", icon: <Clock className="w-5 h-5" /> },
                        ].map((stat, index) => (
                            <BrandGlassCard key={index} variant="info" className="p-4 md:p-6 text-center" intensity="high">
                                <div className="flex justify-center mb-2 md:mb-3 text-[#FCB045]">{stat.icon}</div>
                                <div className="text-xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-xs md:text-sm text-gray-300">{stat.label}</div>
                            </BrandGlassCard>
                        ))}
                    </div>
                </BlurFade>

                {error && (
                    <BlurFade inView duration={0.6} delay={0.2}>
                        <div className="mb-8 p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-center">
                            <p className="text-yellow-300 text-sm">{error}</p>
                        </div>
                    </BlurFade>
                )}

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <BrandGlassCard variant="primary" className="p-8">
                            <div className="flex items-center gap-3">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FCB045]"></div>
                                <span className="text-white font-medium">Loading courses...</span>
                            </div>
                        </BrandGlassCard>
                    </div>
                ) : courses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {courses.map((course, index) => (
                            <CourseCard key={course.id} course={course} index={index} />
                        ))}
                    </div>
                ) : (
                    <BlurFade inView duration={0.6}>
                        <BrandGlassCard variant="primary" className="p-8 text-center">
                            <h2 className="text-xl font-bold text-white mb-4">No Courses Available</h2>
                            <p className="text-gray-300 mb-6">Check back soon for new courses!</p>
                            <Button className="bg-gradient-to-r from-[#FCB045] to-[#FD1D1D] text-white">Notify Me</Button>
                        </BrandGlassCard>
                    </BlurFade>
                )}
            </div>
        </div>
    )
}
