import { NutritionPlan, Recipe, ActivityPlan, SupplementPlan, MedicalRecord, HormonalProfile, UserProfile, ProgressTracker } from '@/lib/types';

// Données fictives pour les plans nutritionnels
export const mockNutritionPlans: NutritionPlan[] = [
  {
    id: '1',
    userId: '1',
    title: 'Plan Nutritionnel Premium',
    description: 'Un plan nutritionnel personnalisé pour optimiser votre santé et votre bien-être.',
    dailyMenus: [
      {
        id: 'd1',
        day: 'Lundi',
        meals: [
          {
            id: 'm1',
            type: 'breakfast',
            title: 'Smoothie Énergisant',
            description: 'Smoothie riche en nutriments avec fruits, légumes verts et protéines.',
            recipeId: 'r1',
            nutritionalInfo: {
              calories: 350,
              proteins: 20,
              carbs: 45,
              fats: 10
            }
          },
          {
            id: 'm2',
            type: 'lunch',
            title: 'Bowl Méditerranéen',
            description: 'Bowl équilibré avec quinoa, légumes grillés et protéines maigres.',
            recipeId: 'r2',
            nutritionalInfo: {
              calories: 550,
              proteins: 30,
              carbs: 60,
              fats: 20
            }
          },
          {
            id: 'm3',
            type: 'dinner',
            title: 'Saumon et Légumes Vapeur',
            description: 'Saumon grillé accompagné de légumes de saison cuits à la vapeur.',
            recipeId: 'r3',
            nutritionalInfo: {
              calories: 450,
              proteins: 35,
              carbs: 25,
              fats: 25
            }
          }
        ]
      },
      {
        id: 'd2',
        day: 'Mardi',
        meals: [
          {
            id: 'm4',
            type: 'breakfast',
            title: 'Porridge aux Fruits Rouges',
            description: 'Porridge d\'avoine avec fruits rouges, amandes et miel.',
            recipeId: 'r4',
            nutritionalInfo: {
              calories: 380,
              proteins: 15,
              carbs: 60,
              fats: 8
            }
          },
          {
            id: 'm5',
            type: 'lunch',
            title: 'Salade Complète',
            description: 'Salade riche en nutriments avec légumes, graines et protéines.',
            recipeId: 'r5',
            nutritionalInfo: {
              calories: 480,
              proteins: 25,
              carbs: 40,
              fats: 22
            }
          },
          {
            id: 'm6',
            type: 'dinner',
            title: 'Poulet aux Herbes',
            description: 'Poulet rôti aux herbes fraîches avec légumes racines.',
            recipeId: 'r6',
            nutritionalInfo: {
              calories: 520,
              proteins: 40,
              carbs: 30,
              fats: 20
            }
          }
        ]
      }
    ],
    createdAt: new Date('2025-03-15'),
    updatedAt: new Date('2025-03-15')
  }
];

