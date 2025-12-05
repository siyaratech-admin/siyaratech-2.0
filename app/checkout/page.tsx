"use client"

import type React from "react"
import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
// import { NeuralGrid } from "@/components/neural-grid"
// import BrandGlassCard from "@/components/brand-glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import BlurFade from "@/components/ui/blur-fade"
import { CreditCard, User, Mail, Phone, Building } from "lucide-react"
import { motion } from "framer-motion"

// Placeholder for missing components
const BrandGlassCard = ({ children, className, variant }: any) => <div className={`bg-gray-800/50 p-4 rounded-xl ${className}`}>{children}</div>
const BlurFade = ({ children, inView, duration, delay }: any) => <div>{children}</div>

interface Course {
  id: string
  title: string
  description: string
  content: string
  instructor: string
  price: number
  thumbnail: string
}

const courses: Course[] = [
  {
    id: "1",
    title: "React Fundamentals",
    description: "Learn the basics of React and start building your first component.",
    content: "In this course, you'll learn the core concepts of React, including components, props, and state.",
    instructor: "Jane Doe",
    price: 4999,
    thumbnail: "/react.png",
  },
  {
    id: "2",
    title: "Advanced React Patterns",
    description: "Dive deep into advanced React patterns and optimize your applications.",
    content: "This course covers advanced React patterns such as render props, higher-order components, and hooks.",
    instructor: "John Smith",
    price: 7999,
    thumbnail: "/reactAdvanced.jpg",
  },
  {
    id: "3",
    title: "React with TypeScript",
    description: "Harness the power of TypeScript in your React applications.",
    content: "Combine the power of React with the safety and tooling of TypeScript.",
    instructor: "Alice Johnson",
    price: 6999,
    thumbnail: "/reactTS.png",
  },
]

export default function Checkout() {
  // const { courseId } = useParams<{ courseId: string }>() // Next.js params are different, usually passed as props to page, but for client component useParams works if inside provider
  // For simplicity in this port, we'll assume courseId might be passed via query or we default to something for now as logic might need adjustment for Next.js routing
  // Actually, useParams in Next.js returns an object.
  const params = useParams()
  const courseId = params?.courseId as string
  
  const router = useRouter()

  const course = courses.find((c) => c.id === courseId) || courses[0] // Default to first course if not found for demo
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
  })
  const [loading, setLoading] = useState(false)

  if (!course) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        
        <div className="bg-gradient-to-br from-gray-900 via-[#FD1D1D]/10 to-black" />
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <BrandGlassCard variant="primary" className="p-8 text-center max-w-md">
            <h1 className="text-2xl font-bold text-white mb-4">Course Not Found</h1>
            <p className="text-gray-300 mb-6">The course you're looking for doesn't exist.</p>
            <Button
              onClick={() => router.push("/courses")}
              className="bg-gradient-to-r from-[#833AB4] to-[#4079ff] text-white"
            >
              Back to Courses
            </Button>
          </BrandGlassCard>
        </div>
      </div>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setLoading(false)
    console.log("Processing payment for:", course.title, formData)
    router.push("/courses")
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      
      <div className="bg-gradient-to-br from-gray-900 via-[#FD1D1D]/10 to-black animate-gradient-xy" />

      <div className="relative z-10 px-4 w-full min-h-screen mt-20">
        <div className="flex flex-col items-center w-full">
          <BlurFade inView duration={0.6}>
            <Button
              onClick={() => router.back()}
              className="mb-8 self-start w-[60px] bg-transparent hover:bg-white/10"
              variant="ghost"
            >
              <motion.div
                animate={{ rotate: 225, scale: 0.3 }}
                transition={{ type: "spring", stiffness: 160, damping: 20 }}
                style={{ transformOrigin: "center" }}
                className="cursor-pointer"
              >
                <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="100" r="94" fill="url(#paint0_linear_1_23456)" fillOpacity="0.95" />
                  <motion.path
                    d={"M130 95 L130 65 L100 65"}
                    stroke="white"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width={48}
                    height={48}
                    animate={{
                      d: "M130 95 L130 65 L100 65",
                      y: [0, -6, 0],
                      x: [0, 6, 0],
                    }}
                    transition={{
                      d: { type: "spring", stiffness: 100, damping: 10 },
                      y: {
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 1,
                        ease: "easeInOut",
                        delay: 0,
                      },
                    }}
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1_23456"
                      x1="0"
                      y1="100"
                      x2="200"
                      y2="100"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#833AB4" />
                      <stop offset="0.5" stopColor="#FD1D1D" />
                      <stop offset="1" stopColor="#FCB045" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            </Button>
          </BlurFade>

          <div className="w-full max-w-md lg:max-w-4xl p-4 mx-auto">
            <BlurFade inView duration={0.6} delay={0.1}>
              <header className="mb-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
                    <CreditCard className="w-8 h-8" style={{ color: "#FD1D1D" }} />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FD1D1D] via-[#FCB045] to-[#833AB4] bg-clip-text text-transparent">
                    Checkout
                  </h1>
                </div>
                <div className="w-20 h-1 bg-gradient-to-r from-[#FD1D1D] to-[#FCB045] mx-auto rounded-full" />
              </header>
            </BlurFade>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Course Details */}
              <BlurFade inView duration={0.6} delay={0.2}>
                <BrandGlassCard variant="secondary" className="p-6" intensity="high">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{course.title}</h2>
                  <p className="text-gray-300 text-sm mb-4">{course.description}</p>
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                    <User className="w-4 h-4" />
                    <span>Instructor: {course.instructor}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-white">₹{course.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-400">+ 18% GST</span>
                  </div>
                </BrandGlassCard>
              </BlurFade>

              {/* Checkout Form */}
              <BlurFade inView duration={0.6} delay={0.3}>
                <BrandGlassCard variant="primary" className="p-6" intensity="high">
                  <div className="flex items-center gap-3 mb-6">
                    <User className="w-6 h-6 text-[#833AB4]" />
                    <h3 className="text-xl font-bold text-white">Student Information</h3>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-300 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-[#833AB4]"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-300 flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-[#833AB4]"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-300 flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Phone *
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-[#833AB4]"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-gray-300 flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          Company (Optional)
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-[#833AB4]"
                          placeholder="Your company name"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/20">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-300">Course Price:</span>
                        <span className="text-white">₹{course.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-300">GST (18%):</span>
                        <span className="text-white">₹{Math.round(course.price * 0.18).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center mb-6 text-lg font-bold">
                        <span className="text-white">Total Amount:</span>
                        <span className="text-white">₹{Math.round(course.price * 1.18).toLocaleString()}</span>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-[#833AB4] to-[#FD1D1D] hover:from-[#833AB4]/80 hover:to-[#FD1D1D]/80 text-white border-0 py-3"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4 mr-2" />
                          Enroll Now - ₹{Math.round(course.price * 1.18).toLocaleString()}
                        </>
                      )}
                    </Button>
                  </form>
                </BrandGlassCard>
              </BlurFade>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
