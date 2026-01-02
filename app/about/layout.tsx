import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us",
    description: "Learn about SIYARATECH INNOVATIONS, our mission, values, and the team driving digital transformation.",
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
