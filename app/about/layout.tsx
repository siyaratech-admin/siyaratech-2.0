import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us",
    description: "Learn about Siyaratech Innovations, our mission, values, and the team driving digital transformation.",
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
