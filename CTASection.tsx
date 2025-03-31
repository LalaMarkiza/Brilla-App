import React from 'react';
import { cn } from '@/lib/utils';

interface CTASectionProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  backgroundImage?: string;
}

export function CTASection({
  className,
  title,
  description,
  buttonText,
  buttonHref,
  backgroundImage,
  ...props
}: CTASectionProps) {
  return (
    <section
      className={cn(
        "relative py-16 md:py-24 px-6 md:px-12 overflow-hidden",
        backgroundImage ? "text-blanc-casse" : "bg-premium-gradient text-blanc-casse",
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
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-semibold mb-6">
            {title}
          </h2>
          <p className="font-montserrat text-lg mb-8 max-w-2xl mx-auto opacity-90">
            {description}
          </p>
          
          <a
            href={buttonHref}
            className="inline-flex items-center justify-center bg-blanc-casse text-bordeaux-profond px-8 py-3 rounded-sm transition-all duration-300 hover:bg-blanc-casse/90"
          >
            {buttonText}
          </a>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-or-brillant/10 -z-10 rounded-br-full" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-blanc-casse/10 -z-10 rounded-tl-full" />
    </section>
  );
}
