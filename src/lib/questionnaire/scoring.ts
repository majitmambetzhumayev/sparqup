// src/lib/questionnaire/scoring.ts

import { QuestionnaireState } from './types';
import { FEATURES, ASSETS } from './constants';

export function calculateComplexityScore(state: QuestionnaireState): number {
  let score = 0;

  // ============================================
  // Base par type de projet
  // ============================================

  const baseScores: Record<string, number> = {
    vitrine: 10,
    ecommerce: 30,
    automatisation: 20,
    refonte: 15,
    plateforme: 40,
    tech: 60,
    conseil: 5,
  };

  if (state.projectType) {
    score += baseScores[state.projectType] || 10;
  }

  // ============================================
  // Points par fonctionnalité
  // ============================================

  state.features.forEach(featureId => {
    // Chercher dans toutes les catégories
    const allFeatures = [
      ...FEATURES.essentials,
      ...FEATURES.vente,
      ...FEATURES.reservation,
      ...FEATURES.automation,
      ...FEATURES.advanced,
    ];

    const feature = allFeatures.find(f => f.id === featureId);
    if (feature) {
      score += feature.points;
    } else {
      score += 2; // Default si feature inconnue
    }
  });

  // ============================================
  // Ajustements par assets
  // ============================================

  if (state.assets.includes('none')) {
    score += 10;
  } else {
    state.assets.forEach(assetId => {
      const asset = ASSETS.find(a => a.id === assetId);
      if (asset) {
        score += asset.scoreAdjustment; // Négatif = réduit le score
      }
    });
  }

  // ============================================
  // Ajustements par outils
  // ============================================

  if (state.tools.includes('none')) {
    score += 5;
  } else if (state.tools.length > 6) {
    score += 12;
  } else if (state.tools.length > 3) {
    score += 5;
  }

  // ============================================
  // Ajustements par timeline
  // ============================================

  if (state.timeline === 'fast') {
    score += 15;
  } else if (state.timeline === '3-6months') {
    score -= 5;
  } else if (state.timeline === 'flexible') {
    score -= 3;
  }

  return Math.max(0, Math.round(score));
}
