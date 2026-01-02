"use client";
import React from "react";
import PageHeader from "@/components/PageHeader";
import dynamic from "next/dynamic";
const ProductsSection = dynamic(() => import("@/components/ProductsSection"), {
    loading: () => <div className="min-h-[60vh] flex items-center justify-center">Loading Products...</div>,
    ssr: false // Since it has heavy animations that are client-side only
});

export default function ProductsPage() {
    return (
        <div className="">
            <PageHeader
                title="Our Products"
                subtitle="AI-Driven Enterprise Solutions"
                description="Experience the next generation of enterprise software. Our products don't just assist—they anticipate, adapt, and act."
                badge="Innovation"
            />

            {/* We can reuse the ProductsSection component, but we might want to adjust it slightly if it has a specific ID or padding that conflicts. 
          Looking at the file, it has py-24 and id="products". This is fine. */}
            <ProductsSection />
        </div>
    );
}
