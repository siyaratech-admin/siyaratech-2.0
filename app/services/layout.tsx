import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Services",
    description: "Explore our comprehensive technology services including AI consulting, cloud solutions, and software development.",
};

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
