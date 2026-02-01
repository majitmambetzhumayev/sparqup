// src/lib/questionnaire/constants.ts

import {
  ProjectTypeOption,
  FeatureOption,
  AssetOption,
  ToolOption,
  TimelineOption,
  BudgetOption,
  BudgetTPE,
  BudgetTech,
  BudgetConseil,
} from './types';

// ============================================
// Q1 - Types de projet
// ============================================

export const PROJECT_TYPES: ProjectTypeOption[] = [
  {
    id: 'vitrine',
    icon: '🌐',
    label: 'Site vitrine',
    description: 'Présentation de votre activité, services, contact',
    branch: 'tpe',
  },
  {
    id: 'ecommerce',
    icon: '🛒',
    label: 'Site e-commerce',
    description: 'Boutique en ligne avec paiement et gestion',
    branch: 'tpe',
  },
  {
    id: 'automatisation',
    icon: '⚙️',
    label: 'Automatisation',
    description: 'Connecter vos outils, automatiser vos process',
    branch: 'tpe',
  },
  {
    id: 'refonte',
    icon: '🔄',
    label: 'Refonte de site existant',
    description: "Amélioration ou migration d'un site actuel",
    branch: 'tpe',
  },
  {
    id: 'plateforme',
    icon: '📱',
    label: 'Plateforme / App web',
    description: 'Espace membre, réservations, outils métier',
    branch: 'tpe',
  },
  {
    id: 'tech',
    icon: '⚡',
    label: 'Projet technique avancé',
    description: 'API, SaaS, infrastructure custom',
    branch: 'tech',
  },
  {
    id: 'conseil',
    icon: '💭',
    label: 'Je ne sais pas encore',
    description: 'Besoin de conseils pour définir mon besoin',
    branch: 'conseil',
  },
];

// ============================================
// Q2 - Fonctionnalités (adaptatif)
// ============================================

export const FEATURES: Record<string, FeatureOption[]> = {
  essentials: [
    {
      id: 'contact_form',
      label: 'Formulaire de contact avancé',
      points: 2,
    },
    {
      id: 'services_portfolio',
      label: 'Présentation services / portfolio',
      points: 3,
    },
    {
      id: 'blog',
      label: 'Blog ou section actualités',
      points: 4,
    },
  ],

  vente: [
    {
      id: 'payment',
      label: 'Paiement en ligne (Stripe, PayPal)',
      description: 'Checkout sécurisé avec gestion des paiements',
      points: 8,
      requiredFor: ['ecommerce'],
    },
    {
      id: 'cart',
      label: 'Panier & checkout optimisé',
      description: 'Tunnel de vente complet',
      points: 6,
      requiredFor: ['ecommerce'],
    },
    {
      id: 'promo',
      label: 'Codes promo / abonnements',
      points: 5,
      requiredFor: ['ecommerce'],
    },
  ],

  reservation: [
    {
      id: 'booking',
      label: 'Système de réservation / RDV',
      description: 'Calendrier de réservation en ligne',
      points: 6,
    },
    {
      id: 'member_area',
      label: 'Espace client / tableau de bord',
      description: 'Connexion et gestion de compte',
      points: 10,
    },
    {
      id: 'calendar',
      label: 'Gestion planning / calendrier',
      points: 5,
    },
  ],

  automation: [
    {
      id: 'email_marketing',
      label: 'Email marketing automatisé',
      description: 'Séquences automatiques, newsletters',
      points: 5,
    },
    {
      id: 'crm_sync',
      label: 'Synchronisation CRM',
      description: 'Connexion avec votre outil CRM',
      points: 8,
    },
    {
      id: 'invoicing',
      label: 'Facturation automatique',
      points: 8,
    },
    {
      id: 'inventory',
      label: 'Gestion stocks intelligente',
      points: 7,
      requiredFor: ['ecommerce'],
    },
  ],

  advanced: [
    {
      id: 'multilang',
      label: 'Site multilingue',
      description: 'Plusieurs langues disponibles',
      points: 10,
    },
    {
      id: 'map',
      label: 'Carte interactive / géolocalisation',
      points: 4,
    },
    {
      id: 'social',
      label: 'Intégration réseaux sociaux',
      description: 'Feed Instagram, partage automatique',
      points: 3,
    },
  ],
};

// ============================================
// Q3 - Assets disponibles
// ============================================

