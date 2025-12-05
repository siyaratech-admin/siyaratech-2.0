"use client";

import { Navigation } from "@/components/Navigation";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider 
            attribute="class"
            defaultTheme="system" 
            enableSystem
            disableTransitionOnChange={false}
            storageKey="siyaratech-theme"
        >
            <Navigation>
                {children}
            </Navigation>
        </ThemeProvider>
    );
}