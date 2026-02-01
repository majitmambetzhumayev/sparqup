// src/lib/questionnaire/estimation.ts

import { QuestionnaireState, Estimation, StackTool } from './types';
import { calculateComplexityScore } from './scoring';
import { BASE_PRICES, COMPLEXITY_MULTIPLIERS } from './constants';

export function calculateEstimation(state: QuestionnaireState): Estimation {
  const score = calculateComplexityScore(state);

  if (!state.projectType) {
    throw new Error('Project type is required for estimation');
  }

  // ============================================
  // Budget
  // ============================================

  const basePrice = BASE_PRICES[state.projectType];

  // Multiplicateur selon complexity score
  let multiplier = COMPLEXITY_MULTIPLIERS.normal;
  if (score < 20) multiplier = COMPLEXITY_MULTIPLIERS.simple;
  else if (score < 40) multiplier = COMPLEXITY_MULTIPLIERS.normal;
  else if (score < 60) multiplier = COMPLEXITY_MULTIPLIERS.complex;
  else multiplier = COMPLEXITY_MULTIPLIERS.veryComplex;

  const minBudget = Math.round((basePrice * multiplier) / 100) * 100;
  const maxBudget = Math.round((minBudget * 1.6) / 100) * 100;

  // ============================================
  // Timeline
  // ============================================

  let weeks = 2;

  // Ajustement par type
  if (state.projectType === 'ecommerce') weeks += 2;
  if (state.projectType === 'plateforme') weeks += 3;
  if (state.projectType === 'tech') weeks += 4;
  if (state.projectType === 'refonte') weeks += 1;

  // Ajustement par assets
  if (state.assets.includes('none')) weeks += 1;
  else if (state.assets.length < 2) weeks += 1;

  // Ajustement par outils
  if (state.tools.length > 5) weeks += 1;

  // Ajustement timeline demandée
  if (state.timeline === 'fast') weeks -= 0.5;
  else if (state.timeline === '3-6months') weeks += 0.5;

  const minWeeks = Math.max(2, Math.floor(weeks));
  const maxWeeks = Math.ceil(weeks + 1);

  // ============================================
  // Stack recommandée
  // ============================================

  const stack = getRecommendedStack(state);

  // ============================================
  // Recommendations
  // ============================================

  const recommendations = generateRecommendations(state);

  // ============================================
  // Recurring costs
  // ============================================

  const recurringCosts = calculateRecurringCosts(stack);

  return {
    minBudget,
    maxBudget,
    minWeeks,
    maxWeeks,
    stack,
    recommendations,
    recurringCosts,
  };
}

function getRecommendedStack(state: QuestionnaireState): StackTool[] {
  const stack: StackTool[] = [];

  // Stack selon type de projet
  switch (state.projectType) {
    case 'vitrine':
      stack.push(
        {
          name: 'Next.js',
          category: 'Framework',
          included: true,
          description: 'Framework React moderne et performant',
        },
        {
          name: 'Vercel',
          category: 'Hébergement',
          monthlyCost: '20-50€/mois',
          included: false,
          description: 'Hébergement optimisé',
        },
        {
          name: 'Mailerlite',
          category: 'Email',
          monthlyCost: '13€/mois',
          included: false,
          description: 'Email marketing',
        }
      );
      break;

    case 'ecommerce':
      stack.push(
        {
          name: 'Shopify',
          category: 'E-commerce',
          monthlyCost: '27-79€/mois',
          included: false,
          description: 'Plateforme e-commerce complète',
        },
        {
          name: 'Stripe',
          category: 'Paiement',
          monthlyCost: '1.4% + 0.25€ par transaction',
          included: true,
          description: 'Paiement sécurisé',
        },
        {
          name: 'Klaviyo',
          category: 'Email',
          monthlyCost: '20-150€/mois',
          included: false,
          description: 'Email marketing e-commerce',
        }
      );
      break;

    case 'automatisation':
      stack.push(
        {
          name: 'Zapier',
          category: 'Automatisation',
          monthlyCost: '20-70€/mois',
          included: false,
          description: 'Automatisation no-code',
        },
        {
          name: 'Airtable',
          category: 'Base de données',
          monthlyCost: '10-20€/mois',
          included: false,
          description: 'Base de données flexible',
        },
        {
          name: 'Make',
          category: 'Automatisation',
          monthlyCost: '9-29€/mois',
          included: false,
          description: 'Alternative Zapier plus puissante',
        }
      );
      break;

    case 'plateforme':
      stack.push(
        {
          name: 'Next.js',
          category: 'Framework',
          included: true,
          description: 'Framework full-stack',
        },
        {
          name: 'Supabase',
          category: 'Backend',
          monthlyCost: '25€/mois',
          included: false,
          description: 'Base de données + Auth',
        },
        {
          name: 'Stripe',
          category: 'Paiement',
          monthlyCost: '1.4% + 0.25€',
          included: true,
          description: 'Paiement et abonnements',
        },
        {
          name: 'Resend',
          category: 'Email',
          monthlyCost: '20€/mois',
          included: false,
          description: "Envoi d'emails transactionnels",
        }
      );
      break;

    default:
      stack.push({
        name: 'Stack sur-mesure',
        category: 'Framework',
        included: true,
        description: 'À définir selon besoins',
      });
  }

  // Google Analytics (toujours)
  stack.push({
    name: 'Google Analytics',
    category: 'Analytics',
    monthlyCost: 'Gratuit',
    included: true,
    description: 'Tracking et statistiques',
  });

  return stack;
}

function generateRecommendations(state: QuestionnaireState): string[] {
  const reco: string[] = [];

  // Assets manquants
  if (state.assets.includes('none') || state.assets.length === 0) {
    reco.push(
      'Je peux vous recommander des photographes et rédacteurs partenaires pour créer vos contenus.'
    );
  }

  if (!state.assets.includes('logo')) {
    reco.push(
      "Pour votre logo, je peux vous orienter vers un designer ou utiliser de l'IA pour créer une première version."
    );
  }

  // Budget vs features
  if (state.budget === '<2000' && state.features.length > 5) {
    reco.push(
      'Avec ce budget, je recommande de prioriser 2-3 fonctionnalités essentielles pour la V1.'
    );
  }

  // Timeline vs scope
  if (state.timeline === 'fast' && state.features.length > 8) {
    reco.push(
      "Pour tenir la timeline rapide, on devra découper en 2 phases : MVP d'abord, puis fonctionnalités avancées."
    );
  }

  return reco;
}

function calculateRecurringCosts(stack: StackTool[]): string {
  const costs = stack
    .filter(tool => tool.monthlyCost && tool.monthlyCost !== 'Gratuit' && !tool.included)
    .map(tool => tool.monthlyCost);

  if (costs.length === 0) return '';

  return `Budget outils récurrents estimé : ~50-150€/mois selon options choisies`;
}
