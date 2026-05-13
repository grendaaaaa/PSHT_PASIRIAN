import React from 'react';
import Link from 'next/link';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface HeroSectionProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  breadcrumbs?: Breadcrumb[];
  maxWidthClass?: string;
}

export default function HeroSection({
  title,
  description,
  imageSrc,
  imageAlt,
  breadcrumbs = [{ label: 'Beranda', href: '/' }],
  maxWidthClass = 'max-w-4xl',
}: HeroSectionProps) {
  return (
    <section className="relative h-[320px] sm:h-[380px] md:h-[400px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover"
          alt={imageAlt}
          src={imageSrc}
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      <div className={`relative z-10 text-center text-white px-4 sm:px-gutter ${maxWidthClass} flex flex-col items-center w-full`}>
        {breadcrumbs.length > 0 && (
          <nav className="flex justify-center mb-2 sm:mb-sm gap-xs text-white/70 text-xs sm:text-label-md flex-wrap">
            {breadcrumbs.map((bc, index) => (
              <React.Fragment key={index}>
                {bc.href ? (
                  <Link href={bc.href} className="hover:text-white transition-colors">
                    {bc.label}
                  </Link>
                ) : (
                  <span className="text-white">{bc.label}</span>
                )}
                {index < breadcrumbs.length - 1 && <span>/</span>}
              </React.Fragment>
            ))}
          </nav>
        )}
        <h1 className="font-display-lg text-2xl sm:text-4xl md:text-display-lg mb-2 sm:mb-md leading-tight">
          {title}
        </h1>
        <p className="text-sm sm:text-base md:text-body-lg text-white/90 w-full mx-auto">
          {description}
        </p>
      </div>
    </section>
  );
}
