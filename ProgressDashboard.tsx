import React from 'react';
import { useContent } from '@/lib/content';
import { useAuth } from '@/lib/auth';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { ProgressTracker } from '@/lib/types';

interface ProgressChartProps {
  progressData: ProgressTracker[];
  metric: 'weight' | 'energyLevel' | 'sleepQuality' | 'moodRating';
  title: string;
  unit?: string;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ progressData, metric, title, unit = '' }) => {
  // Extraire les données pour le graphique
  const chartData = progressData.map(entry => ({
    date: new Date(entry.date).toLocaleDateString('fr-FR'),
    value: entry[metric] || 0
  })).reverse(); // Ordre chronologique

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-cormorant text-bordeaux-profond">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <div className="h-60 relative">
            {/* Axe Y */}
            <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between text-xs text-taupe-elegant">
              {[...Array(6)].map((_, i) => (
                <span key={i} className="text-right pr-2">
                  {metric === 'weight' ? Math.round(Math.max(...chartData.map(d => d.value)) - i * (Math.max(...chartData.map(d => d.value)) - Math.min(...chartData.map(d => d.value))) / 5) + unit : 10 - i * 2}
                </span>
              ))}
            </div>
            
            {/* Graphique */}
            <div className="ml-10 h-full flex items-end">
              {chartData.map((item, index) => {
                // Calculer la hauteur relative de la barre
                let heightPercentage;
                if (metric === 'weight') {
                  const min = Math.min(...chartData.map(d => d.value));
                  const max = Math.max(...chartData.map(d => d.value));
                  const range = max - min || 1; // Éviter division par zéro
                  heightPercentage = ((item.value - min) / range) * 100;
                } else {
                  heightPercentage = (item.value / 10) * 100;
                }
                
                return (
                  <div key={index} className="flex flex-col items-center mx-2 flex-1">
                    <div 
                      className="w-full bg-or-sophistique rounded-t-sm transition-all duration-300 hover:bg-bordeaux-profond"
                      style={{ height: `${heightPercentage}%` }}
                    ></div>
                    <span className="text-xs text-taupe-elegant mt-1 transform -rotate-45 origin-top-left">
                      {item.date}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <p className="text-taupe-elegant text-center py-10">Aucune donnée disponible</p>
        )}
      </CardContent>
    </Card>
  );
};

export function ProgressDashboard() {
  const { user } = useAuth();
  const { getUserProgressTrackers } = useContent();
  
  // Récupérer les données de progression de l'utilisateur
  const progressData = user ? getUserProgressTrackers(user.id) : [];
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-playfair font-semibold text-bordeaux-profond mb-4">
          Suivi de votre progression
        </h2>
        <p className="text-taupe-elegant mb-6">
          Visualisez l'évolution de vos métriques clés au fil du temps pour suivre votre transformation.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProgressChart 
          progressData={progressData} 
          metric="weight" 
          title="Évolution du poids" 
          unit="kg" 
        />
        
        <ProgressChart 
          progressData={progressData} 
          metric="energyLevel" 
          title="Niveau d'énergie" 
        />
        
        <ProgressChart 
          progressData={progressData} 
          metric="sleepQuality" 
          title="Qualité du sommeil" 
        />
        
        <ProgressChart 
          progressData={progressData} 
          metric="moodRating" 
          title="Humeur générale" 
        />
      </div>
      
      {progressData.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-cormorant font-semibold text-bordeaux-profond mb-4">
            Dernières mesures corporelles
          </h3>
          
          <div className="bg-blanc-casse border border-or-sophistique/10 rounded-sm p-6 shadow-elegant">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {progressData[0].bodyMeasurements && (
                <>
                  <div className="text-center">
                    <p className="text-taupe-elegant text-sm">Poitrine</p>
                    <p className="text-2xl font-didot text-or-sophistique">{progressData[0].bodyMeasurements.chest} cm</p>
                  </div>
                  <div className="text-center">
                    <p className="text-taupe-elegant text-sm">Taille</p>
                    <p className="text-2xl font-didot text-or-sophistique">{progressData[0].bodyMeasurements.waist} cm</p>
                  </div>
                  <div className="text-center">
                    <p className="text-taupe-elegant text-sm">Hanches</p>
                    <p className="text-2xl font-didot text-or-sophistique">{progressData[0].bodyMeasurements.hips} cm</p>
                  </div>
                  <div className="text-center">
                    <p className="text-taupe-elegant text-sm">Bras</p>
                    <p className="text-2xl font-didot text-or-sophistique">{progressData[0].bodyMeasurements.arms} cm</p>
                  </div>
                  <div className="text-center">
                    <p className="text-taupe-elegant text-sm">Cuisses</p>
                    <p className="text-2xl font-didot text-or-sophistique">{progressData[0].bodyMeasurements.thighs} cm</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
