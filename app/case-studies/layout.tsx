import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Case Studies",
    description: "Read our success stories and see how we've helped businesses achieve their digital transformation goals.",
};

export default function CaseStudiesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
