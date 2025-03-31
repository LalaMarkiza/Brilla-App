import React from 'react';
import { cn } from '@/lib/utils';

interface PricingPlanProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  onSelect: () => void;
  isPopular?: boolean;
  isSelected?: boolean;
}

export function PricingPlan({
  className,
  title,
  price,
  period,
  description,
  features,
  buttonText,
  onSelect,
  isPopular = false,
  isSelected = false,
  ...props
}: PricingPlanProps) {
  return (
    <div
      className={cn(
        "rounded-sm p-6 transition-all duration-300 relative",
        isPopular 
          ? "bg-premium-gradient text-blanc-casse shadow-premium border-2 border-or-brillant transform scale-105" 
          : "bg-blanc-casse shadow-elegant border border-or-sophistique/10 hover:border-or-sophistique/30",
        isSelected && !isPopular && "border-2 border-or-sophistique",
        className
      )}
      {...props}
    >
      {isPopular && (
        <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
          <span className="bg-or-brillant text-blanc-casse text-xs font-medium px-3 py-1 rounded-sm">
            RECOMMANDÉ
          </span>
        </div>
      )}
      
      {isSelected && (
        <div className="absolute top-0 left-0 transform -translate-x-2 -translate-y-2">
          <span className={cn(
            "text-xs font-medium px-3 py-1 rounded-sm",
            isPopular ? "bg-blanc-casse text-bordeaux-profond" : "bg-or-sophistique text-blanc-casse"
          )}>
            SÉLECTIONNÉ
          </span>
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className={cn(
          "font-playfair text-2xl font-semibold mb-2",
          isPopular ? "text-blanc-casse" : "text-bordeaux-profond"
        )}>
          {title}
        </h3>
        <div className="flex items-center justify-center">
          <span className={cn(
            "font-didot text-4xl font-bold",
            isPopular ? "text-blanc-casse" : "text-or-sophistique"
          )}>
            {price}
          </span>
          <span className={cn(
            "ml-2 text-sm",
            isPopular ? "text-blanc-casse/80" : "text-taupe-elegant"
          )}>
            {period}
          </span>
        </div>
        <p className={cn(
          "mt-3 text-sm",
          isPopular ? "text-blanc-casse/90" : "text-taupe-elegant"
        )}>
          {description}
        </p>
      </div>
      
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li 
            key={index}
            className={cn(
              "flex items-start",
              isPopular ? "text-blanc-casse/90" : "text-taupe-elegant"
            )}
          >
            <svg 
              className={cn(
                "h-5 w-5 mr-2 flex-shrink-0",
                isPopular ? "text-blanc-casse" : "text-or-sophistique"
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
      
      <button
        onClick={onSelect}
        className={cn(
          "block w-full text-center py-3 px-4 rounded-sm transition-all duration-300",
          isPopular 
            ? "bg-blanc-casse text-bordeaux-profond hover:bg-blanc-casse/90" 
            : "bg-bordeaux-profond text-blanc-casse hover:bg-bordeaux-profond/90"
        )}
      >
        {buttonText}
      </button>
    </div>
  );
}