// Données fictives pour les recettes
export const mockRecipes: Recipe[] = [
  {
    id: 'r1',
    title: 'Smoothie Énergisant',
    description: 'Un smoothie riche en nutriments pour bien commencer la journée.',
    ingredients: [
      '1 banane',
      '1 poignée d\'épinards',
      '1 cuillère à soupe de beurre d\'amande',
      '1 cuillère à soupe de graines de chia',
      '250ml de lait d\'amande',
      '1 cuillère à soupe de protéine en poudre (optionnel)'
    ],
    instructions: [
      'Placer tous les ingrédients dans un blender.',
      'Mixer jusqu\'à obtenir une consistance lisse.',
      'Servir immédiatement.'
    ],
    preparationTime: 5,
    cookingTime: 0,
    servings: 1,
    difficulty: 'easy',
    tags: ['petit-déjeuner', 'végétarien', 'sans gluten'],
    nutritionalInfo: {
      calories: 350,
      proteins: 20,
      carbs: 45,
      fats: 10
    },
    imageUrl: '/images/recipes/smoothie.jpg',
    createdAt: new Date('2025-03-10'),
    updatedAt: new Date('2025-03-10')
  },
  {
    id: 'r2',
    title: 'Bowl Méditerranéen',
    description: 'Un bowl équilibré inspiré du régime méditerranéen.',
    ingredients: [
      '100g de quinoa',
      '150g de pois chiches cuits',
      '1 concombre',
      '10 tomates cerises',
      '50g de feta',
      '10 olives noires',
      '1 cuillère à soupe d\'huile d\'olive',
      'Jus d\'un demi-citron',
      'Sel et poivre'
    ],
    instructions: [
      'Cuire le quinoa selon les instructions du paquet.',
      'Couper le concombre et les tomates cerises en morceaux.',
      'Dans un bol, disposer le quinoa, les pois chiches, les légumes, la feta et les olives.',
      'Arroser d\'huile d\'olive et de jus de citron.',
      'Assaisonner avec sel et poivre.'
    ],
    preparationTime: 15,
    cookingTime: 15,
    servings: 1,
    difficulty: 'easy',
    tags: ['déjeuner', 'végétarien', 'méditerranéen'],
    nutritionalInfo: {
      calories: 550,
      proteins: 30,
      carbs: 60,
      fats: 20
    },
    imageUrl: '/images/recipes/mediterranean-bowl.jpg',
    createdAt: new Date('2025-03-10'),
    updatedAt: new Date('2025-03-10')
  }
];

// Données fictives pour les plans d'activité
export const mockActivityPlans: ActivityPlan[] = [
  {
    id: '1',
    userId: '1',
    title: 'Programme d\'Activité Régénérative',
    description: 'Un programme d\'exercices adapté à votre condition physique et à vos objectifs.',
    weeklyWorkouts: [
      {
        id: 'w1',
        day: 'Lundi',
        title: 'Mobilité et Étirements',
        description: 'Séance douce pour améliorer la mobilité et réduire les tensions.',
        duration: 30,
        intensity: 'low',
        exercises: [
          {
            id: 'e1',
            name: 'Étirement des hanches',
            description: 'Position du pigeon pour ouvrir les hanches.',
            sets: 1,
            reps: 60,
            restTime: 0,
            imageUrl: '/images/exercises/hip-stretch.jpg'
          },
          {
            id: 'e2',
            name: 'Mobilité des épaules',
            description: 'Rotations des épaules pour améliorer l\'amplitude de mouvement.',
            sets: 2,
            reps: 10,
            restTime: 30,
            imageUrl: '/images/exercises/shoulder-mobility.jpg'
          }
        ]
      },
      {
        id: 'w2',
        day: 'Mercredi',
        title: 'Renforcement du Core',
        description: 'Séance ciblée pour renforcer les muscles profonds du tronc.',
        duration: 45,
        intensity: 'medium',
        exercises: [
          {
            id: 'e3',
            name: 'Planche',
            description: 'Maintenir la position de planche en engageant le core.',
            sets: 3,
            reps: 30,
            restTime: 60,
            imageUrl: '/images/exercises/plank.jpg'
          },
          {
            id: 'e4',
            name: 'Dead bug',
            description: 'Exercice de stabilisation du core en position allongée.',
            sets: 3,
            reps: 12,
            restTime: 45,
            imageUrl: '/images/exercises/dead-bug.jpg'
          }
        ]
      }
    ],
    createdAt: new Date('2025-03-15'),
    updatedAt: new Date('2025-03-15')
  }
];

