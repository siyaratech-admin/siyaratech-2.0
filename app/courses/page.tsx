"use client"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
// import Cookies from "js-cookie"
import Image from "next/image"

// Placeholder for missing components
const BrandGlassCard = ({ children, className }: { children: React.ReactNode; className?: string; variant?: unknown; intensity?: unknown }) => <div className={`bg-gray-800/50 p-4 rounded-xl ${className}`}>{children}</div>
const BlurFade = ({ children }: { children: React.ReactNode; inView?: boolean; duration?: number; delay?: number }) => <div>{children}</div>

interface Course {
    id: string
    title?: string // Made optional as API returns name
    name?: string // Added name
    description: string
    content?: string // Made optional
    instructor: string
    price: number
    thumbnail?: string // Made optional as API returns image
    image?: string // Added image
    originalPrice: number
    discountedPrice: number
    gstPercentage: number
    isPurchased?: boolean
    rating?: number // Added
    totalStudents?: number // Added
}

// Helper to determine region (placeholder logic)
// Helper to determine region (placeholder logic)
// const getRegion = () => {
//     return Cookies.get("region") || "IN"
// }

const CourseCard = ({ course, index }: { course: Course; index: number }) => {
    const router = useRouter()
    const variants = ["primary", "secondary", "accent", "success", "info"] as const
    const variant = variants[index % variants.length]

    const getCourseImage = (course: Course) => {
        // First try local mapped thumbnail
        if (course.thumbnail && (course.thumbnail.startsWith('/') || course.thumbnail.startsWith('http'))) return course.thumbnail;

        // Fallback or mapping logic
        const titleToCheck = (course.title || course.name || "").toLowerCase();

        // Direct mappings based on local files
        if (titleToCheck.includes("react basics") || titleToCheck.includes("launchpad")) return "/courses/React Basics.png";
        if (titleToCheck.includes("react advanced") || titleToCheck.includes("proficiency")) return "/courses/React Advanced.png";
        if (titleToCheck.includes("python jumpstart")) return "/courses/Python-Jumpstart.png";
        if (titleToCheck.includes("python backend")) return "/courses/Python-Backend-Odyssey.jpg";
        if (titleToCheck.includes("full stack")) return "/courses/Python-Backend-Odyssey.jpg"; // Placeholder

        return "/placeholder.png";
    }

    const displayImage = getCourseImage(course);
    // Safe price calculation
    const currentPrice = typeof course.discountedPrice === 'number' ? course.discountedPrice : 0;
    const originalPrice = typeof course.originalPrice === 'number' ? course.originalPrice : 0;
    const displayPrice = currentPrice > 0 ? currentPrice / 100 : (typeof course.price === 'number' ? course.price / 100 : 0);
    const displayOriginalPrice = originalPrice > 0 ? originalPrice / 100 : 0;
    const isUpcoming = displayPrice === 0 && !course.isPurchased; // Treat 0 price as Upcoming if not purchased

    return (
        <BlurFade inView duration={0.6} delay={index * 0.1}>
            <BrandGlassCard variant={variant} className="h-full overflow-hidden group" intensity="high">
                {/* Image Container with Overlay */}
                <div className="relative h-48 overflow-hidden rounded-t-xl mb-4 bg-gray-900">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                    <Image
                        src={displayImage} // Use local image if available
                        alt={course.title || course.name || "Course Image"}
                        fill
                        className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                        unoptimized
                    />
                    <Badge variant="secondary" className="absolute top-3 right-3 z-20 backdrop-blur-md bg-black/30 text-white border-white/20">
                        {course.instructor || "Instructor"}
                    </Badge>
                </div>

                {/* Content */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white mb-2">
                        {course.title || course.name || "Untitled Course"}
                    </h3>

                    <p className="text-gray-400 text-sm line-clamp-2 min-h-[40px]">
                        {course.description || "No description available."}
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
                    {!isUpcoming ? (
                        <>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-2xl font-bold text-white">
                                    ₹{displayPrice.toLocaleString()}
                                </span>
                                {displayOriginalPrice > displayPrice && (
                                    <span className="text-sm text-gray-400 line-through">₹{displayOriginalPrice.toLocaleString()}</span>
                                )}
                            </div>
                            <Badge variant="outline" className="text-xs border-white/20 text-gray-300 w-full justify-center">
                                + {course.gstPercentage || 18}% GST
                            </Badge>
                        </>
                    ) : (
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-2xl font-bold text-blue-400">
                                Upcoming
                            </span>
                        </div>
                    )}


                    {/* Enroll Button */}
                    <Button
                        className="w-full bg-gradient-to-r from-[#833AB4] to-[#4079ff] hover:from-[#833AB4]/80 hover:to-[#4079ff]/80 text-white border-0"
                        disabled={course.isPurchased || isUpcoming}
                        onClick={() => router.push(`/checkout?courseId=${course.id}`)}
                    >
                        {course.isPurchased ? (
                            "Already Enrolled"
                        ) : isUpcoming ? (
                            "Notify Me"
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

const coursesData: Course[] = [
    {
        id: "cm4csjnlr00083xfs57z8c6b8",
        title: "React Launchpad", // name -> title
        description: "Master level React concepts, performance optimization, and architectural patterns for enterprise scale applications.", // kept generic description as source had null
        price: 999800,
        discountedPrice: 499900,
        originalPrice: 999800,
        thumbnail: "/courses/React Basics.png",
        instructor: "Senior React Dev",
        rating: 4.8,
        totalStudents: 1200,
        isPurchased: false,
        gstPercentage: 18,
        name: "React Launchpad",
        image: "/React Basics.png"
    },
    {
        id: "cm4csjr1z00173xfs6x9lx20a",
        title: "React Proficiency", // name -> title
        description: "Build type-safe, scalable web applications. Learn best practices for combining React and TypeScript.",
        price: 1599800,
        discountedPrice: 799900,
        originalPrice: 1599800,
        thumbnail: "/courses/React Advanced.png",
        instructor: "Tech Lead",
        rating: 4.9,
        totalStudents: 850,
        isPurchased: false,
        gstPercentage: 18,
        name: "React Proficiency",
        image: "/React Advanced.png"
    },
    {
        id: "cm6ut1vp6001llaa9z477ky6i",
        title: "The Python Backend Odyssey",
        description: "Build scalable backends with Python. From zero to hero in backend engineering.",
        price: 1599800,
        discountedPrice: 799900,
        originalPrice: 1599800,
        thumbnail: "/courses/Python-Backend-Odyssey.jpg",
        instructor: "Backend Expert",
        rating: 4.8,
        totalStudents: 500,
        isPurchased: false,
        gstPercentage: 18,
        name: "The Python Backend Odyssey",
        image: "/Python-Backend-Odyssey.jpg"
    },
    {
        id: "cm6ut16e00008laa9e0ai5pxc",
        title: "The Python Jumpstart",
        description: "Start your Python journey here. The best way to learn Python from scratch.",
        price: 999800,
        discountedPrice: 499900,
        originalPrice: 999800,
        thumbnail: "/courses/Python-Jumpstart.png",
        instructor: "Python Pro",
        rating: 4.7,
        totalStudents: 2100,
        isPurchased: false,
        gstPercentage: 18,
        name: "The Python Jumpstart",
        image: "/Python-Jumpstart.png"
    },
    {
        id: "cm4csjr1z00173xfs6x9lx20b",
        title: "Full Stack Development",
        description: "Become a full stack developer with this comprehensive bootcamp.",
        price: 0,
        discountedPrice: 0,
        originalPrice: 0,
        thumbnail: "/courses/Python-Backend-Odyssey.jpg", // Re-using an image or placeholder? Let's use Python Backend one as filler or placeholder.
        instructor: "Full Stack Lead",
        rating: 4.9,
        totalStudents: 1500,
        isPurchased: false,
        gstPercentage: 0,
        name: "Full Stack Development",
        image: "/Python-Backend-Odyssey.jpg"
    }
];

export default function Courses() {
    const [courses, setCourses] = useState<Course[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // Simulate API call with local data
                await new Promise(resolve => setTimeout(resolve, 500));
                setCourses(coursesData);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching courses:", err)
                setError("Failed to load courses.")
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
        <div className="relative min-h-screen overflow-hidden bg-black">

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
