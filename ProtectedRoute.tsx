"use client";

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requirePremium?: boolean;
}

export function ProtectedRoute({ 
  children, 
  requirePremium = false 
}: ProtectedRouteProps) {
  const { isAuthenticated, isPremium, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
      if (!isAuthenticated) {
        router.push('/login');
      } 
      // Si l'accès premium est requis mais que l'utilisateur n'a pas d'abonnement premium
      else if (requirePremium && !isPremium) {
        router.push('/pricing');
      }
    }
  }, [isAuthenticated, isPremium, isLoading, requirePremium, router]);

  // Afficher un écran de chargement pendant la vérification
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blanc-casse">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-or-sophistique border-t-transparent"></div>
          <p className="mt-4 text-taupe-elegant">Chargement...</p>
        </div>
      </div>
    );
  }

  // Si l'utilisateur n'est pas authentifié ou n'a pas d'abonnement premium (si requis),
  // ne pas afficher le contenu (la redirection sera effectuée par l'effet)
  if (!isAuthenticated || (requirePremium && !isPremium)) {
    return null;
  }

  // Si l'utilisateur est authentifié et a l'abonnement requis, afficher le contenu
  return <>{children}</>;
}
