import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog",
    description: "Stay updated with the latest trends in technology, AI, and digital transformation on our blog.",
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
