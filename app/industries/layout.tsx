import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Industries We Serve",
    description: "We provide tailored technology solutions for various industries including healthcare, finance, retail, and manufacturing.",
};

export default function IndustriesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
