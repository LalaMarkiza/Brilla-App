import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type: 'login' | 'signup';
  onSubmit: (data: any) => void;
  isLoading?: boolean;
  error?: string;
}

export function AuthForm({
  className,
  type,
  onSubmit,
  isLoading = false,
  error,
  ...props
}: AuthFormProps) {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div
      className={cn(
        "w-full max-w-md mx-auto p-8 rounded-sm bg-blanc-casse shadow-elegant border border-or-sophistique/10",
        className
      )}
      {...props}
    >
      <div className="text-center mb-8">
        <h2 className="font-playfair text-3xl font-semibold text-bordeaux-profond mb-2">
          {type === 'login' ? 'Connexion' : 'Créer un compte'}
        </h2>
        <p className="text-taupe-elegant">
          {type === 'login' 
            ? 'Accédez à votre espace personnel BRILLA' 
            : 'Rejoignez BRILLA et commencez votre transformation'}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-bordeaux-profond/10 border border-bordeaux-profond/20 rounded-sm text-bordeaux-profond text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {type === 'signup' && (
          <Input
            label="Nom complet"
            type="text"
            name="name"
            placeholder="Votre nom complet"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}

        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="votre@email.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Input
          label="Mot de passe"
          type="password"
          name="password"
          placeholder={type === 'login' ? 'Votre mot de passe' : 'Créez un mot de passe'}
          value={formData.password}
          onChange={handleChange}
          required
        />

        {type === 'signup' && (
          <Input
            label="Confirmer le mot de passe"
            type="password"
            name="confirmPassword"
            placeholder="Confirmez votre mot de passe"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blanc-casse" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Chargement...
            </span>
          ) : (
            type === 'login' ? 'Se connecter' : 'Créer un compte'
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-taupe-elegant">
          {type === 'login' ? (
            <>
              Pas encore de compte ?{' '}
              <a href="/signup" className="text-or-sophistique hover:underline">
                Créer un compte
              </a>
            </>
          ) : (
            <>
              Déjà un compte ?{' '}
              <a href="/login" className="text-or-sophistique hover:underline">
                Se connecter
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
