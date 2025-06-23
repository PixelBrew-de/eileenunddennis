import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/#timeline', label: 'Zeitplan' },
    { href: '/#rsvp', label: 'Anmeldung' },
  ];

  const handleAnchorClick = (href: string) => {
    if (href.startsWith('/#')) {
      const elementId = href.substring(2);
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm fixed w-full top-0 z-50 shadow-sm border-b border-wedding-beige/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <h1 className="font-script text-2xl text-dusty-rose cursor-pointer">Eillen & Dennis</h1>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span 
                    className="text-charcoal hover:text-dusty-rose transition duration-300 cursor-pointer"
                    onClick={() => handleAnchorClick(item.href)}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-charcoal hover:text-dusty-rose">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-wedding-beige/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span 
                  className="block px-3 py-2 text-charcoal hover:text-dusty-rose cursor-pointer"
                  onClick={() => handleAnchorClick(item.href)}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
