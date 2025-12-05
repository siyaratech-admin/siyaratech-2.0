"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
// import { PaymentContent } from "../components/PaymentContent"
// import LoadingIndicator from "../components/LoadingIndicator"
import { useTheme } from "@/components/ThemeProvider"

// Placeholders
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PaymentContent = ({ searchParams }: any) => <div>Payment Content Placeholder</div>
const LoadingIndicator = () => <div>Loading...</div>

function PaymentPageContent() {
    const searchParams = useSearchParams()
    console.log("------Redirected to payments -----------------")
    const { setTheme } = useTheme()
    setTheme("light")
    return (
        <div className=" flex w-full min-h-screen text-gray-900 z-10">
            <PaymentContent searchParams={searchParams} />
        </div>
    )
}

export default function Payment() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><LoadingIndicator /></div>}>
            <PaymentPageContent />
        </Suspense>
    )
}
