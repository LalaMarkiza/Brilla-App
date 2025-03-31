import React from 'react';
import { useContent } from '@/lib/content';
import { useAuth } from '@/lib/auth';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export function NutritionDashboard() {
  const { user } = useAuth();
  const { getUserNutritionPlan, recipes } = useContent();
  
  // Récupérer le plan nutritionnel de l'utilisateur
  const nutritionPlan = user ? getUserNutritionPlan(user.id) : undefined;
  
  // Obtenir le jour actuel de la semaine en français
  const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long' });
  const capitalizedToday = today.charAt(0).toUpperCase() + today.slice(1);
  
  // Trouver le menu du jour
  const todayMenu = nutritionPlan?.dailyMenus.find(menu => 
    menu.day.toLowerCase() === capitalizedToday.toLowerCase()
  );
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-playfair font-semibold text-bordeaux-profond mb-4">
          Votre Plan Nutritionnel
        </h2>
        <p className="text-taupe-elegant mb-6">
          Découvrez vos recommandations nutritionnelles personnalisées et vos recettes du jour.
        </p>
      </div>
      
      {nutritionPlan ? (
        <>
          {/* Menu du jour */}
          <div className="bg-premium-gradient text-blanc-casse rounded-sm p-6 shadow-premium">
            <h3 className="text-xl font-cormorant font-semibold mb-4">
              Menu du jour - {capitalizedToday}
            </h3>
            
            {todayMenu ? (
              <div className="space-y-6">
                {todayMenu.meals.map((meal) => (
                  <div key={meal.id} className="bg-blanc-casse/10 p-4 rounded-sm">
                    <h4 className="font-cormorant text-lg font-medium mb-2">
                      {meal.type === 'breakfast' ? 'Petit-déjeuner' : 
                       meal.type === 'lunch' ? 'Déjeuner' : 
                       meal.type === 'dinner' ? 'Dîner' : 'Collation'}
                    </h4>
                    <p className="text-lg font-playfair mb-1">{meal.title}</p>
                    <p className="text-sm opacity-90 mb-3">{meal.description}</p>
                    
                    <div className="flex justify-between text-sm">
                      <span>Calories: {meal.nutritionalInfo.calories} kcal</span>
                      <span>Protéines: {meal.nutritionalInfo.proteins}g</span>
                      <span>Glucides: {meal.nutritionalInfo.carbs}g</span>
                      <span>Lipides: {meal.nutritionalInfo.fats}g</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Aucun menu disponible pour aujourd'hui.</p>
            )}
          </div>
          
          {/* Recettes recommandées */}
          <div>
            <h3 className="text-xl font-cormorant font-semibold text-bordeaux-profond mb-4">
              Recettes Recommandées
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.slice(0, 3).map((recipe) => (
                <Card key={recipe.id}>
                  <CardHeader>
                    <CardTitle className="text-lg font-cormorant text-bordeaux-profond">
                      {recipe.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-taupe-elegant text-sm mb-3">{recipe.description}</p>
                    <div className="flex justify-between text-xs text-taupe-elegant mb-4">
                      <span>Préparation: {recipe.preparationTime} min</span>
                      <span>Cuisson: {recipe.cookingTime} min</span>
                      <span>Difficulté: {
                        recipe.difficulty === 'easy' ? 'Facile' : 
                        recipe.difficulty === 'medium' ? 'Moyen' : 'Difficile'
                      }</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {recipe.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-sable-dore/30 text-taupe-elegant px-2 py-1 rounded-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="w-full text-center py-2 text-sm border border-or-sophistique text-or-sophistique hover:bg-or-sophistique hover:text-blanc-casse transition-colors rounded-sm">
                      Voir la recette
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-blanc-casse border border-or-sophistique/10 rounded-sm p-8 text-center shadow-elegant">
          <h3 className="text-xl font-cormorant font-semibold text-bordeaux-profond mb-3">
            Aucun plan nutritionnel disponible
          </h3>
          <p className="text-taupe-elegant mb-6">
            Vous n'avez pas encore de plan nutritionnel personnalisé. Complétez votre profil pour recevoir des recommandations adaptées à vos besoins.
          </p>
          <button className="px-6 py-3 bg-bordeaux-profond text-blanc-casse rounded-sm hover:opacity-90 transition-colors">
            Compléter mon profil
          </button>
        </div>
      )}
    </div>
  );
}
