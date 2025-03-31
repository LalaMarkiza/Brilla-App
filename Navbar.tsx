import React from 'react';
import { cn } from '@/lib/utils';

interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  menuItems?: {
    label: string;
    href: string;
    isPremium?: boolean;
  }[];
  rightContent?: React.ReactNode;
}

export function Navbar({ 
  className, 
  logo, 
  menuItems = [], 
  rightContent,
  ...props 
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav
      className={cn(
        "bg-blanc-casse border-b border-or-sophistique/10 py-4 px-6 md:px-12",
        className
      )}
      {...props}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          {logo || (
            <span className="text-2xl font-playfair font-bold text-bordeaux-profond">
              BRILLA
            </span>
          )}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={cn(
                "font-cormorant text-lg transition-colors hover:text-bordeaux-profond",
                item.isPremium 
                  ? "text-or-sophistique font-semibold" 
                  : "text-taupe-elegant"
              )}
            >
              {item.label}
              {item.isPremium && (
                <span className="ml-1 text-xs bg-or-brillant text-blanc-casse px-1.5 py-0.5 rounded-sm">
                  PREMIUM
                </span>
              )}
            </a>
          ))}
        </div>

        {/* Right Content (Auth buttons, etc) */}
        <div className="hidden md:block">
          {rightContent}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-taupe-elegant"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute left-0 right-0 bg-blanc-casse border-b border-or-sophistique/10 px-6 py-4 shadow-elegant z-50">
          <div className="flex flex-col space-y-4">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={cn(
                  "font-cormorant text-lg transition-colors hover:text-bordeaux-profond",
                  item.isPremium 
                    ? "text-or-sophistique font-semibold" 
                    : "text-taupe-elegant"
                )}
              >
                {item.label}
                {item.isPremium && (
                  <span className="ml-1 text-xs bg-or-brillant text-blanc-casse px-1.5 py-0.5 rounded-sm">
                    PREMIUM
                  </span>
                )}
              </a>
            ))}
            <div className="pt-2">
              {rightContent}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
