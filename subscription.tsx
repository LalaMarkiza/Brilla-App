"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { useAuth } from './auth';

// Types
type SubscriptionPlan = 'none' | 'essential' | 'premium' | 'elite';

type SubscriptionContextType = {
  currentPlan: SubscriptionPlan;
  isSubscribed: boolean;
  isPremium: boolean;
  isProcessing: boolean;
  error: string | null;
  subscribeToPlan: (plan: SubscriptionPlan) => Promise<void>;
  cancelSubscription: () => Promise<void>;
};

// Création du contexte
const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

// Hook personnalisé pour utiliser le contexte
export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription doit être utilisé à l\'intérieur d\'un SubscriptionProvider');
  }
  return context;
}

// Provider
interface SubscriptionProviderProps {
  children: ReactNode;
}

export function SubscriptionProvider({ children }: SubscriptionProviderProps) {
  const { user, isAuthenticated } = useAuth();
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan>('none');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Initialiser le plan d'abonnement en fonction de l'utilisateur
  React.useEffect(() => {
    if (user && user.subscription) {
      setCurrentPlan(user.subscription as SubscriptionPlan);
    } else {
      setCurrentPlan('none');
    }
  }, [user]);

  // S'abonner à un plan
  const subscribeToPlan = async (plan: SubscriptionPlan) => {
    if (!isAuthenticated) {
      setError('Vous devez être connecté pour vous abonner.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Simulation d'une requête API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Dans une vraie application, on ferait une requête au backend
      // pour mettre à jour l'abonnement de l'utilisateur

      // Mettre à jour l'état local
      setCurrentPlan(plan);

      // Mettre à jour les données utilisateur dans localStorage
      const storedUser = localStorage.getItem('brilla_user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        userData.subscription = plan;
        localStorage.setItem('brilla_user', JSON.stringify(userData));
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de l\'abonnement.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Annuler l'abonnement
  const cancelSubscription = async () => {
    if (!isAuthenticated) {
      setError('Vous devez être connecté pour annuler votre abonnement.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Simulation d'une requête API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Dans une vraie application, on ferait une requête au backend
      // pour annuler l'abonnement de l'utilisateur

      // Mettre à jour l'état local
      setCurrentPlan('none');

      // Mettre à jour les données utilisateur dans localStorage
      const storedUser = localStorage.getItem('brilla_user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        userData.subscription = 'none';
        localStorage.setItem('brilla_user', JSON.stringify(userData));
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de l\'annulation de l\'abonnement.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Valeurs exposées par le contexte
  const value = {
    currentPlan,
    isSubscribed: currentPlan !== 'none',
    isPremium: currentPlan === 'premium' || currentPlan === 'elite',
    isProcessing,
    error,
    subscribeToPlan,
    cancelSubscription
  };

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
}
