import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Products",
    description: "Discover our innovative software products designed to streamline business operations and enhance productivity.",
};

export default function ProductsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
