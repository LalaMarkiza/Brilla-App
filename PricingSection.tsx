import React from 'react';
import { cn } from '@/lib/utils';

interface PricingSectionProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  subtitle: string;
  description?: string;
  plans: {
    title: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    buttonText: string;
    buttonHref: string;
    isPopular?: boolean;
  }[];
}

export function PricingSection({
  className,
  title,
  subtitle,
  description,
  plans,
  ...props
}: PricingSectionProps) {
  return (
    <section
      className={cn(
        "py-16 md:py-24 px-6 md:px-12 bg-subtle-texture",
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
        
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={cn(
                "relative",
                plan.isPopular && "z-10"
              )}
            >
              <div
                className={cn(
                  "rounded-sm p-6 h-full transition-all duration-300",
                  plan.isPopular 
                    ? "bg-premium-gradient text-blanc-casse shadow-premium border-2 border-or-brillant transform scale-105" 
                    : "bg-blanc-casse shadow-elegant border border-or-sophistique/10 hover:border-or-sophistique/30"
                )}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                    <span className="bg-or-brillant text-blanc-casse text-xs font-medium px-3 py-1 rounded-sm">
                      RECOMMANDÉ
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className={cn(
                    "font-playfair text-2xl font-semibold mb-2",
                    plan.isPopular ? "text-blanc-casse" : "text-bordeaux-profond"
                  )}>
                    {plan.title}
                  </h3>
                  <div className="flex items-center justify-center">
                    <span className={cn(
                      "font-didot text-4xl font-bold",
                      plan.isPopular ? "text-blanc-casse" : "text-or-sophistique"
                    )}>
                      {plan.price}
                    </span>
                    <span className={cn(
                      "ml-2 text-sm",
                      plan.isPopular ? "text-blanc-casse/80" : "text-taupe-elegant"
                    )}>
                      {plan.period}
                    </span>
                  </div>
                  <p className={cn(
                    "mt-3 text-sm",
                    plan.isPopular ? "text-blanc-casse/90" : "text-taupe-elegant"
                  )}>
                    {plan.description}
                  </p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex}
                      className={cn(
                        "flex items-start",
                        plan.isPopular ? "text-blanc-casse/90" : "text-taupe-elegant"
                      )}
                    >
                      <svg 
                        className={cn(
                          "h-5 w-5 mr-2 flex-shrink-0",
                          plan.isPopular ? "text-blanc-casse" : "text-or-sophistique"
                        )} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M5 13l4 4L19 7" 
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a
                  href={plan.buttonHref}
                  className={cn(
                    "block w-full text-center py-3 px-4 rounded-sm transition-all duration-300",
                    plan.isPopular 
                      ? "bg-blanc-casse text-bordeaux-profond hover:bg-blanc-casse/90" 
                      : "bg-bordeaux-profond text-blanc-casse hover:bg-bordeaux-profond/90"
                  )}
                >
                  {plan.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