export const ASSETS: AssetOption[] = [
  {
    id: 'logo',
    label: 'Logo et identité visuelle',
    help: 'Charte graphique, couleurs, typographie',
    scoreAdjustment: -3,
  },
  {
    id: 'content',
    label: 'Contenu rédigé (textes du site)',
    help: 'Pages principales, descriptions produits',
    scoreAdjustment: -5,
  },
  {
    id: 'photos',
    label: 'Photos ou visuels professionnels',
    help: 'Photos produits, équipe, locaux',
    scoreAdjustment: -3,
  },
  {
    id: 'domain',
    label: 'Nom de domaine réservé',
    help: 'Ex: votreentreprise.fr',
    scoreAdjustment: -1,
  },
  {
    id: 'hosting',
    label: 'Hébergement actif',
    help: 'Serveur ou plateforme existante',
    scoreAdjustment: -2,
  },
  {
    id: 'inspiration',
    label: 'Références visuelles / inspiration',
    help: 'Sites que vous aimez, moodboard',
    scoreAdjustment: -1,
  },
  {
    id: 'none',
    label: 'Rien de tout ça',
    help: 'Pas de souci, on vous accompagne de A à Z',
    scoreAdjustment: 10,
  },
];

// ============================================
// Q4 - Outils actuels
// ============================================

export const TOOLS: Record<string, ToolOption[]> = {
  communication: [
    { id: 'google', label: 'Suite Google (Gmail, Drive, Agenda)', category: 'communication' },
    { id: 'microsoft', label: 'Microsoft 365 (Outlook, OneDrive)', category: 'communication' },
  ],

  email: [
    { id: 'mailchimp', label: 'Mailchimp / Brevo / Mailerlite', category: 'email' },
    { id: 'activecampaign', label: 'ActiveCampaign / Sendinblue', category: 'email' },
  ],

  payment: [
    { id: 'stripe', label: 'Stripe / PayPal / Sumup', category: 'payment' },
    {
      id: 'invoicing',
      label: 'Logiciel de facturation (Pennylane, Freebe, Indy)',
      category: 'payment',
    },
  ],

  crm: [
    { id: 'notion', label: 'Notion / Airtable', category: 'crm' },
    { id: 'crm_pro', label: 'CRM (Pipedrive, HubSpot, Zoho)', category: 'crm' },
  ],

  automation: [
    { id: 'zapier', label: 'Zapier / Make / n8n', category: 'automation' },
    { id: 'api', label: 'Intégrations API custom', category: 'automation' },
  ],

  booking: [
    { id: 'calendly', label: 'Calendly / Cal.com', category: 'booking' },
    { id: 'booking_other', label: 'Autre outil de RDV', category: 'booking' },
  ],

  social: [
    { id: 'meta', label: 'Meta Business Suite (FB/Insta)', category: 'social' },
    { id: 'tiktok', label: 'TikTok / LinkedIn', category: 'social' },
  ],

  none: [{ id: 'none', label: "Je n'utilise aucun de ces outils", category: 'communication' }],
};

// ============================================
// Q5 - Timeline
// ============================================

export const TIMELINE_OPTIONS: TimelineOption[] = [
  {
    id: 'fast',
    label: 'Le plus vite possible (< 1 mois)',
    description: '💡 Budget estimé majoré de 20% pour priorisation',
    scoreAdjustment: 15,
  },
  {
    id: '1-3months',
    label: 'Dans 1 à 3 mois',
    description: '✓ Timeline optimale pour un projet soigné',
    scoreAdjustment: 0,
  },
  {
    id: '3-6months',
    label: 'Dans 3 à 6 mois',
    description: '✓ Idéal pour préparer tous vos assets',
    scoreAdjustment: -5,
  },
  {
    id: 'flexible',
    label: 'Pas de deadline précise',
    description: '✓ On avance à votre rythme',
    scoreAdjustment: -3,
  },
];

// ============================================
// Q5 - Budget (TPE)
// ============================================

export const BUDGET_OPTIONS_TPE: BudgetOption<BudgetTPE>[] = [
  { id: '<2000', label: 'Moins de 2 000 €' },
  { id: '2000-5000', label: '2 000 € - 5 000 €' },
  { id: '5000-10000', label: '5 000 € - 10 000 €' },
  { id: '10000-20000', label: '10 000 € - 20 000 €' },
  { id: '>20000', label: 'Plus de 20 000 €' },
  { id: 'tbd', label: 'Budget à définir ensemble' },
];

