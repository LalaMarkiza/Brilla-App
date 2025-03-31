// Types pour les modèles de données
export type NutritionPlan = {
  id: string;
  userId: string;
  title: string;
  description: string;
  dailyMenus: DailyMenu[];
  createdAt: Date;
  updatedAt: Date;
};

export type DailyMenu = {
  id: string;
  day: string; // e.g., "Lundi", "Mardi", etc.
  meals: Meal[];
};

export type Meal = {
  id: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  title: string;
  description: string;
  recipeId?: string;
  nutritionalInfo: {
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
  };
};

export type Recipe = {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  preparationTime: number;
  cookingTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  nutritionalInfo: {
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
  };
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ActivityPlan = {
  id: string;
  userId: string;
  title: string;
  description: string;
  weeklyWorkouts: Workout[];
  createdAt: Date;
  updatedAt: Date;
};

export type Workout = {
  id: string;
  day: string;
  title: string;
  description: string;
  duration: number;
  intensity: 'low' | 'medium' | 'high';
  exercises: Exercise[];
};

export type Exercise = {
  id: string;
  name: string;
  description: string;
  sets: number;
  reps: number;
  restTime: number;
  videoUrl?: string;
  imageUrl?: string;
};

export type SupplementPlan = {
  id: string;
  userId: string;
  title: string;
  description: string;
  dailySupplements: DailySupplement[];
  createdAt: Date;
  updatedAt: Date;
};

export type DailySupplement = {
  id: string;
  name: string;
  dosage: string;
  timing: string;
  instructions: string;
  benefits: string[];
};

export type MedicalRecord = {
  id: string;
  userId: string;
  date: Date;
  symptoms: string[];
  painLevel: number;
  notes: string;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type HormonalProfile = {
  id: string;
  userId: string;
  cycleLength: number;
  currentPhase: 'follicular' | 'ovulatory' | 'luteal' | 'menstrual';
  phaseStartDate: Date;
  symptoms: string[];
  notes: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserProfile = {
  id: string;
  userId: string;
  age: number;
  height: number;
  weight: number;
  goals: string[];
  dietaryPreferences: string[];
  allergies: string[];
  medicalConditions: string[];
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  createdAt: Date;
  updatedAt: Date;
};

export type ProgressTracker = {
  id: string;
  userId: string;
  date: Date;
  weight?: number;
  bodyMeasurements?: {
    chest: number;
    waist: number;
    hips: number;
    arms: number;
    thighs: number;
  };
  energyLevel?: number;
  sleepQuality?: number;
  moodRating?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Subscription = {
  id: string;
  userId: string;
  plan: 'essential' | 'premium' | 'elite';
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
  paymentMethod: string;
  amount: number;
  status: 'active' | 'cancelled' | 'expired';
  createdAt: Date;
  updatedAt: Date;
};
