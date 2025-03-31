"use client";

import React from 'react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blanc-casse">
      <div className="text-center p-8">
        <h1 className="font-playfair text-4xl font-semibold text-bordeaux-profond mb-4">
          404 - Page non trouvée
        </h1>
        <p className="text-taupe-elegant mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <a 
          href="/"
          className="inline-block px-6 py-3 bg-or-sophistique text-blanc-casse rounded-sm hover:bg-or-sophistique/90 transition-colors"
        >
          Retourner à l'accueil
        </a>
      </div>
    </div>
  );
}
