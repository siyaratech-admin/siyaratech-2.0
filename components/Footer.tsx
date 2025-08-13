"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Github, 
  Facebook,
  ArrowRight,
  Heart
} from 'lucide-react';
const  logoText = '/static_images/siyaratech_logo_name_below_tagline.png';
const logoIcon  = '/static_images/siyaratech_logo_transparent.png';

export default function Footer() {
  const router = useRouter();

  // Function to navigate and scroll to top
  const navigateTo = (page: string) => {
    const path = page === 'home' ? '/' : `/${page}`;
    router.push(path);
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerSections = [
    {
      title: 'Services',
      links: [
        { name: 'AI & Automation', page: 'services' as const },
        { name: 'Cloud Services', page: 'services' as const },
        { name: 'Software Development', page: 'services' as const },
        { name: 'Digital Transformation', page: 'services' as const },
        { name: 'Business Consulting', page: 'services' as const },
        { name: 'Talent Outsourcing', page: 'services' as const }
      ]
    },
    {
      title: 'Industries',
      links: [
        { name: 'Healthcare', page: 'industries' as const },
        { name: 'Finance', page: 'industries' as const },
        { name: 'Manufacturing', page: 'industries' as const },
        { name: 'Retail', page: 'industries' as const },
        { name: 'Education', page: 'industries' as const },
        { name: 'Technology', page: 'industries' as const }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', page: 'about' as const },
        { name: 'Case Studies', page: 'case-studies' as const },
        { name: 'Blog', page: 'blog' as const },
        { name: 'Careers', page: 'careers' as const },
        { name: 'Contact', page: 'contact' as const }
      ]
    }
  ];

  const socialLinks = [
    { icon: Linkedin, href: '#', name: 'LinkedIn' },
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Github, href: '#', name: 'GitHub' },
    { icon: Facebook, href: '#', name: 'Facebook' }
  ];

  return (
    <footer className="bg-gradient-to-b from-background to-accent/20 border-t border-border/50 transition-colors duration-300">
      {/* Newsletter Section */}
      <div className="py-16 bg-gradient-to-r from-primary/5 via-chart-1/5 to-chart-2/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-brand-gradient">
              Stay Updated with SIYARA TECH
            </h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Get the latest insights on technology trends, digital transformation, and innovation delivered to your inbox.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-background/50 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors"
            />
            <Button className="bg-brand-gradient hover:bg-brand-gradient-hover text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105">
              Subscribe
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <div className="relative mr-3">
                  <div className="absolute inset-0 bg-brand-gradient rounded-xl blur-sm opacity-50"></div>
                  <img 
                    src={logoIcon}
                    alt="SIYARA TECH Logo"
                    className="relative w-10 h-10 object-contain"
                  />
                </div>
                <img 
                  src={logoText}
                  alt="SIYARA TECH"
                  className="h-8 object-contain"
                />
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Empowering businesses through innovative technology solutions. We transform ideas into reality with cutting-edge AI, modern web development, and comprehensive digital transformation services.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="w-5 h-5 mr-3 text-primary" />
                  <span>hello@siyaratech.com</span>
                </div>
                <div className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="w-5 h-5 mr-3 text-primary" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <MapPin className="w-5 h-5 mr-3 text-primary" />
                  <span>123 Innovation Street, Tech City, TC 12345</span>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold text-foreground mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <button
                        onClick={() => navigateTo(link.page)}
                        className="text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Separator className="opacity-50" />

      {/* Bottom Footer */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center text-muted-foreground mb-4 md:mb-0">
              <span>© 2024 SIYARA TECH. Made with</span>
              <Heart className="w-4 h-4 mx-2 text-chart-1 fill-current animate-pulse" />
              <span>for innovation.</span>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.name}
                  className="w-10 h-10 bg-gradient-to-br from-accent to-accent/50 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-brand-gradient hover:text-white transition-all duration-300 hover:scale-110 group"
                >
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center mt-6 pt-6 border-t border-border/30 text-sm text-muted-foreground">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <button className="hover:text-primary transition-colors">Privacy Policy</button>
              <button className="hover:text-primary transition-colors">Terms of Service</button>
              <button className="hover:text-primary transition-colors">Cookie Policy</button>
            </div>
            <div>
              <span>Proudly serving clients worldwide since 2014</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}