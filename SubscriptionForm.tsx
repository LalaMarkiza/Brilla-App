import React, { useState } from 'react';
import { PricingPlan } from './PricingPlan';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/auth';

interface SubscriptionFormProps {
  onSubscriptionComplete: (plan: string) => void;
}

export function SubscriptionForm({ onSubscriptionComplete }: SubscriptionFormProps) {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [paymentStep, setPaymentStep] = useState<'select_plan' | 'payment_details' | 'processing' | 'complete'>('select_plan');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Plans d'abonnement
  const plans = [
    {
      id: 'essential',
      title: 'Essentiel',
      price: '29,99€',
      period: '/mois',
      description: 'L\'essentiel pour commencer votre transformation',
      features: [
        'Profil personnalisé',
        'Recommandations nutritionnelles de base',
        'Suivi d\'activité physique',
        'Accès à la communauté',
        'Support par email'
      ],
      buttonText: 'Choisir Essentiel',
      isPopular: false
    },
    {
      id: 'premium',
      title: 'Premium',
      price: '59,99€',
      period: '/mois',
      description: 'L\'expérience complète pour une transformation optimale',
      features: [
        'Tout ce qui est inclus dans Essentiel',
        'Protocoles nutritionnels avancés',
        'Orchestration de compléments',
        'Programme d\'activité personnalisé',
        'Suivi médical et post-opératoire',
        'Optimisation hormonale',
        'Support prioritaire 7j/7'
      ],
      buttonText: 'Choisir Premium',
      isPopular: true
    },
    {
      id: 'elite',
      title: 'Élite',
      price: '99,99€',
      period: '/mois',
      description: 'L\'excellence absolue avec accompagnement personnalisé',
      features: [
        'Tout ce qui est inclus dans Premium',
        'Consultations vidéo mensuelles',
        'Ajustements hebdomadaires personnalisés',
        'Accès aux masterclasses exclusives',
        'Protocoles sur mesure',
        'Conciergerie numérique dédiée',
        'Accès anticipé aux nouvelles fonctionnalités'
      ],
      buttonText: 'Choisir Élite',
      isPopular: false
    }
  ];

  // Sélectionner un plan
  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  // Passer à l'étape suivante
  const handleContinue = () => {
    if (!selectedPlan) {
      setError('Veuillez sélectionner un plan d\'abonnement.');
      return;
    }
    
    setError(null);
    setPaymentStep('payment_details');
  };

  // Gérer les changements dans le formulaire de paiement
  const handlePaymentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({ ...prev, [name]: value }));
  };

  // Traiter le paiement
  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation basique
    if (!paymentDetails.cardNumber || !paymentDetails.cardName || !paymentDetails.expiryDate || !paymentDetails.cvv) {
      setError('Veuillez remplir tous les champs de paiement.');
      return;
    }
    
    setError(null);
    setIsLoading(true);
    setPaymentStep('processing');
    
    try {
      // Simulation d'une requête API de paiement
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simuler un succès
      setPaymentStep('complete');
      
      // Notifier le parent que l'abonnement est terminé
      onSubscriptionComplete(selectedPlan!);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors du traitement du paiement.');
      setPaymentStep('payment_details');
    } finally {
      setIsLoading(false);
    }
  };

  // Rendu en fonction de l'étape
  const renderContent = () => {
    switch (paymentStep) {
      case 'select_plan':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="font-playfair text-3xl font-semibold text-bordeaux-profond mb-4">
                Choisissez votre formule d'excellence
              </h2>
              <p className="text-taupe-elegant max-w-2xl mx-auto">
                Sélectionnez la formule qui correspond le mieux à vos besoins pour commencer votre transformation avec BRILLA.
              </p>
            </div>
            
            {error && (
              <div className="bg-bordeaux-profond/10 border border-bordeaux-profond/20 text-bordeaux-profond p-4 rounded-sm mb-6">
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <PricingPlan
                  key={plan.id}
                  title={plan.title}
                  price={plan.price}
                  period={plan.period}
                  description={plan.description}
                  features={plan.features}
                  buttonText={plan.buttonText}
                  onSelect={() => handleSelectPlan(plan.id)}
                  isPopular={plan.isPopular}
                  isSelected={selectedPlan === plan.id}
                />
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <Button 
                onClick={handleContinue}
                disabled={!selectedPlan}
                className="px-8 py-3"
              >
                Continuer
              </Button>
            </div>
          </div>
        );
        
      case 'payment_details':
        return (
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-playfair text-3xl font-semibold text-bordeaux-profond mb-4">
                Informations de paiement
              </h2>
              <p className="text-taupe-elegant">
                Vous avez choisi la formule <span className="font-semibold text-or-sophistique">
                  {plans.find(p => p.id === selectedPlan)?.title}
                </span> à {plans.find(p => p.id === selectedPlan)?.price}{plans.find(p => p.id === selectedPlan)?.period}.
              </p>
            </div>
            
            {error && (
              <div className="bg-bordeaux-profond/10 border border-bordeaux-profond/20 text-bordeaux-profond p-4 rounded-sm mb-6">
                {error}
              </div>
            )}
            
            <form onSubmit={handleProcessPayment} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-taupe-elegant font-cormorant text-sm font-medium mb-1">
                    Numéro de carte
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={paymentDetails.cardNumber}
                    onChange={handlePaymentInputChange}
                    className="w-full bg-blanc-casse border-b-2 border-taupe-elegant px-4 py-2 focus:outline-none focus:border-or-sophistique transition-all duration-300"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-taupe-elegant font-cormorant text-sm font-medium mb-1">
                    Nom sur la carte
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    placeholder="John Doe"
                    value={paymentDetails.cardName}
                    onChange={handlePaymentInputChange}
                    className="w-full bg-blanc-casse border-b-2 border-taupe-elegant px-4 py-2 focus:outline-none focus:border-or-sophistique transition-all duration-300"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-taupe-elegant font-cormorant text-sm font-medium mb-1">
                      Date d'expiration
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/AA"
                      value={paymentDetails.expiryDate}
                      onChange={handlePaymentInputChange}
                      className="w-full bg-blanc-casse border-b-2 border-taupe-elegant px-4 py-2 focus:outline-none focus:border-or-sophistique transition-all duration-300"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-taupe-elegant font-cormorant text-sm font-medium mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      placeholder="123"
                      value={paymentDetails.cvv}
                      onChange={handlePaymentInputChange}
                      className="w-full bg-blanc-casse border-b-2 border-taupe-elegant px-4 py-2 focus:outline-none focus:border-or-sophistique transition-all duration-300"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-8">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => setPaymentStep('select_plan')}
                >
                  Retour
                </Button>
                
                <Button 
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Traitement en cours...' : 'Confirmer le paiement'}
                </Button>
              </div>
            </form>
          </div>
        );
        
      case 'processing':
        return (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-or-sophistique border-t-transparent mb-4"></div>
            <h2 className="font-playfair text-2xl font-semibold text-bordeaux-profond mb-2">
              Traitement de votre paiement
            </h2>
            <p className="text-taupe-elegant">
              Veuillez patienter pendant que nous traitons votre paiement...
            </p>
          </div>
        );
        
      case 'complete':
        return (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-or-sophistique text-blanc-casse mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-playfair text-3xl font-semibold text-bordeaux-profond mb-4">
              Félicitations !
            </h2>
            <p className="text-taupe-elegant max-w-md mx-auto mb-8">
              Votre abonnement à la formule <span className="font-semibold text-or-sophistique">
                {plans.find(p => p.id === selectedPlan)?.title}
              </span> a été activé avec succès. Vous avez maintenant accès à toutes les fonctionnalités premium de BRILLA.
            </p>
            <Button 
              onClick={() => window.location.href = '/dashboard'}
              className="px-8 py-3"
            >
              Accéder à mon tableau de bord
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="bg-blanc-casse p-8 rounded-sm shadow-elegant">
      {renderContent()}
    </div>
  );
}
