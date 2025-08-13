"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";

import React, { useRef, useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
    dropdown?: { name: string; link: string }[];
  }[];
  className?: string;
  onItemClick?: (link: string) => void;
  currentPage?: string;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 top-0 z-50 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(16px)" : "blur(8px)",
        backgroundColor: visible 
          ? "rgba(255, 255, 255, 0.9)" 
          : "rgba(255, 255, 255, 0.8)",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "0 1px 2px rgba(0, 0, 0, 0.1)",
        borderRadius: visible ? "12px" : "0px",
        width: visible ? "80%" : "100%",
        padding: visible ? "8px 16px" : "8px 24px",
        y: visible ? 8 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start border border-border/50 lg:flex",
        "dark:bg-background/80 dark:border-border/30",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick, currentPage }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <motion.div
      onMouseLeave={() => {
        setHovered(null);
        setActiveDropdown(null);
      }}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2",
        className,
      )}
    >
      {items.map((item, idx) => (
        <div key={item.name + item.link} className="relative">
          <button
            onMouseEnter={() => {
              setHovered(idx);
              if (item.dropdown) {
                setActiveDropdown(item.name);
              }
            }}
            onClick={() => onItemClick?.(item.link)}
            className={cn(
              "relative px-4 py-2 text-neutral-600 dark:text-neutral-300 transition-colors",
              currentPage === item.link.replace('/', '') && "text-primary dark:text-primary"
            )}
          >
            {hovered === idx && (
              <motion.div
                layoutId="hovered"
                className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800"
              />
            )}
            <span className="relative z-20 flex items-center">
              {item.name}
              {item.dropdown && (
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </span>
          </button>
          
          {/* Dropdown Menu */}
          {item.dropdown && activeDropdown === item.name && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 mt-1 w-48 bg-background/95 backdrop-blur-lg border border-border/50 rounded-lg shadow-xl py-2 z-50"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {item.dropdown.map((dropdownItem) => (
                <button
                  key={dropdownItem.name + dropdownItem.link}
                  onClick={() => onItemClick?.(dropdownItem.link)}
                  className="block w-full text-left px-4 py-2 text-sm text-foreground hover:text-primary hover:bg-accent/50 transition-colors"
                >
                  {dropdownItem.name}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(16px)" : "blur(8px)",
        backgroundColor: visible 
          ? "rgba(255, 255, 255, 0.9)" 
          : "rgba(255, 255, 255, 0.8)",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "0 1px 2px rgba(0, 0, 0, 0.1)",
        borderRadius: visible ? "8px" : "0px",
        width: visible ? "95%" : "100%",
        padding: visible ? "8px 12px" : "8px 16px",
        y: visible ? 8 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-1rem)] flex-col items-center justify-between border border-border/50 lg:hidden",
        "dark:bg-background/80 dark:border-border/30",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between px-2 py-2",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className={cn(
            "w-full flex flex-col items-start justify-start gap-4 px-4 py-4 bg-background/95 backdrop-blur-lg border-t border-border/50",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button onClick={onClick} className="p-2">
      {isOpen ? (
        <IconX className="h-6 w-6 text-foreground" />
      ) : (
        <IconMenu2 className="h-6 w-6 text-foreground" />
      )}
    </button>
  );
};

export const NavbarLogo = ({ 
  logoIcon, 
  logoText, 
  onClick 
}: { 
  logoIcon?: string; 
  logoText?: string; 
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal group"
    >
      {logoIcon && (
        <div className="relative group-hover:scale-110 transition-transform duration-300">
          <div className="absolute inset-0 bg-brand-gradient rounded-xl blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
          <Image
            src={logoIcon}
            alt="SIYARA TECH Logo"
            width={32}
            height={32}
            className="relative object-contain"
          />
        </div>
      )}
      {logoText && (
        <div className="hidden sm:block">
          <Image
            src={logoText}
            alt="SIYARA TECH"
            width={120}
            height={24}
            className="h-6 object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <span className="sm:hidden text-lg font-bold text-brand-gradient">
        SIYARA
      </span>
    </button>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "button",
  children,
  className,
  variant = "primary",
  onClick,
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "gradient";
  onClick?: () => void;
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-4 py-2 rounded-md text-sm font-medium relative cursor-pointer hover:scale-105 transition-all duration-300 inline-block text-center border-0";

  const variantStyles = {
    primary:
      "bg-brand-gradient hover:bg-brand-gradient-hover text-white shadow-lg hover:shadow-xl",
    secondary: 
      "bg-transparent hover:bg-accent/50 text-foreground hover:text-primary border border-border/30",
    gradient:
      "bg-brand-gradient hover:bg-brand-gradient-hover text-white shadow-lg hover:shadow-xl",
  };

  return (
    <Tag
      href={href || undefined}
      onClick={onClick}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
