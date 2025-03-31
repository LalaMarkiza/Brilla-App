import React from 'react';
import { useAuth } from '@/lib/auth';
import { useSubscription } from '@/lib/subscription';
import { Button } from '@/components/ui/Button';

export function ProfileSubscription() {
  const { user } = useAuth();
  const { currentPlan, isProcessing, error, cancelSubscription } = useSubscription();
  
  // Formater le nom du plan
  const getPlanName = () => {
    switch (currentPlan) {
      case 'essential':
        return 'Essentiel';
      case 'premium':
        return 'Premium';
      case 'elite':
        return 'Élite';
      default:
        return 'Aucun abonnement';
    }
  };
  
  // Formater le prix du plan
  const getPlanPrice = () => {
    switch (currentPlan) {
      case 'essential':
        return '29,99€/mois';
      case 'premium':
        return '59,99€/mois';
      case 'elite':
        return '99,99€/mois';
      default:
        return '0€/mois';
    }
  };
  
  // Gérer l'annulation de l'abonnement
  const handleCancelSubscription = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir annuler votre abonnement ? Vous perdrez l\'accès aux fonctionnalités premium.')) {
      await cancelSubscription();
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-playfair font-semibold text-bordeaux-profond mb-4">
          Votre Abonnement
        </h2>
        <p className="text-taupe-elegant mb-6">
          Gérez votre abonnement BRILLA et accédez à l'historique de vos paiements.
        </p>
      </div>
      
      {error && (
        <div className="bg-bordeaux-profond/10 border border-bordeaux-profond/20 text-bordeaux-profond p-4 rounded-sm mb-6">
          {error}
        </div>
      )}
      
      <div className="bg-premium-gradient text-blanc-casse rounded-sm p-6 shadow-premium">
        <h3 className="text-xl font-cormorant font-semibold mb-3">
          Statut de l'abonnement
        </h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Plan actuel:</span>
            <span className="font-didot text-xl">{getPlanName()}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span>Prix:</span>
            <span>{getPlanPrice()}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span>Statut:</span>
            <span className="bg-blanc-casse/20 px-3 py-1 rounded-sm text-sm">
              {currentPlan === 'none' ? 'Inactif' : 'Actif'}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span>Prochain prélèvement:</span>
            <span>
              {currentPlan === 'none' 
                ? 'N/A' 
                : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR')}
            </span>
          </div>
        </div>
        
        <div className="mt-6 flex justify-between">
          {currentPlan === 'none' ? (
            <Button 
              variant="secondary" 
              asChild
            >
              <a href="/pricing">Choisir un abonnement</a>
            </Button>
          ) : (
            <>
              <Button 
                variant="secondary" 
                asChild
              >
                <a href="/pricing">Changer de formule</a>
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleCancelSubscription}
                disabled={isProcessing}
              >
                {isProcessing ? 'Traitement...' : 'Annuler l\'abonnement'}
              </Button>
            </>
          )}
        </div>
      </div>
      
      {currentPlan !== 'none' && (
        <div className="bg-blanc-casse border border-or-sophistique/10 rounded-sm p-6 shadow-elegant">
          <h3 className="text-xl font-cormorant font-semibold text-bordeaux-profond mb-4">
            Historique des paiements
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-taupe-elegant/20">
                  <th className="text-left py-3 px-4 font-cormorant font-medium text-taupe-elegant">Date</th>
                  <th className="text-left py-3 px-4 font-cormorant font-medium text-taupe-elegant">Description</th>
                  <th className="text-right py-3 px-4 font-cormorant font-medium text-taupe-elegant">Montant</th>
                  <th className="text-right py-3 px-4 font-cormorant font-medium text-taupe-elegant">Statut</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-taupe-elegant/10">
                  <td className="py-3 px-4 text-taupe-elegant">
                    {new Date().toLocaleDateString('fr-FR')}
                  </td>
                  <td className="py-3 px-4 text-taupe-elegant">
                    Abonnement {getPlanName()}
                  </td>
                  <td className="py-3 px-4 text-right text-taupe-elegant">
                    {getPlanPrice().split('/')[0]}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="bg-or-sophistique/20 text-or-sophistique px-2 py-1 rounded-sm text-xs">
                      Payé
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
