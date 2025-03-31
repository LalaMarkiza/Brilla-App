import React from 'react';
import { cn } from '@/lib/utils';

interface FeaturesGridProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  subtitle: string;
  description?: string;
  features: {
    icon?: React.ReactNode;
    title: string;
    description: string;
  }[];
  columns?: 2 | 3 | 4;
}

export function FeaturesGrid({
  className,
  title,
  subtitle,
  description,
  features,
  columns = 3,
  ...props
}: FeaturesGridProps) {
  return (
    <section
      className={cn(
        "py-16 md:py-24 px-6 md:px-12 bg-blanc-casse",
        className
      )}
      {...props}
    >
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h4 className="font-cormorant text-lg md:text-xl mb-3 text-or-sophistique">
            {subtitle}
          </h4>
          <h2 className="font-playfair text-3xl md:text-4xl font-semibold mb-6 text-bordeaux-profond">
            {title}
          </h2>
          {description && (
            <p className="text-taupe-elegant">
              {description}
            </p>
          )}
        </div>
        
        {/* Features Grid */}
        <div className={cn(
          "grid gap-8",
          columns === 2 && "grid-cols-1 md:grid-cols-2",
          columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
          columns === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        )}>
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-blanc-casse border border-or-sophistique/10 rounded-sm p-6 shadow-elegant hover:shadow-premium transition-all duration-300"
            >
              {feature.icon && (
                <div className="text-or-sophistique mb-4">
                  {feature.icon}
                </div>
              )}
              <h3 className="font-cormorant text-xl font-semibold mb-3 text-bordeaux-profond">
                {feature.title}
              </h3>
              <p className="text-taupe-elegant">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
