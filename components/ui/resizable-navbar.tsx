"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";

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
  }[];
  className?: string;
  onItemClick?: () => void;
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
  onClose: () => void;
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
      className={cn("fixed inset-x-0 top-4 z-50 w-full px-4 backdrop-blur-sm rounded-full", className)}
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
        width: visible ? "fit-content" : "90%",
        maxWidth: visible ? "950px" : "100%",
        minWidth: visible ? "min(95%, 1150px)" : "300px",
        y: 0,
        scale: visible ? 0.95 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full flex-row items-center justify-between rounded-full px-6 py-2 lg:flex",
        "glass-card glass-card-hover glass-highlight",
        "border-border shadow-lg",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-1 text-sm font-medium transition duration-200 lg:flex lg:space-x-1",
        className,
      )}
    >
      {items.map((item, idx) => (
        <Link
          key={`link-${idx}`}
          href={item.link}
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 text-foreground hover:text-foreground transition-colors duration-200 font-semibold"
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-secondary/80 dark:bg-white/10"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </Link>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        width: visible ? "95%" : "90%",
        borderRadius: visible ? "16px" : "20px",
        y: 0,
        scale: visible ? 0.98 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full flex-col items-center justify-between rounded-2xl px-4 py-3 lg:hidden",
        "glass-card backdrop-blur-md",
        "border-border shadow-lg",
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
        "flex w-full flex-row items-center justify-between",
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
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className={cn(
            "absolute inset-x-0 top-full mt-2 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-2xl px-4 py-8",
            "glass-card border-border shadow-lg",
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
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="p-2 rounded-lg hover:bg-accent transition-colors duration-200"
    >
      {isOpen ? (
        <IconX className="text-foreground w-5 h-5" />
      ) : (
        <IconMenu2 className="text-foreground w-5 h-5" />
      )}
    </motion.button>
  );
};

import Link from "next/link";
import Image from "next/image";
import { Badge } from "./badge";

export const NavbarLogo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 mr-4 flex items-center space-x-3 px-2 py-1 text-sm font-normal group"
    >
      {/* Logo Icon */}
      <div className="relative">
        <div className="w-36 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
          <div className="w-36 h-36  rounded-md flex items-center justify-center">
            <Image src={"/static_images/logo.png"} alt="Siyaratech" width={256} height={128} className="object-cover" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export const NavbarButton = ({
  href,
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & React.ComponentPropsWithoutRef<React.ElementType>) => {
  const baseStyles =
    "px-4 py-2 rounded-lg text-sm font-medium relative cursor-pointer hover:-translate-y-0.5 transition-all duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "bg-white text-primary hover:bg-gray-50 dark:bg-brand-gradient font-semibold dark:text-primary shadow-lg hover:shadow-xl",
    secondary:
      "glass-card glass-card-hover text-foreground border-border hover:border-brand-purple/50",
    dark:
      "bg-card text-foreground glass-card border-border hover:bg-accent",
    gradient:
      "bg-brand-gradient text-white shadow-lg hover:shadow-xl",
  };

  if (href) {
    return (
      <Link
        href={href}
        className={cn(baseStyles, variantStyles[variant], className)}
        {...(props as any)}
      >
        {children}
      </Link>
    );
  }

  return (
    <Badge
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Badge>
  );
};