'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { House, Info, MapPin, Network, Newspaper } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Beranda', icon: House },
  { href: '/profil', label: 'Profil Organisasi', icon: Info },
  { href: '/struktur', label: 'Struktur Organisasi', icon: Network },
  { href: '/data-rayon', label: 'Data Rayon', icon: MapPin },
  { href: '/berita', label: 'Berita', icon: Newspaper },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [navHeight, setNavHeight] = useState(58);
  const navRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  useEffect(() => { setMounted(true); }, []);

  // Ukur tinggi navbar aktual agar spacer mobile menu akurat
  useEffect(() => {
    const measure = () => {
      if (navRef.current) setNavHeight(navRef.current.offsetHeight);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);
      // Hanya hide/show setelah lewat 80px dari atas
      if (currentY < 80) {
        setNavVisible(true);
      } else if (currentY > lastScrollY.current + 5) {
        // Scroll ke bawah → sembunyikan
        setNavVisible(false);
        setMenuOpen(false);
      } else if (currentY < lastScrollY.current - 5) {
        // Scroll ke atas → tampilkan
        setNavVisible(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tutup menu saat navigasi berubah
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Kunci scroll body saat menu mobile terbuka
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Tutup menu dengan tombol Escape
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setMenuOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <style jsx global>{`
        @keyframes menuItemIn {
          from { opacity: 0; transform: translateX(-16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.5); opacity: 0.5; }
        }
        @keyframes shimmerLine {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        /* Stagger animasi item menu mobile */
        .menu-item-anim {
          animation: menuItemIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .menu-item-anim:nth-child(1) { animation-delay: 0.04s; }
        .menu-item-anim:nth-child(2) { animation-delay: 0.09s; }
        .menu-item-anim:nth-child(3) { animation-delay: 0.14s; }
        .menu-item-anim:nth-child(4) { animation-delay: 0.19s; }
        .menu-item-anim:nth-child(5) { animation-delay: 0.24s; }

        /* Hamburger animasi */
        .bar {
          display: block;
          width: 22px;
          height: 2px;
          background: currentColor;
          border-radius: 2px;
          transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.22s ease,
                      width 0.22s ease;
          transform-origin: center;
        }
        .bar-open .bar:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .bar-open .bar:nth-child(2) { opacity: 0; width: 0; }
        .bar-open .bar:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* Underline aktif desktop */
        .nav-desktop-link {
          position: relative;
        }
        .nav-desktop-link::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: #D4AF37;
          border-radius: 2px;
          transition: width 0.28s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nav-desktop-link:hover::after,
        .nav-desktop-link.is-active::after {
          width: 60%;
        }

        /* Backdrop mobile */
        .mobile-backdrop {
          transition: opacity 0.28s ease, visibility 0.28s ease;
        }

        /* Panel mobile */
        .mobile-panel {
          transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity  0.25s ease;
        }
      `}</style>

      {/* ─── NAVBAR BAR ─── */}
      <nav
        ref={navRef}
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#6b1f1f] via-[#7f1d1d] to-[#6b1f1f] transition-all duration-400 ease-in-out ${scrolled ? 'shadow-lg shadow-black/30' : ''} ${navVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
      >
        {/* Garis aksen atas */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />

        <div className="flex items-center justify-end md:justify-between px-4 sm:px-6 lg:px-8 py-3 max-w-7xl mx-auto relative">

          {/* Logo + Brand */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex items-center gap-3 group flex-shrink-0"
            aria-label="PSHT Pasirian — Beranda"
          >
            <div className="relative w-10 h-10 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              <Image
                src="/images/psht_logo.png"
                alt="Logo PSHT"
                fill
                sizes="40px"
                className="object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
                priority
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-extrabold text-base sm:text-lg tracking-tight uppercase">
                PSHT
              </span>
              <span className="text-amber-400 font-semibold text-[9px] sm:text-[10px] tracking-[0.18em] uppercase">
                Ranting Pasirian
              </span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-desktop-link px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-250 ${isActive
                    ? 'is-active text-white bg-white/10'
                    : 'text-white/75 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Hamburger button — mobile only */}
          <button
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-panel"
            onClick={() => setMenuOpen((v) => !v)}
            className={`md:hidden p-2.5 rounded-lg transition-colors duration-200 ${menuOpen
              ? 'text-white bg-white/15'
              : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
          >
            {/* Tiga garis — class bar-open di wrapper, bukan button */}
            <div className={`flex flex-col gap-[5px] ${menuOpen ? 'bar-open' : ''}`}>
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </div>
          </button>
        </div>
      </nav>
      {/* ─── MOBILE OVERLAY + PANEL ─── */}
      {mounted && (
        <>
          {/* Backdrop gelap di belakang menu */}
          <div
            className={`mobile-backdrop fixed inset-0 z-40 bg-black/55 backdrop-blur-sm md:hidden ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Panel dropdown popup di sebelah kanan */}
          <div
            id="mobile-nav-panel"
            role="navigation"
            aria-label="Menu navigasi"
            className={`mobile-panel fixed right-4 w-64 sm:w-72 md:hidden origin-top-right transition-all duration-300 ${menuOpen
              ? 'scale-100 opacity-100'
              : 'scale-95 opacity-0 pointer-events-none'
              }`}
            style={{ top: navHeight + 8, zIndex: 50 }}
          >
            {/* Konten menu */}
            <div className="bg-red-950/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
              <div className="p-2">

                {/* List item navigasi */}
                <ul className="flex flex-col" role="list">
                  {menuOpen &&
                    navLinks.map((link) => {
                      const isActive = pathname === link.href;
                      const LinkIcon = link.icon;
                      return (
                        <li key={link.href} className="menu-item-anim">
                          <Link
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${isActive
                              ? 'bg-white/10 text-white'
                              : 'text-white/70 hover:text-white hover:bg-white/6 active:bg-white/12'
                              }`}
                          >
                            <LinkIcon
                              className="w-5 h-5 flex-shrink-0 transition-colors"
                              style={{ color: isActive ? '#D4AF37' : 'rgba(255,255,255,0.35)' }}
                              strokeWidth={2}
                            />

                            {/* Label */}
                            <span className="flex-1 text-[13px] sm:text-[14px] font-semibold tracking-wide uppercase">
                              {link.label}
                            </span>

                            {/* Titik aktif */}
                            {isActive && (
                              <span
                                className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0"
                                style={{ animation: 'pulseDot 2s ease-in-out infinite' }}
                              />
                            )}
                          </Link>

                          {/* Divider tipis (kecuali item terakhir) */}
                          {link !== navLinks[navLinks.length - 1] && (
                            <div className="mx-2 my-0.5 h-px bg-white/5" />
                          )}
                        </li>
                      );
                    })}
                </ul>

                {/* Footer dekoratif di bawah menu */}
                <div className="mt-5 pt-4 border-t border-white/8 flex items-center justify-center gap-3">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent to-amber-400/25" />
                  <span className="text-[10px] text-white/25 uppercase tracking-[0.3em] font-medium whitespace-nowrap">
                    PSHT Pasirian
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent to-amber-400/25" />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}