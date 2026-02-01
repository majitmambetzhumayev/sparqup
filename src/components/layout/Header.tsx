// src/components/layout/Header.tsx

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuestionnaireModal } from '../questionnaire/QuestionnaireProvider';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/solutions', label: 'Solutions' },
    { href: '/realisations', label: 'Réalisations' },
    { href: '/contact', label: 'Contact' },
  ];

  const scrollstate = isScrolled ? 'scrolled' : 'top';

  const { open } = useQuestionnaireModal();

  console.log('Header render - scrollstate:', scrollstate);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 pointer-events-none transition-all duration-300">
      <div className="pt-6 px-2 pointer-events-auto">
        <div className="max-w-7xl mx-auto bg-neutral-200 rounded-full shadow-lg pl-1.5 pr-0.3 py-1.5">
          <div className="flex items-center justify-between px-2">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/media/logos/sparqup-light.svg" // Version dark (fond clair)
                alt="SparqUp"
                width={120}
                height={32}
                priority
                className="h-8 w-auto"
              />
              <span className="pl-3 text-forest-950 text-xl">Sparqup</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'text-forest-900'
                      : 'text-forest-950 hover:text-forest-900'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={() => open()}
                className="group flex items-center gap-3 pl-6 pr-2 py-2 bg-neutral-900 hover:bg-neutral-800 rounded-full transition-colors"
              >
                <span className="text-sm font-medium text-neutral-100">Simuler mon projet</span>
                <div className="w-8 h-8 bg-neutral-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-4 h-4 text-black" />
                </div>
              </button>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2 text-neutral-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-2 bg-white rounded-3xl shadow-lg p-6 max-w-7xl mx-auto">
            <nav className="flex flex-col gap-4">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-base font-medium transition-colors py-2',
                    pathname === link.href
                      ? 'text-neutral-700'
                      : 'text-neutral-900 hover:text-neutral-700'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <button
                onClick={() => open()}
                className="w-full flex items-center justify-between pl-6 pr-2 py-3 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors mt-4"
              >
                <span className="text-sm font-medium text-neutral-900">Simuler mon projet</span>
                <div className="w-8 h-8 bg-neutral-900 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
