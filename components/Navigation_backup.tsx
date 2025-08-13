"use client";

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';

export function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const logoIcon = '/static_images/siyaratech_logo_icon.png';
  const logoText = '/static_images/siyaratech_logo_name_below_tagline.png';

  const menuItems = [
    { name: 'Home', link: '/' },
    {
      name: 'Services',
      link: '/services',
      dropdown: [
        { name: 'Web Development', link: '/services#web-development' },
        { name: 'Mobile App Development', link: '/services#mobile-development' },
        { name: 'API Development', link: '/services#api-development' },
        { name: 'DevOps Solutions', link: '/services#devops' },
        { name: 'Cloud Migration', link: '/services#cloud-migration' },
        { name: 'Digital Transformation', link: '/services#digital-transformation' },
      ]
    },
    {
      name: 'Industries',
      link: '/industries',
      dropdown: [
        { name: 'Healthcare', link: '/industries#healthcare' },
        { name: 'E-commerce', link: '/industries#ecommerce' },
        { name: 'Education', link: '/industries#education' },
        { name: 'Finance', link: '/industries#finance' },
        { name: 'Manufacturing', link: '/industries#manufacturing' },
        { name: 'Real Estate', link: '/industries#real-estate' },
      ]
    },
    { name: 'Case Studies', link: '/case-studies' },
    { name: 'About', link: '/about' },
    { name: 'Blog', link: '/blog' },
    { name: 'Careers', link: '/careers' },
  ];

  const handleNavigation = (path: string) => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
    
    if (path.includes('#')) {
      const [routePath, hash] = path.split('#');
      router.push(routePath || '/');
      
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      router.push(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLogoClick = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
    router.push('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentPage = pathname === '/' ? 'home' : pathname.replace('/', '');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center space-x-2 text-xl font-bold group"
          >
            <div className="relative group-hover:scale-110 transition-transform duration-300">
              <div className="absolute inset-0 bg-brand-gradient rounded-xl blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <img
                src={logoIcon}
                alt="SIYARA TECH Logo"
                className="relative h-8 w-8 object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <img
                src={logoText}
                alt="SIYARA TECH"
                className="h-6 object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="sm:hidden text-brand-gradient">SIYARA</span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {menuItems.map((item) => (
                <div key={item.name} className="relative group">
                  <button
                    onClick={() => handleNavigation(item.link)}
                    onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                    onMouseLeave={() => !item.dropdown && setActiveDropdown(null)}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
                      currentPage === item.link.replace('/', '') 
                        ? 'text-primary bg-accent/20' 
                        : 'text-foreground hover:text-primary hover:bg-accent/10'
                    }`}
                  >
                    <span>{item.name}</span>
                    {item.dropdown && (
                      <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>
                  
                  {/* Dropdown Menu */}
                  {item.dropdown && activeDropdown === item.name && (
                    <div 
                      className="absolute top-full left-0 mt-1 w-56 bg-background/95 backdrop-blur-lg border border-border/50 rounded-lg shadow-xl py-2 z-50"
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {item.dropdown.map((dropdownItem) => (
                        <button
                          key={dropdownItem.name}
                          onClick={() => handleNavigation(dropdownItem.link)}
                          className="block w-full text-left px-4 py-2 text-sm text-foreground hover:text-primary hover:bg-accent/50 transition-colors"
                        >
                          {dropdownItem.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <button
                onClick={() => handleNavigation('/contact')}
                className="bg-brand-gradient hover:bg-brand-gradient-hover text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-foreground hover:bg-accent/50 transition-colors"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/50">
            <div className="space-y-4">
              {menuItems.map((item) => (
                <div key={item.name}>
                  <button
                    onClick={() => handleNavigation(item.link)}
                    className={`block w-full text-left py-2 px-3 rounded-md transition-colors ${
                      currentPage === item.link.replace('/', '') 
                        ? 'text-primary bg-accent/50' 
                        : 'text-foreground hover:text-primary hover:bg-accent/30'
                    }`}
                  >
                    {item.name}
                  </button>
                  
                  {item.dropdown && (
                    <div className="mt-2 ml-4 space-y-2">
                      {item.dropdown.map((dropdownItem) => (
                        <button
                          key={dropdownItem.name}
                          onClick={() => handleNavigation(dropdownItem.link)}
                          className="block w-full text-left py-1 px-3 text-sm text-muted-foreground hover:text-primary hover:bg-accent/20 rounded transition-colors"
                        >
                          {dropdownItem.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="pt-4 border-t border-border/30">
                <button
                  onClick={() => handleNavigation('/contact')}
                  className="w-full bg-brand-gradient hover:bg-brand-gradient-hover text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
