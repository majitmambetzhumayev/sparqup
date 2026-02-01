// src/lib/services-data.ts
import { Code2, Zap, PenLine, Link2, Rocket, CloudCheck, LucideIcon } from 'lucide-react';
import DigitalisationSVGSolution from '@/components/services/DigitalisationSVG_solutions';
import { ComponentType } from 'react';

export interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  text_focus_color: string;
  description: string;
  color: string;
  bg_color: string;
  CTA: string | null;
  showTopGradient?: boolean;
  SVG?: ComponentType<{ instanceId?: string }>;
  // Détails pour page services
  includes: string[];
  technologies: string[];
  pricing: string;
  duration: string;
  idealFor: string;
  examples: string[];
  imageConfig?: {
    border?: boolean;
    shadow?: boolean;
    rounded?: boolean;
    objectFit?: 'cover' | 'contain';
    aspectRatio?: '4/3' | '3/4' | '16/9' | '1/1' | 'auto';
  };
}

export const SERVICES: Service[] = [
  {
    id: 'creation-web',
    icon: Code2,
    title: 'Création de sites web',
    subtitle: 'Vitrine, e-commerce, application',
    text_focus_color: 'text-white',
    description:
      "Votre site = votre commercial 24/7. Design qui rassure, tunnel qui convertit.|Pas de template générique : chaque élément est pensé pour VOTRE métier et VOS clients. On conçoit un site qui vend pendant que vous dormez, pas une vitrine qui prend la poussière. Design adapté à votre cible, tunnel de conversion optimisé, performance maximale. Que ce soit un site vitrine, une boutique e-commerce ou une plateforme métier, l'objectif est clair : transformer vos visiteurs en clients.",
    color: 'from-sky-600 via-sky-800 to-slate-700',
    bg_color: 'bg-gradient-to-r from-sky-800 via-sky-900 to-slate-800 backdrop-blur-lg',
    CTA: null,
    includes: [
      'Design sur-mesure pensé pour votre activité',
      'Site responsive (mobile, tablette, desktop)',
      'Performance optimale (Google PageSpeed >90)',
      'SEO intégré dès la conception',
      'Formulaires de contact avec notifications',
      'Formation complète à la gestion du contenu',
      'Support technique 3 mois',
    ],
    technologies: [
      'Wordpress',
      'Wix',
      'Squarespace',
      'Django',
      'Next.js',
      'React',
      'Tailwind CSS',
      'Vercel',
      'Shopify (e-commerce)',
    ],
    pricing: '2 500€ - 12 000€',
    duration: '3-8 semaines',
    idealFor: 'TPE, artisans, commerçants, consultants cherchant une présence web qui convertit',
    examples: [
      'Site vitrine pro avec tunnel de conversion',
      'Boutique e-commerce clé en main',
      'Plateforme de réservation en ligne',
      "Site multilingue pour l'international",
    ],
    imageConfig: {
      border: false,
      shadow: false,
      rounded: false,
      objectFit: 'contain',
      aspectRatio: '1/1',
    },
    showTopGradient: true,
  },
  {
    id: 'automatisation',
    icon: Zap,
    title: 'Automatisation',
    subtitle: 'Process, workflows, gains de temps',
    text_focus_color: 'text-white',
    description:
      "Récupérez 5 à 10h par semaine. Vos tâches répétitives tournent en arrière-plan : facturation, relances, gestion commandes.|Stop aux tâches répétitives qui vous bouffent votre temps. J'identifie ce qui peut être automatisé dans votre quotidien et je mets en place les workflows adaptés. Vos clients reçoivent leurs réponses instantanément, vos factures partent automatiquement, vos relances se font toutes seules. Résultat concret : vous vous concentrez sur ce qui compte vraiment pendant que le reste tourne sans vous.",
    color: 'from-orange-600 via-orange-500 to-red-500',
    bg_color: 'bg-gradient-to-r from-orange-900 via-orange-900 to-red-900 backdrop-blur-lg',
    CTA: null,
    includes: [
      'Audit complet de vos process actuels',
      'Identification des tâches automatisables',
      'Mise en place de 3 à 10 automatisations',
      'Formation à la gestion des workflows',
      'Documentation technique complète',
      'Support 1 mois post-lancement',
      'Ajustements inclus pendant 30 jours',
    ],
    technologies: ['Zapier', 'Make', 'n8n', 'Webhooks', 'API REST', 'Airtable', 'Notion'],
    pricing: '1 500€ - 5 000€',
    duration: '2-4 semaines',
    idealFor: 'Entrepreneurs débordés, agences, e-commerçants avec process manuels chronophages',
    examples: [
      'Nouveau client → création auto fiche CRM + email bienvenue',
      'Commande e-commerce → facture auto + notification compta',
      'Formulaire site → création task Notion + alerte Slack',
      'Relances clients automatiques selon statut paiement',
    ],
    imageConfig: {
      border: true,
      shadow: true,
      rounded: true,
      objectFit: 'contain',
      aspectRatio: '16/9',
    },
    showTopGradient: false,
  },
  {
    id: 'contenu',
    icon: PenLine,
    title: 'Production de contenu',
    subtitle: 'Texte, visuels, vidéos',
    text_focus_color: 'text-white',
    description:
      "Un mois de contenu social media produit en 3 jours. Posts, visuels, vidéos : tout prêt à publier.|Votre calendrier éditorial se remplit automatiquement. J'utilise l'IA et mes compétences pour produire un volume que vous n'auriez jamais le temps de créer seul. Fiches produits SEO, posts Instagram/LinkedIn, stories, vidéos Reels... Vous validez, j'ajuste, vous publiez. Templates réutilisables fournis pour que vous puissiez continuer en autonomie.",
    color: 'from-orange-600 via-orange-500 to-red-500',
    bg_color: 'bg-gradient-to-r from-orange-900 via-orange-800 to-red-800 backdrop-blur-lg',
    CTA: null,
    includes: [
      'Audit de votre ligne éditoriale actuelle',
      'Calendrier éditorial 1 mois',
      '20 à 40 posts réseaux sociaux (texte + visuel)',
      '5 à 10 fiches produits optimisées SEO',
      '3 à 5 vidéos courtes (15-60 sec)',
      'Templates réutilisables fournis',
      '2 aller-retours de modifications inclus',
    ],
    technologies: ['Nanobanana', 'Claude AI', 'Davinci Resolve', 'CapCut', 'Canva Pro', 'Figma'],
    pricing: '800€ - 2 500€',
    duration: '1-2 semaines',
    idealFor: 'E-commerçants, marques, agences sans équipe contenu interne',
    examples: [
      'Pack 30 posts Instagram + visuels pour e-shop mode',
      '20 fiches produits SEO pour boutique bio',
      '10 vidéos courtes produits pour TikTok/Reels',
      'Emails marketing pour lancement produit (séquence complète)',
    ],
    imageConfig: {
      border: false,
      shadow: false,
      rounded: false,
      objectFit: 'contain',
      aspectRatio: '4/3',
    },
    showTopGradient: false,
  },
  {
    id: 'connexion-outils',
    icon: Link2,
    title: "Connexion d'outils",
    subtitle: 'CRM, paiement, email, calendrier',
    text_focus_color: 'text-white',
    description:
      "Arrêtez de ressaisir vos données 3 fois. Vos outils communiquent entre eux : un événement déclenche toute la chaîne.|Vous perdez du temps à copier-coller entre vos outils ? Je les connecte pour qu'ils parlent entre eux. Site web, CRM, emails, compta, calendrier... Un seul événement déclenche toute une chaîne automatique. Un client achète → fiche créée auto dans votre CRM → email de bienvenue envoyé → vous êtes notifié. Fini la ressaisie, place à la productivité.",
    color: 'from-teal-500 via-teal-700 to-teal-800',
    bg_color: 'bg-gradient-to-r from-teal-800 via-teal-900 to-slate-900 backdrop-blur-lg',
    CTA: null,
    includes: [
      'Audit de votre écosystème digital actuel',
      'Connexion de 3 à 8 outils entre eux',
      'Synchronisation bidirectionnelle des données',
      'Webhooks et API custom si nécessaire',
      'Documentation des flux créés',
      'Formation à la gestion des intégrations',
      'Support technique 1 mois',
    ],
    technologies: ['Zapier', 'Make', 'API REST', 'Webhooks', 'OAuth', 'Stripe', 'Mailchimp'],
    pricing: '1 200€ - 4 000€',
    duration: '2-3 semaines',
    idealFor: 'Entreprises avec multiples outils isolés, ressaisie manuelle fréquente',
    examples: [
      'Shopify → Pennylane (sync commandes + factures auto)',
      'Typeform → Notion + Gmail (lead capture + notif)',
      'Calendly → Google Calendar + Zoom (rdv auto créés)',
      'Stripe → Slack + CRM (notif paiement + création client)',
    ],
    imageConfig: {
      border: false,
      shadow: false,
      rounded: false,
      objectFit: 'contain',
      aspectRatio: '1/1',
    },
    showTopGradient: false,
  },
  {
    id: 'digitalisation',
    icon: Rocket,
    title: 'Digitalisation complète',
    subtitle: 'De zéro à un système qui tourne',
    text_focus_color: 'text-white',
    description:
      "Passez du tout manuel au tout automatisé en 6 à 12 semaines. Site, CRM, process : un système complet qui tourne sans vous.|Vous êtes encore en mode 100% manuel ? Je vous accompagne dans votre transformation digitale complète. Audit de l'existant, recommandations stack adaptée, mise en place site + CRM + outils + automatisations, formation équipe. Vous repartez autonome avec un système complet et documenté. Plus de Post-it qui traînent, plus de fichiers Excel partagés par email, plus de process qui dépendent d'une seule personne.",
    color: 'from-purple-500 to-violet-800',
    bg_color: 'bg-gradient-to-r from-blue-900 via-violet-900 to-purple-900 backdrop-blur-lg',
    CTA: null,
    includes: [
      'Audit complet de votre situation actuelle',
      'Recommandations stack adaptée à votre budget',
      'Site web professionnel (vitrine ou e-commerce)',
      'Mise en place CRM et outils essentiels',
      '5 à 10 automatisations clés',
      'Formation complète de votre équipe (2-4h)',
      'Documentation exhaustive de votre système',
      'Support privilégié 3 mois',
    ],
    technologies: ['Next.js', 'Shopify', 'HubSpot/Pipedrive', 'Zapier', 'Mailchimp', 'Notion'],
    pricing: '8 000€ - 20 000€',
    duration: '6-12 semaines',
    idealFor: 'TPE en croissance, artisans se digitalisant, commerces passant au digital',
    examples: [
      'Artisan sans site → Site + CRM + facturation auto',
      'Commerce physique → E-commerce + gestion stock',
      'Consultant solo → Site + tunnel + automatisations admin',
      'Agence en croissance → Système complet client + projet',
    ],
    imageConfig: {
      border: false,
      shadow: false,
      rounded: false,
      objectFit: 'contain',
      aspectRatio: '4/3',
    },
    showTopGradient: false,
    SVG: DigitalisationSVGSolution,
  },
  {
    id: 'projet-technique',
    icon: CloudCheck,
    title: 'Projets techniques sur-mesure',
    subtitle: 'API, SaaS, solutions custom',
    text_focus_color: 'text-white',
    description:
      'Votre SaaS, API ou plateforme custom développée avec une stack moderne. Architecture scalable, code maintenable, déploiement automatisé.|Votre projet nécessite une architecture complexe ? Backend robuste, API métier, plateforme SaaS multi-tenant, marketplace... Je développe votre solution technique de A à Z avec une stack moderne et scalable. Architecture pensée pour évoluer, code maintenable et documenté, tests automatisés, CI/CD configuré, monitoring en place. Vous avez une vraie base technique pro, pas du bricolage.',
    color: 'from-slate-500 to-slate-800',
    bg_color: 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 backdrop-blur-lg',
    CTA: 'Discuter de mon projet technique',
    includes: [
      'Cadrage technique détaillé',
      'Architecture backend scalable',
      'API REST documentée (Swagger/OpenAPI)',
      'Base de données optimisée',
      'Authentification et autorisation',
      "Tests unitaires et d'intégration",
      'CI/CD et déploiement automatisé',
      'Monitoring et alertes',
      'Documentation technique complète',
      'Maintenance 6 mois offerte',
    ],
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Supabase', 'Docker', 'Vercel', 'AWS'],
    pricing: 'Sur devis (>15 000€)',
    duration: '8-20 semaines',
    idealFor: 'Startups tech, projets SaaS, plateformes métier complexes, scale-ups',
    examples: [
      'Plateforme SaaS multi-tenant avec abonnements',
      'Marketplace avec système de paiement fractionné',
      'API métier pour application mobile',
      'Espace membre avec gestion de droits avancée',
    ],
    showTopGradient: false,
  },
];
