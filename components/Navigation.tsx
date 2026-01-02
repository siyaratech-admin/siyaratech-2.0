"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState } from "react";
import Link from "next/link";

export function Navigation({ children }: { children?: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Services",
      link: "/services",
    },
    {
      name: "Products",
      link: "/products",
    },
    {
      name: "Industries",
      link: "/industries",
    },
    {
      name: "Courses",
      link: "/courses",
    },
    {
      name: "Case Studies",
      link: "/case-studies",
    },
    {
      name: "Blog",
      link: "/blog",
    },
    {
      name: "Careers",
      link: "/careers",
    },
  ];

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems
            items={navItems}
            onItemClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <NavbarButton
              variant="primary"
              href="/contact"
            >
              Contact Us
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            className="backdrop-blur-xl bg-white/90 dark:bg-black/90"
          >
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-foreground/90 dark:text-zinc-200 hover:text-black dark:hover:text-white transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 w-full text-left font-medium"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}

            {/* Mobile CTA Buttons */}
            <div className="flex w-full flex-col gap-3 mt-6 pt-6 border-t border-white/20 dark:border-white/10">
              <NavbarButton
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full justify-center text-secondary "
              >
                Contact Us
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {children}
    </div>
  );
}