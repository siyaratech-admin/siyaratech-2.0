"use client"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Star, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import Image from "next/image"

// ─── Config ────────────────────────────────────────────────────────────────
const TECHDIVE_URL = "https://techdivehub.siyaratechin.com"

// ─── Types ─────────────────────────────────────────────────────────────────
interface Course {
    id: string
    title?: string
    name?: string
    description: string
    content?: string
    instructor: string
    price: number
    thumbnail?: string
    image?: string
    originalPrice: number
    discountedPrice: number
    gstPercentage: number
    isPurchased?: boolean
    rating?: number
    totalStudents?: number
}

// ─── Static Data ───────────────────────────────────────────────────────────
const coursesData: Course[] = [
    {
        id: "cm4csjnlr00083xfs57z8c6b8",
        title: "React Launchpad",
        description: "Master level React concepts, performance optimization, and architectural patterns for enterprise scale applications.",
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
    },
    {
        id: "cm4csjr1z00173xfs6x9lx20a",
        title: "React Proficiency",
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
    },
    {
        id: "cm4csjr1z00173xfs6x9lx20b",
        title: "Full Stack Development",
        description: "Become a full stack developer with this comprehensive bootcamp.",
        price: 0,
        discountedPrice: 0,
        originalPrice: 0,
        thumbnail: "/courses/Python-Backend-Odyssey.jpg",
        instructor: "Full Stack Lead",
        rating: 4.9,
        totalStudents: 1500,
        isPurchased: false,
        gstPercentage: 0,
        name: "Full Stack Development",
    },
]

// ─── Helper ────────────────────────────────────────────────────────────────
function getCourseImage(course: Course): string {
    if (course.thumbnail && (course.thumbnail.startsWith("/") || course.thumbnail.startsWith("http")))
        return course.thumbnail
    const t = (course.title || course.name || "").toLowerCase()
    if (t.includes("react basics") || t.includes("launchpad")) return "/courses/React Basics.png"
    if (t.includes("react advanced") || t.includes("proficiency")) return "/courses/React Advanced.png"
    if (t.includes("python jumpstart")) return "/courses/Python-Jumpstart.png"
    if (t.includes("python backend") || t.includes("full stack")) return "/courses/Python-Backend-Odyssey.jpg"
    return "/placeholder.png"
}

// ─── 3D Tilt + Glow Hook ───────────────────────────────────────────────────
function useTiltAndGlow(strength = 12) {
    const cardRef = useRef<HTMLDivElement>(null)
    const glowRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = cardRef.current
        const glow = glowRef.current
        if (!el || !glow) return

        const onMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect()
            const x = (e.clientX - rect.left) / rect.width - 0.5
            const y = (e.clientY - rect.top) / rect.height - 0.5

            // 3D tilt
            el.style.transform = `
                perspective(900px)
                rotateX(${-y * strength}deg)
                rotateY(${x * strength}deg)
                scale3d(1.03, 1.03, 1.03)
            `

            // Shine overlay
            const shine = el.querySelector<HTMLElement>(".course-shine")
            if (shine) {
                shine.style.backgroundPosition = `${(x + 0.5) * 100}% ${(y + 0.5) * 100}%`
                shine.style.opacity = "1"
            }

            // Glow follows mouse within card bounds
            const glowX = (x + 0.5) * 100  // 0–100%
            const glowY = (y + 0.5) * 100
            glow.style.background = `radial-gradient(ellipse 80% 80% at ${glowX}% ${glowY}%, rgba(131,58,180,0.55) 0%, rgba(253,29,29,0.35) 40%, rgba(252,176,69,0.15) 70%, transparent 100%)`
            glow.style.opacity = "1"
        }

        const onEnter = () => {
            glow.style.transition = "opacity 0.3s ease"
            glow.style.opacity = "1"
        }

        const onLeave = () => {
            el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)"
            const shine = el.querySelector<HTMLElement>(".course-shine")
            if (shine) shine.style.opacity = "0"
            glow.style.opacity = "0"
        }

        el.addEventListener("mousemove", onMove)
        el.addEventListener("mouseenter", onEnter)
        el.addEventListener("mouseleave", onLeave)
        return () => {
            el.removeEventListener("mousemove", onMove)
            el.removeEventListener("mouseenter", onEnter)
            el.removeEventListener("mouseleave", onLeave)
        }
    }, [strength])

    return { cardRef, glowRef }
}

