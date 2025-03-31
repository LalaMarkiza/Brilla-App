import { createContext, useContext, useState, ReactNode } from 'react';
import { 
  NutritionPlan, 
  Recipe, 
  ActivityPlan, 
  SupplementPlan, 
  MedicalRecord, 
  HormonalProfile, 
  UserProfile, 
  ProgressTracker 
} from '@/lib/types';
import { 
  mockNutritionPlans, 
  mockRecipes, 
  mockActivityPlans, 
  mockSupplementPlans, 
  mockMedicalRecords, 
  mockHormonalProfiles, 
  mockUserProfiles, 
  mockProgressTrackers 
} from '@/lib/mockData';

// Types pour le contexte
type ContentContextType = {
  // Données
  nutritionPlans: NutritionPlan[];
  recipes: Recipe[];
  activityPlans: ActivityPlan[];
  supplementPlans: SupplementPlan[];
  medicalRecords: MedicalRecord[];
  hormonalProfiles: HormonalProfile[];
  userProfiles: UserProfile[];
  progressTrackers: ProgressTracker[];
  
  // Fonctions pour la gestion des données
  getUserNutritionPlan: (userId: string) => NutritionPlan | undefined;
  getUserActivityPlan: (userId: string) => ActivityPlan | undefined;
  getUserSupplementPlan: (userId: string) => SupplementPlan | undefined;
  getUserMedicalRecords: (userId: string) => MedicalRecord[];
  getUserHormonalProfile: (userId: string) => HormonalProfile | undefined;
  getUserProfile: (userId: string) => UserProfile | undefined;
  getUserProgressTrackers: (userId: string) => ProgressTracker[];
  
  // Fonctions pour ajouter/modifier des données
  updateUserProfile: (profile: UserProfile) => void;
  addProgressTracker: (tracker: ProgressTracker) => void;
  addMedicalRecord: (record: MedicalRecord) => void;
};

// Création du contexte
const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Hook personnalisé pour utiliser le contexte
export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent doit être utilisé à l\'intérieur d\'un ContentProvider');
  }
  return context;
}

// Provider
interface ContentProviderProps {
  children: ReactNode;
}

export function ContentProvider({ children }: ContentProviderProps) {
  // États pour les différentes données
  const [nutritionPlans, setNutritionPlans] = useState<NutritionPlan[]>(mockNutritionPlans);
  const [recipes, setRecipes] = useState<Recipe[]>(mockRecipes);
  const [activityPlans, setActivityPlans] = useState<ActivityPlan[]>(mockActivityPlans);
  const [supplementPlans, setSupplementPlans] = useState<SupplementPlan[]>(mockSupplementPlans);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>(mockMedicalRecords);
  const [hormonalProfiles, setHormonalProfiles] = useState<HormonalProfile[]>(mockHormonalProfiles);
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>(mockUserProfiles);
  const [progressTrackers, setProgressTrackers] = useState<ProgressTracker[]>(mockProgressTrackers);
  
  // Fonctions pour récupérer les données d'un utilisateur spécifique
  const getUserNutritionPlan = (userId: string) => {
    return nutritionPlans.find(plan => plan.userId === userId);
  };
  
  const getUserActivityPlan = (userId: string) => {
    return activityPlans.find(plan => plan.userId === userId);
  };
  
  const getUserSupplementPlan = (userId: string) => {
    return supplementPlans.find(plan => plan.userId === userId);
  };
  
  const getUserMedicalRecords = (userId: string) => {
    return medicalRecords.filter(record => record.userId === userId);
  };
  
  const getUserHormonalProfile = (userId: string) => {
    return hormonalProfiles.find(profile => profile.userId === userId);
  };
  
  const getUserProfile = (userId: string) => {
    return userProfiles.find(profile => profile.userId === userId);
  };
  
  const getUserProgressTrackers = (userId: string) => {
    return progressTrackers
      .filter(tracker => tracker.userId === userId)
      .sort((a, b) => b.date.getTime() - a.date.getTime()); // Tri par date décroissante
  };
  
  // Fonctions pour ajouter/modifier des données
  const updateUserProfile = (profile: UserProfile) => {
    setUserProfiles(prev => {
      const index = prev.findIndex(p => p.userId === profile.userId);
      if (index !== -1) {
        // Mise à jour d'un profil existant
        const updated = [...prev];
        updated[index] = { ...profile, updatedAt: new Date() };
        return updated;
      } else {
        // Ajout d'un nouveau profil
        return [...prev, { ...profile, createdAt: new Date(), updatedAt: new Date() }];
      }
    });
  };
  
  const addProgressTracker = (tracker: ProgressTracker) => {
    setProgressTrackers(prev => [
      ...prev,
      { ...tracker, id: Date.now().toString(), createdAt: new Date(), updatedAt: new Date() }
    ]);
  };
  
  const addMedicalRecord = (record: MedicalRecord) => {
    setMedicalRecords(prev => [
      ...prev,
      { ...record, id: Date.now().toString(), createdAt: new Date(), updatedAt: new Date() }
    ]);
  };
  
  // Valeurs exposées par le contexte
  const value = {
    nutritionPlans,
    recipes,
    activityPlans,
    supplementPlans,
    medicalRecords,
    hormonalProfiles,
    userProfiles,
    progressTrackers,
    getUserNutritionPlan,
    getUserActivityPlan,
    getUserSupplementPlan,
    getUserMedicalRecords,
    getUserHormonalProfile,
    getUserProfile,
    getUserProgressTrackers,
    updateUserProfile,
    addProgressTracker,
    addMedicalRecord
  };
  
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}
