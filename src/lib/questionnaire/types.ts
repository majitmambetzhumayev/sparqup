// src/lib/questionnaire/types.ts

export type ProjectType =
  | 'vitrine'
  | 'ecommerce'
  | 'automatisation'
  | 'refonte'
  | 'plateforme'
  | 'tech'
  | 'conseil';

export type Branch = 'tpe' | 'tech' | 'conseil';

export type Timeline = 'fast' | '1-3months' | '3-6months' | 'flexible';

// Budget TPE
export type BudgetTPE = '<2000' | '2000-5000' | '5000-10000' | '10000-20000' | '>20000' | 'tbd';

// Budget Tech
export type BudgetTech = '5000-15000' | '15000-30000' | '30000-50000' | '>50000' | 'tbd';

// Budget Conseil
export type BudgetConseil = '<3000' | '3000-10000' | '>10000' | 'unknown';

// Union type pour le state global
export type Budget = BudgetTPE | BudgetTech | BudgetConseil;

export interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company: string;
  sector?: string;
  description?: string;
  consent: boolean;
}

export interface QuestionnaireState {
  // Q1 - Type de projet (détermine la branch)
  projectType: ProjectType | null;
  branch: Branch | null;

  // Q2-Q5 - Détails projet (adaptatif selon branch)
  features: string[];
  assets: string[];
  tools: string[];
  timeline: Timeline | null;
  budget: Budget | null;

  // Questions spécifiques branch Tech
  techNature?: string;
  techStack?: string;
  techScale?: string;
  techTeam?: string;

  // Questions spécifiques branch Conseil
  conseilObjectives?: string[];
  conseilUrgency?: string;

  // Calculé
  complexityScore: number;

  // Contact (dernière étape)
  contact: ContactData | null;

  // Meta
  currentStep: number;
  totalSteps: number;
  startedAt: Date;
  completedAt?: Date;
}

export interface Estimation {
  minBudget: number;
  maxBudget: number;
  minWeeks: number;
  maxWeeks: number;
  stack: StackTool[];
  recommendations: string[];
  recurringCosts?: string;
}

export interface StackTool {
  name: string;
  category: string;
  monthlyCost?: string;
  included: boolean;
  description: string;
}

export interface ProjectTypeOption {
  id: ProjectType;
  icon: string;
  label: string;
  description: string;
  branch: Branch;
}

export interface FeatureOption {
  id: string;
  label: string;
  description?: string;
  points: number; // Pour complexity score
  requiredFor?: ProjectType[]; // Certaines features sont spécifiques
}

export interface AssetOption {
  id: string;
  label: string;
  help?: string;
  scoreAdjustment: number; // Négatif car réduit le travail
}

export interface ToolOption {
  id: string;
  label: string;
  category: 'communication' | 'email' | 'payment' | 'crm' | 'automation' | 'booking' | 'social';
  logo?: string;
}

export interface TimelineOption {
  id: Timeline;
  label: string;
  description: string;
  scoreAdjustment: number;
}

export interface BudgetOption<T extends Budget = Budget> {
  id: T;
  label: string;
}
