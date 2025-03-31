"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
type User = {
  id: string;
  name: string;
  email: string;
  subscription: 'none' | 'essential' | 'premium' | 'elite';
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isPremium: boolean;
};

// Création du contexte
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personnalisé pour utiliser le contexte
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
}

// Provider
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Dans une vraie application, on vérifierait le token JWT dans localStorage
        // et on ferait une requête API pour obtenir les données utilisateur
        const storedUser = localStorage.getItem('brilla_user');
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error('Erreur lors de la vérification de l\'authentification:', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Fonction de connexion
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulation d'une requête API
      // Dans une vraie application, on ferait une requête à l'API d'authentification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Vérification des identifiants (à remplacer par une vraie vérification)
      if (email === 'demo@brilla.com' && password === 'password') {
        const userData: User = {
          id: '1',
          name: 'Utilisateur Démo',
          email: 'demo@brilla.com',
          subscription: 'premium'
        };
        
        // Stocker l'utilisateur dans le state et localStorage
        setUser(userData);
        localStorage.setItem('brilla_user', JSON.stringify(userData));
      } else {
        throw new Error('Identifiants incorrects');
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de la connexion');
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction d'inscription
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulation d'une requête API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dans une vraie application, on enverrait les données à l'API
      const userData: User = {
        id: Date.now().toString(),
        name,
        email,
        subscription: 'none' // Par défaut, pas d'abonnement
      };
      
      // Stocker l'utilisateur dans le state et localStorage
      setUser(userData);
      localStorage.setItem('brilla_user', JSON.stringify(userData));
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de l\'inscription');
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    setUser(null);
    localStorage.removeItem('brilla_user');
  };

  // Valeurs exposées par le contexte
  const value = {
    user,
    isLoading,
    error,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    isPremium: user?.subscription !== 'none'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
