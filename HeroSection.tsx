import React from 'react';
import { cn } from '@/lib/utils';

interface HeroSectionProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  backgroundImage?: string;
}

export function HeroSection({
  className,
  title,
  subtitle,
  description,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  backgroundImage,
  ...props
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative py-20 md:py-32 px-6 md:px-12 overflow-hidden",
        backgroundImage ? "text-blanc-casse" : "text-noir-profond",
        className
      )}
      {...props}
    >
      {/* Background Image with Overlay */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-noir-profond/60 mix-blend-multiply"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bordeaux-profond/80 to-transparent opacity-70" />
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl">
          <h4 className="font-cormorant text-lg md:text-xl mb-3 text-or-sophistique animate-fade-in">
            {subtitle}
          </h4>
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
            {title}
          </h1>
          <p className="font-montserrat text-lg md:text-xl mb-8 max-w-2xl opacity-90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <a
              href={ctaHref}
              className="inline-flex items-center justify-center bg-bordeaux-profond text-blanc-casse px-6 py-3 rounded-sm transition-all duration-300 hover:opacity-90"
            >
              {ctaText}
            </a>
            
            {secondaryCtaText && secondaryCtaHref && (
              <a
                href={secondaryCtaHref}
                className="inline-flex items-center justify-center border-2 border-or-sophistique text-or-sophistique px-6 py-3 rounded-sm transition-all duration-300 hover:bg-or-sophistique hover:text-blanc-casse"
              >
                {secondaryCtaText}
              </a>
            )}
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-or-sophistique/10 -z-10 rounded-tl-[100px]" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-sable-dore/20 -z-10 rounded-bl-full" />
    </section>
  );
}
