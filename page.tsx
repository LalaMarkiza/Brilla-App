"use client";

import React from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { TestSuite } from '@/components/testing/TestSuite';
import { useAuth } from '@/lib/auth';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function Tests() {
  const { user, logout } = useAuth();

  // Données de navigation
  const menuItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Tableau de bord', href: '/dashboard', isPremium: true },
    { label: 'Tests', href: '/tests', isPremium: true },
  ];

  return (
    <ProtectedRoute requirePremium={true}>
      <main className="min-h-screen bg-blanc-casse">
        {/* Navigation */}
        <Navbar 
          menuItems={menuItems} 
          rightContent={
            <div className="flex items-center space-x-4">
              <span className="text-taupe-elegant">
                Bonjour, {user?.name}
              </span>
              <button 
                onClick={logout}
                className="text-sm px-3 py-1 border border-taupe-elegant text-taupe-elegant rounded-sm hover:bg-taupe-elegant hover:text-blanc-casse transition-colors"
              >
                Déconnexion
              </button>
            </div>
          }
        />

        {/* Contenu principal */}
        <div className="container mx-auto py-12 px-6">
          <TestSuite />
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </ProtectedRoute>
  );
}
