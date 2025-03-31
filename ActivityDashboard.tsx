import React from 'react';
import { useContent } from '@/lib/content';
import { useAuth } from '@/lib/auth';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export function ActivityDashboard() {
  const { user } = useAuth();
  const { getUserActivityPlan } = useContent();
  
  // Récupérer le plan d'activité de l'utilisateur
  const activityPlan = user ? getUserActivityPlan(user.id) : undefined;
  
  // Obtenir le jour actuel de la semaine en français
  const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long' });
  const capitalizedToday = today.charAt(0).toUpperCase() + today.slice(1);
  
  // Trouver l'entraînement du jour
  const todayWorkout = activityPlan?.weeklyWorkouts.find(workout => 
    workout.day.toLowerCase() === capitalizedToday.toLowerCase()
  );
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-playfair font-semibold text-bordeaux-profond mb-4">
          Votre Programme d'Activité
        </h2>
        <p className="text-taupe-elegant mb-6">
          Découvrez votre programme d'exercices personnalisé pour optimiser votre santé et votre bien-être.
        </p>
      </div>
      
      {activityPlan ? (
        <>
          {/* Entraînement du jour */}
          <div className="bg-premium-gradient text-blanc-casse rounded-sm p-6 shadow-premium">
            <h3 className="text-xl font-cormorant font-semibold mb-4">
              Entraînement du jour - {capitalizedToday}
            </h3>
            
            {todayWorkout ? (
              <div className="space-y-6">
                <div className="bg-blanc-casse/10 p-4 rounded-sm">
                  <h4 className="font-cormorant text-lg font-medium mb-2">
                    {todayWorkout.title}
                  </h4>
                  <p className="text-sm opacity-90 mb-3">{todayWorkout.description}</p>
                  
                  <div className="flex justify-between text-sm mb-4">
                    <span>Durée: {todayWorkout.duration} min</span>
                    <span>Intensité: {
                      todayWorkout.intensity === 'low' ? 'Faible' : 
                      todayWorkout.intensity === 'medium' ? 'Moyenne' : 'Élevée'
                    }</span>
                  </div>
                  
                  <h5 className="font-cormorant text-base font-medium mb-3">Exercices:</h5>
                  <div className="space-y-4">
                    {todayWorkout.exercises.map((exercise) => (
                      <div key={exercise.id} className="bg-blanc-casse/5 p-3 rounded-sm">
                        <h6 className="font-medium mb-1">{exercise.name}</h6>
                        <p className="text-sm opacity-90 mb-2">{exercise.description}</p>
                        <div className="flex justify-between text-xs">
                          <span>{exercise.sets} séries</span>
                          <span>{exercise.reps} répétitions</span>
                          <span>Repos: {exercise.restTime} sec</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-blanc-casse/10 p-4 rounded-sm">
                <h4 className="font-cormorant text-lg font-medium mb-2">
                  Jour de repos
                </h4>
                <p className="text-sm opacity-90">
                  Aujourd'hui est un jour de repos dans votre programme. Profitez-en pour vous détendre et récupérer.
                </p>
              </div>
            )}
          </div>
          
          {/* Programme hebdomadaire */}
          <div>
            <h3 className="text-xl font-cormorant font-semibold text-bordeaux-profond mb-4">
              Aperçu de votre semaine
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map((day) => {
                const workout = activityPlan.weeklyWorkouts.find(w => 
                  w.day.toLowerCase() === day.toLowerCase()
                );
                
                return (
                  <Card key={day} className={day === capitalizedToday ? 'border-2 border-or-sophistique' : ''}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-cormorant text-bordeaux-profond">
                        {day}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {workout ? (
                        <>
                          <p className="font-medium text-or-sophistique mb-1">{workout.title}</p>
                          <p className="text-xs text-taupe-elegant mb-2">
                            {workout.duration} min • Intensité {
                              workout.intensity === 'low' ? 'Faible' : 
                              workout.intensity === 'medium' ? 'Moyenne' : 'Élevée'
                            }
                          </p>
                          <p className="text-xs text-taupe-elegant line-clamp-2">
                            {workout.exercises.length} exercices
                          </p>
                        </>
                      ) : (
                        <p className="text-sm text-taupe-elegant">Repos</p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-blanc-casse border border-or-sophistique/10 rounded-sm p-8 text-center shadow-elegant">
          <h3 className="text-xl font-cormorant font-semibold text-bordeaux-profond mb-3">
            Aucun programme d'activité disponible
          </h3>
          <p className="text-taupe-elegant mb-6">
            Vous n'avez pas encore de programme d'activité personnalisé. Complétez votre profil pour recevoir des recommandations adaptées à vos besoins.
          </p>
          <button className="px-6 py-3 bg-bordeaux-profond text-blanc-casse rounded-sm hover:opacity-90 transition-colors">
            Compléter mon profil
          </button>
        </div>
      )}
    </div>
  );
}