// Données fictives pour les plans de complémentation
export const mockSupplementPlans: SupplementPlan[] = [
  {
    id: '1',
    userId: '1',
    title: 'Protocole de Complémentation Synergique',
    description: 'Un protocole personnalisé pour optimiser votre santé avec des compléments ciblés.',
    dailySupplements: [
      {
        id: 's1',
        name: 'Collagène Marin',
        dosage: '10g',
        timing: 'Matin, à jeun',
        instructions: 'Dissoudre dans un verre d\'eau ou de jus.',
        benefits: ['Santé de la peau', 'Articulations', 'Cheveux et ongles']
      },
      {
        id: 's2',
        name: 'Complexe Magnésium',
        dosage: '300mg',
        timing: 'Soir, avant le coucher',
        instructions: 'Prendre avec un verre d\'eau.',
        benefits: ['Relaxation musculaire', 'Qualité du sommeil', 'Fonction nerveuse']
      },
      {
        id: 's3',
        name: 'Vitamine D3 + K2',
        dosage: '2000 UI / 100mcg',
        timing: 'Matin, avec le petit-déjeuner',
        instructions: 'Prendre avec un repas contenant des graisses pour une meilleure absorption.',
        benefits: ['Santé osseuse', 'Immunité', 'Santé cardiovasculaire']
      }
    ],
    createdAt: new Date('2025-03-15'),
    updatedAt: new Date('2025-03-15')
  }
];

// Données fictives pour les dossiers médicaux
export const mockMedicalRecords: MedicalRecord[] = [
  {
    id: '1',
    userId: '1',
    date: new Date('2025-03-20'),
    symptoms: ['Fatigue légère', 'Tension musculaire'],
    painLevel: 2,
    notes: 'Légère amélioration par rapport à la semaine dernière. Les exercices de mobilité semblent aider.',
    createdAt: new Date('2025-03-20'),
    updatedAt: new Date('2025-03-20')
  }
];

// Données fictives pour les profils hormonaux
export const mockHormonalProfiles: HormonalProfile[] = [
  {
    id: '1',
    userId: '1',
    cycleLength: 28,
    currentPhase: 'follicular',
    phaseStartDate: new Date('2025-03-18'),
    symptoms: ['Énergie élevée', 'Humeur stable'],
    notes: 'Phase idéale pour l\'entraînement de haute intensité et les projets créatifs.',
    createdAt: new Date('2025-03-18'),
    updatedAt: new Date('2025-03-18')
  }
];

// Données fictives pour les profils utilisateur
export const mockUserProfiles: UserProfile[] = [
  {
    id: '1',
    userId: '1',
    age: 35,
    height: 170,
    weight: 65,
    goals: ['Perte de poids', 'Amélioration de l\'énergie', 'Qualité du sommeil'],
    dietaryPreferences: ['Pescatarian', 'Sans gluten'],
    allergies: ['Arachides'],
    medicalConditions: ['Hypothyroïdie légère'],
    activityLevel: 'moderate',
    createdAt: new Date('2025-03-15'),
    updatedAt: new Date('2025-03-15')
  }
];

// Données fictives pour le suivi des progrès
export const mockProgressTrackers: ProgressTracker[] = [
  {
    id: '1',
    userId: '1',
    date: new Date('2025-03-15'),
    weight: 65,
    bodyMeasurements: {
      chest: 90,
      waist: 75,
      hips: 95,
      arms: 28,
      thighs: 55
    },
    energyLevel: 7,
    sleepQuality: 8,
    moodRating: 7,
    notes: 'Bonne journée globalement. Énergie stable tout au long de la journée.',
    createdAt: new Date('2025-03-15'),
    updatedAt: new Date('2025-03-15')
  },
  {
    id: '2',
    userId: '1',
    date: new Date('2025-03-22'),
    weight: 64.5,
    bodyMeasurements: {
      chest: 90,
      waist: 74,
      hips: 94,
      arms: 28.5,
      thighs: 54.5
    },
    energyLevel: 8,
    sleepQuality: 8,
    moodRating: 8,
    notes: 'Amélioration notable de l\'énergie et légère perte de poids.',
    createdAt: new Date('2025-03-22'),
    updatedAt: new Date('2025-03-22')
  }
];
