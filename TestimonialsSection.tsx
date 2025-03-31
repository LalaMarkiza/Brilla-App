import React from 'react';
import { cn } from '@/lib/utils';

interface TestimonialsProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  subtitle: string;
  description?: string;
  testimonials: {
    content: string;
    author: string;
    role?: string;
    avatar?: string;
  }[];
}

export function TestimonialsSection({
  className,
  title,
  subtitle,
  description,
  testimonials,
  ...props
}: TestimonialsProps) {
  return (
    <section
      className={cn(
        "py-16 md:py-24 px-6 md:px-12 bg-sable-dore/10",
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
        
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-blanc-casse border border-or-sophistique/10 rounded-sm p-8 shadow-elegant hover:shadow-premium transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="text-or-sophistique/30 mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="48" 
                  height="48" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/>
                </svg>
              </div>
              
              {/* Testimonial Content */}
              <p className="text-taupe-elegant mb-6 italic">
                "{testimonial.content}"
              </p>
              
              {/* Author Info */}
              <div className="flex items-center">
                {testimonial.avatar && (
                  <div className="mr-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full object-cover border-2 border-or-sophistique/20" 
                    />
                  </div>
                )}
                <div>
                  <h4 className="font-cormorant text-lg font-semibold text-bordeaux-profond">
                    {testimonial.author}
                  </h4>
                  {testimonial.role && (
                    <p className="text-sm text-or-sophistique">
                      {testimonial.role}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
