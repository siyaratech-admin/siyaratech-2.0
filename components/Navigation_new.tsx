"use client";

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
  NavbarButton,
} from './ui/resizable-navbar';

export function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    router.push('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentPage = pathname === '/' ? 'home' : pathname.replace('/', '');

  return (
    <Navbar className="max-w-7xl mx-auto">
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo 
          logoIcon={logoIcon} 
          logoText={logoText} 
          onClick={handleLogoClick}
        />
        
        <NavItems 
          items={menuItems} 
          onItemClick={handleNavigation}
          currentPage={currentPage}
        />
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <NavbarButton 
            variant="gradient" 
            onClick={() => handleNavigation('/contact')}
          >
            Get Started
          </NavbarButton>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo 
            logoIcon={logoIcon} 
            logoText={logoText} 
            onClick={handleLogoClick}
          />
          
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <MobileNavToggle 
              isOpen={isMenuOpen} 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
        </MobileNavHeader>

        <MobileNavMenu isOpen={isMenuOpen}>
          <div className="w-full space-y-4">
            {menuItems.map((item) => (
              <div key={item.name} className="w-full">
                <button
                  onClick={() => handleNavigation(item.link)}
                  className={`w-full text-left py-2 px-3 rounded-md transition-colors ${
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
              <NavbarButton 
                variant="gradient" 
                onClick={() => handleNavigation('/contact')}
                className="w-full"
              >
                Get Started
              </NavbarButton>
            </div>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