// ============================================
// Q5 - Budget (Tech)
// ============================================

export const BUDGET_OPTIONS_TECH: BudgetOption<BudgetTech>[] = [
  { id: '5000-15000', label: '5 000 € - 15 000 €' },
  { id: '15000-30000', label: '15 000 € - 30 000 €' },
  { id: '30000-50000', label: '30 000 € - 50 000 €' },
  { id: '>50000', label: 'Plus de 50 000 €' },
  { id: 'tbd', label: 'Budget à définir selon recommandations' },
];

// ============================================
// Q5 - Budget (Conseil)
// ============================================

export const BUDGET_OPTIONS_CONSEIL: BudgetOption<BudgetConseil>[] = [
  { id: '<3000', label: 'Moins de 3 000 €' },
  { id: '3000-10000', label: '3 000 € - 10 000 €' },
  { id: '>10000', label: 'Plus de 10 000 €' },
  { id: 'unknown', label: 'Aucune idée' },
];

// ============================================
// Branch Tech - Questions spécifiques
// ============================================

export const TECH_NATURE_OPTIONS = [
  {
    id: 'api',
    icon: '🔌',
    label: 'API REST / GraphQL',
    description: 'Architecture backend pour application',
  },
  {
    id: 'saas',
    icon: '⚙️',
    label: 'SaaS / Application web',
    description: 'Plateforme complète multi-utilisateurs',
  },
  {
    id: 'infra',
    icon: '🏗️',
    label: 'Infrastructure / DevOps',
    description: 'Architecture cloud, CI/CD, monitoring',
  },
  {
    id: 'migration',
    icon: '🔄',
    label: 'Migration technique',
    description: 'Refonte stack ou migration de données',
  },
  {
    id: 'integration',
    icon: '🤝',
    label: 'Intégrations complexes',
    description: 'Connexion de systèmes métier',
  },
  {
    id: 'custom',
    icon: '✍️',
    label: 'Autre projet custom',
    description: 'À détailler ensemble',
  },
];

export const TECH_STACK_OPTIONS = [
  {
    id: 'modern',
    label: 'Oui, architecture moderne en place',
    description: 'Stack récente et bien maintenue',
  },
  {
    id: 'legacy',
    label: 'Oui, système legacy à moderniser',
    description: 'Infrastructure à mettre à jour',
  },
  {
    id: 'scratch',
    label: 'Non, projet from scratch',
    description: 'Démarrage de zéro',
  },
  {
    id: 'unknown',
    label: 'Je ne sais pas (besoin de conseil)',
    description: 'Audit technique nécessaire',
  },
];

// ============================================
// Branch Conseil - Questions spécifiques
// ============================================

export const CONSEIL_OBJECTIVES = [
  { id: 'sell', label: 'Je veux vendre en ligne' },
  { id: 'visibility', label: 'Je veux être visible sur Google' },
  { id: 'automate', label: 'Je veux automatiser des tâches' },
  { id: 'crm', label: 'Je veux gérer mes clients' },
  { id: 'booking', label: 'Je veux prendre des réservations' },
  { id: 'modern', label: 'Je veux un site moderne et pro' },
  { id: 'other', label: 'Autre objectif (précisez)' },
];

export const CONSEIL_URGENCY_OPTIONS = [
  {
    id: 'urgent',
    label: 'Oui, je perds des opportunités sans ça',
    description: 'Besoin immédiat',
  },
  {
    id: 'medium',
    label: "Moyennement, mais j'aimerais avancer",
    description: 'Planification à court terme',
  },
  {
    id: 'exploring',
    label: 'Non, je me renseigne pour plus tard',
    description: 'Phase de réflexion',
  },
];

// ============================================
// Estimation - Base de prix (ajustés)
// ============================================

export const BASE_PRICES: Record<string, number> = {
  vitrine: 2500,
  ecommerce: 6000,
  automatisation: 3000,
  refonte: 4000,
  plateforme: 12000,
  tech: 20000,
  conseil: 1500,
};

export const COMPLEXITY_MULTIPLIERS = {
  simple: 0.8, // < 20 points
  normal: 1, // 20-40 points
  complex: 1.4, // 40-60 points
  veryComplex: 1.8, // > 60 points
};
