import React from 'react';
import { useContent } from '@/lib/content';
import { useAuth } from '@/lib/auth';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export function SupplementDashboard() {
  const { user } = useAuth();
  const { getUserSupplementPlan } = useContent();
  
  // Récupérer le plan de complémentation de l'utilisateur
  const supplementPlan = user ? getUserSupplementPlan(user.id) : undefined;
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-playfair font-semibold text-bordeaux-profond mb-4">
          Votre Protocole de Complémentation
        </h2>
        <p className="text-taupe-elegant mb-6">
          Découvrez votre protocole de complémentation personnalisé pour optimiser votre santé.
        </p>
      </div>
      
      {supplementPlan ? (
        <>
          {/* Description du plan */}
          <div className="bg-premium-gradient text-blanc-casse rounded-sm p-6 shadow-premium">
            <h3 className="text-xl font-cormorant font-semibold mb-3">
              {supplementPlan.title}
            </h3>
            <p className="opacity-90 mb-6">{supplementPlan.description}</p>
          </div>
          
          {/* Compléments quotidiens */}
          <div>
            <h3 className="text-xl font-cormorant font-semibold text-bordeaux-profond mb-4">
              Compléments quotidiens
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supplementPlan.dailySupplements.map((supplement) => (
                <Card key={supplement.id}>
                  <CardHeader>
                    <CardTitle className="text-lg font-cormorant text-bordeaux-profond">
                      {supplement.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-taupe-elegant">Dosage:</span>
                        <span className="font-medium text-or-sophistique">{supplement.dosage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-taupe-elegant">Timing:</span>
                        <span className="font-medium">{supplement.timing}</span>
                      </div>
                      <div className="pt-2">
                        <p className="text-sm text-taupe-elegant mb-2">Instructions:</p>
                        <p className="text-sm">{supplement.instructions}</p>
                      </div>
                      <div className="pt-2">
                        <p className="text-sm text-taupe-elegant mb-2">Bénéfices:</p>
                        <ul className="text-sm space-y-1">
                          {supplement.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-or-sophistique mr-2">•</span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Conseils d'optimisation */}
          <div className="bg-blanc-casse border border-or-sophistique/10 rounded-sm p-6 shadow-elegant">
            <h3 className="text-xl font-cormorant font-semibold text-bordeaux-profond mb-4">
              Conseils d'optimisation
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="text-or-sophistique mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-cormorant text-base font-medium text-bordeaux-profond mb-1">
                    Respectez le timing
                  </h4>
                  <p className="text-sm text-taupe-elegant">
                    Le moment de la prise est crucial pour l'efficacité de vos compléments. Suivez scrupuleusement les indications de timing.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-or-sophistique mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-cormorant text-base font-medium text-bordeaux-profond mb-1">
                    Optimisez l'absorption
                  </h4>
                  <p className="text-sm text-taupe-elegant">
                    Certains compléments sont mieux absorbés avec de la nourriture, d'autres à jeun. Suivez les instructions spécifiques pour chaque complément.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-or-sophistique mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-cormorant text-base font-medium text-bordeaux-profond mb-1">
                    Soyez constant
                  </h4>
                  <p className="text-sm text-taupe-elegant">
                    La régularité est essentielle pour obtenir des résultats. Intégrez vos compléments dans votre routine quotidienne.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-blanc-casse border border-or-sophistique/10 rounded-sm p-8 text-center shadow-elegant">
          <h3 className="text-xl font-cormorant font-semibold text-bordeaux-profond mb-3">
            Aucun protocole de complémentation disponible
          </h3>
          <p className="text-taupe-elegant mb-6">
            Vous n'avez pas encore de protocole de complémentation personnalisé. Complétez votre profil pour recevoir des recommandations adaptées à vos besoins.
          </p>
          <button className="px-6 py-3 bg-bordeaux-profond text-blanc-casse rounded-sm hover:opacity-90 transition-colors">
            Compléter mon profil
          </button>
        </div>
      )}
    </div>
  );
}