// ─── Course Card ───────────────────────────────────────────────────────────
function CourseCard({ course, index }: { course: Course; index: number }) {
    const { cardRef, glowRef } = useTiltAndGlow(10)

    const displayImage = getCourseImage(course)
    const currentPrice = typeof course.discountedPrice === "number" ? course.discountedPrice : 0
    const originalPrice = typeof course.originalPrice === "number" ? course.originalPrice : 0
    const displayPrice = currentPrice > 0 ? currentPrice / 100 : (typeof course.price === "number" ? course.price / 100 : 0)
    const displayOriginal = originalPrice > 0 ? originalPrice / 100 : 0
    const isUpcoming = displayPrice === 0 && !course.isPurchased
    const discount = displayOriginal > displayPrice && displayOriginal > 0
        ? Math.round((1 - displayPrice / displayOriginal) * 100)
        : 0

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="h-full"
        >
            {/*
             * ── Glow wrapper ──
             * position: relative so the pseudo-glow div sits BEHIND the card.
             * The glow div is absolutely positioned, blurred, and z-indexed below the card.
             */}
            <div className="relative h-full" style={{ isolation: "isolate" }}>

                {/* ── GRADIENT GLOW (behind the card) ── */}
                <div
                    ref={glowRef}
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        inset: "-18px",          // spreads a bit beyond card edges
                        zIndex: -1,
                        borderRadius: "28px",
                        opacity: 0,
                        filter: "blur(28px)",
                        pointerEvents: "none",
                        transition: "opacity 0.35s ease",
                        background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(131,58,180,0.55) 0%, rgba(253,29,29,0.35) 40%, rgba(252,176,69,0.15) 70%, transparent 100%)",
                    }}
                />

                {/* ── Tilt wrapper — handles 3D transform ── */}
                <div
                    ref={cardRef}
                    className="h-full"
                    style={{
                        transformStyle: "preserve-3d",
                        transition: "transform 0.45s cubic-bezier(0.23,1,0.32,1)",
                        willChange: "transform",
                    }}
                >
                    {/* Card shell */}
                    <div
                        className="relative h-full flex flex-col rounded-2xl overflow-hidden"
                        style={{
                            background: "linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
                            border: "1px solid rgba(131,58,180,0.25)",
                            boxShadow: "0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
                        }}
                    >
                        {/* Shimmer / shine overlay */}
                        <div
                            className="course-shine pointer-events-none absolute inset-0 z-20 rounded-2xl"
                            style={{
                                background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.12) 0%, transparent 60%)",
                                backgroundSize: "200% 200%",
                                opacity: 0,
                                transition: "opacity 0.3s ease, background-position 0.15s ease",
                                mixBlendMode: "overlay",
                            }}
                        />

                        {/* Grid texture */}
                        <div
                            className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]"
                            style={{
                                backgroundImage:
                                    "linear-gradient(rgba(131,58,180,1) 1px, transparent 1px), linear-gradient(90deg, rgba(131,58,180,1) 1px, transparent 1px)",
                                backgroundSize: "28px 28px",
                                animation: "gridScroll 20s linear infinite",
                            }}
                        />

                        {/* Top accent bar */}
                        <div
                            className="absolute top-0 left-0 right-0 h-[2px] z-10"
                            style={{
                                background: "linear-gradient(90deg, #833AB4, #FD1D1D, #FCB045)",
                                backgroundSize: "200% 100%",
                                animation: "gradientShift 3s ease infinite",
                            }}
                        />

                        {/* ── Thumbnail ── */}
                        <div className="relative h-48 overflow-hidden flex-shrink-0">
                            <div
                                className="absolute inset-0 z-10"
                                style={{
                                    background: "linear-gradient(to top, rgba(26,26,46,0.95) 0%, rgba(26,26,46,0.3) 50%, transparent 100%)",
                                }}
                            />
                            <Image
                                src={displayImage}
                                alt={course.title || course.name || "Course"}
                                fill
                                className="object-cover"
                                unoptimized
                                style={{ transform: "scale(1)", transition: "transform 0.6s cubic-bezier(0.23,1,0.32,1)" }}
                                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.08)")}
                                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                            />

                            {/* Instructor badge */}
                            <Badge
                                className="absolute top-3 right-3 z-20 text-xs font-semibold"
                                style={{
                                    background: "rgba(0,0,0,0.55)",
                                    backdropFilter: "blur(8px)",
                                    border: "1px solid rgba(255,255,255,0.15)",
                                    color: "#e2e8f0",
                                }}
                            >
                                {course.instructor}
                            </Badge>

                            {/* Discount badge */}
                            {discount > 0 && (
                                <div
                                    className="absolute top-3 left-3 z-20 text-xs font-bold px-2 py-1 rounded-lg"
                                    style={{
                                        background: "linear-gradient(135deg, #833AB4, #FD1D1D)",
                                        color: "#fff",
                                    }}
                                >
                                    -{discount}%
                                </div>
                            )}

                            {isUpcoming && (
                                <div
                                    className="absolute top-3 left-3 z-20 text-xs font-bold px-2 py-1 rounded-lg"
                                    style={{
                                        background: "linear-gradient(135deg, #0f3460, #533483)",
                                        color: "#93c5fd",
                                        border: "1px solid rgba(147,197,253,0.3)",
                                    }}
                                >
                                    Coming Soon
                                </div>
                            )}
                        </div>

                        {/* ── Perforation line ── */}
                        <div className="relative flex items-center px-0 -mt-px z-10">
                            <div
                                className="w-4 h-4 rounded-full flex-shrink-0 -ml-2"
                                style={{ background: "#090c14", border: "1px solid rgba(131,58,180,0.2)" }}
                            />
                            <div
                                className="flex-1 h-px"
                                style={{ borderTop: "1.5px dashed rgba(131,58,180,0.3)" }}
                            />
                            <div
                                className="w-4 h-4 rounded-full flex-shrink-0 -mr-2"
                                style={{ background: "#090c14", border: "1px solid rgba(131,58,180,0.2)" }}
                            />
                        </div>

                        {/* ── Body ── */}
                        <div className="relative z-10 flex flex-col flex-1 p-5 gap-4">
                            {/* Title */}
                            <h3
                                className="text-lg font-extrabold leading-snug"
                                style={{
                                    background: "linear-gradient(135deg, #fff 0%, #a5b4fc 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                {course.title || course.name || "Untitled Course"}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed flex-1">
                                {course.description}
                            </p>

                            {/* Meta row */}
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                                {course.rating && (
                                    <span className="flex items-center gap-1">
                                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                        <span className="text-slate-300 font-semibold">{course.rating}</span>
                                    </span>
                                )}
                                {course.totalStudents && (
                                    <span className="flex items-center gap-1">
                                        <Users className="w-3 h-3 text-slate-500" />
                                        <span>{course.totalStudents.toLocaleString()} students</span>
                                    </span>
                                )}
                            </div>

                            {/* Features */}
                            <div className="space-y-1.5">
                                {["Comprehensive Curriculum", "Lifetime Access"].map((f) => (
                                    <div key={f} className="flex items-center gap-2 text-xs text-slate-400">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                                        {f}
                                    </div>
                                ))}
                            </div>

                            {/* ── Price block ── */}
                            <div
                                className="rounded-xl p-3 flex items-center justify-between"
                                style={{
                                    background: "rgba(131,58,180,0.08)",
                                    border: "1px solid rgba(131,58,180,0.2)",
                                }}
                            >
                                {!isUpcoming ? (
                                    <>
                                        <div>
                                            <div
                                                className="text-2xl font-black tracking-tight"
                                                style={{
                                                    color: "#f8fafc",
                                                    textShadow: "0 0 20px rgba(131,58,180,0.5)",
                                                }}
                                            >
                                                ₹{displayPrice.toLocaleString()}
                                            </div>
                                            <div className="text-xs text-slate-500 mt-0.5">+ {course.gstPercentage || 18}% GST</div>
                                        </div>
                                        {displayOriginal > displayPrice && (
                                            <div className="text-right">
                                                <div className="text-sm text-slate-500 line-through">
                                                    ₹{displayOriginal.toLocaleString()}
                                                </div>
                                                {discount > 0 && (
                                                    <div className="text-xs font-bold" style={{ color: "#a78bfa" }}>
                                                        Save ₹{(displayOriginal - displayPrice).toLocaleString()}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div
                                        className="text-xl font-black tracking-wider"
                                        style={{ color: "#60a5fa" }}
                                    >
                                        Upcoming
                                    </div>
                                )}
                            </div>

                            {/* Enroll Button */}
                            <button
                                className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white relative overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={course.isPurchased || isUpcoming}
                                onClick={() => { if (!course.isPurchased && !isUpcoming) window.location.href = TECHDIVE_URL }}
                                style={{
                                    background: course.isPurchased
                                        ? "rgba(100,100,120,0.4)"
                                        : "linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #FCB045 100%)",
                                    backgroundSize: "200% 200%",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    boxShadow: course.isPurchased ? "none" : "0 4px 20px rgba(131,58,180,0.4)",
                                    transition: "background-position 0.4s ease, box-shadow 0.3s ease, transform 0.2s ease",
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLButtonElement).style.backgroundPosition = "right center"
                                        ; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 30px rgba(253,29,29,0.45)"
                                        ; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLButtonElement).style.backgroundPosition = "left center"
                                        ; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(131,58,180,0.4)"
                                        ; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"
                                }}
                            >
                                {course.isPurchased ? (
                                    "Already Enrolled"
                                ) : isUpcoming ? (
                                    "Notify Me"
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        Enroll Now
                                        <ArrowRight className="w-4 h-4" />
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function Courses() {
    const [courses, setCourses] = useState<Course[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                await new Promise(r => setTimeout(r, 500))
                setCourses(coursesData)
                setLoading(false)
            } catch (err) {
                console.error(err)
                setError("Failed to load courses.")
                setLoading(false)
            }
        }
        fetchCourses()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-[#090c14] flex items-center justify-center">
                <div
                    className="w-16 h-16 rounded-full"
                    style={{
                        border: "2px solid transparent",
                        borderTopColor: "#833AB4",
                        borderRightColor: "#FD1D1D",
                        animation: "spin 0.8s linear infinite",
                    }}
                />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#090c14] flex items-center justify-center text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
                    <p className="text-slate-400">{error}</p>
                    <Button onClick={() => window.location.reload()} className="mt-6">
                        Retry
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="relative min-h-screen overflow-hidden" style={{ background: "#090c14" }}>

            {/* ── Global keyframes ── */}
            <style>{`
                @keyframes gridScroll {
                    0%   { background-position: 0 0; }
                    100% { background-position: 0 28px; }
                }
                @keyframes gradientShift {
                    0%, 100% { background-position: 0% 50%; }
                    50%       { background-position: 100% 50%; }
                }
                @keyframes floatOrb {
                    0%, 100% { transform: translateY(0px) scale(1); }
                    50%       { transform: translateY(-30px) scale(1.05); }
                }
                @keyframes pulse-ring {
                    0%   { transform: scale(0.95); opacity: 0.7; }
                    100% { transform: scale(1.15); opacity: 0; }
                }
            `}</style>

            {/* ── Background atmosphere ── */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div
                    style={{
                        position: "absolute", inset: 0,
                        background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(131,58,180,0.18) 0%, transparent 70%)",
                    }}
                />
                <div
                    style={{
                        position: "absolute", top: "15%", left: "8%",
                        width: 320, height: 320, borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(131,58,180,0.12) 0%, transparent 70%)",
                        animation: "floatOrb 8s ease-in-out infinite",
                        filter: "blur(40px)",
                    }}
                />
                <div
                    style={{
                        position: "absolute", bottom: "20%", right: "6%",
                        width: 260, height: 260, borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(253,29,29,0.09) 0%, transparent 70%)",
                        animation: "floatOrb 11s ease-in-out infinite reverse",
                        filter: "blur(50px)",
                    }}
                />
                <div
                    style={{
                        position: "absolute", top: "55%", left: "55%",
                        width: 200, height: 200, borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(252,176,69,0.07) 0%, transparent 70%)",
                        animation: "floatOrb 14s ease-in-out infinite",
                        filter: "blur(40px)",
                    }}
                />
                <div
                    style={{
                        position: "absolute", inset: 0, opacity: 0.04,
                        backgroundImage:
                            "linear-gradient(rgba(131,58,180,1) 1px, transparent 1px), linear-gradient(90deg, rgba(131,58,180,1) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />
            </div>

            {/* ── Content ── */}
            <div className="relative z-10 container mx-auto px-4 py-24 mt-10">

                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-widest"
                        style={{
                            background: "rgba(131,58,180,0.15)",
                            border: "1px solid rgba(131,58,180,0.4)",
                            color: "#c084fc",
                        }}
                    >
                        <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                                background: "#833AB4",
                                boxShadow: "0 0 6px #833AB4",
                                animation: "pulse-ring 1.5s ease-out infinite",
                                display: "inline-block",
                            }}
                        />
                        Premium Courses
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black leading-none mb-6"
                        style={{
                            background: "linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #FCB045 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            backgroundSize: "200% 200%",
                            animation: "gradientShift 4s ease infinite",
                        }}
                    >
                        Master Modern Tech
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                    >
                        Elevate your skills with our premium courses designed for the future of technology.
                    </motion.p>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mx-auto mt-8 h-px max-w-xs"
                        style={{
                            background: "linear-gradient(90deg, transparent, rgba(131,58,180,0.6), transparent)",
                        }}
                    />
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, index) => (
                        <CourseCard key={course.id} course={course} index={index} />
                    ))}
                </div>

                {/* Footer CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-20"
                >
                    <p className="text-slate-500 mb-4">More courses launching soon.</p>
                    <a
                        href={TECHDIVE_URL}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
                        style={{
                            background: "rgba(131,58,180,0.12)",
                            border: "1px solid rgba(131,58,180,0.35)",
                            color: "#c084fc",
                        }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(131,58,180,0.22)"
                                ; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(131,58,180,0.6)"
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(131,58,180,0.12)"
                                ; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(131,58,180,0.35)"
                        }}
                    >
                        Visit TechDive Hub
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </motion.div>
            </div>
        </div>
    )
}