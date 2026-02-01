// data/cv-data.ts
import type { CVData } from '@/types/cv';

export const cvData: CVData = {
  personal: {
    name: 'Majit Mambetzhumayev',
    title: 'Développeur Web Full Stack',
    email: 'contact@sparqup.fr',
    phone: '+33 6 30 92 87 39',
    location: 'Bordeaux, France',
    website: 'sparqup.fr',
    github: 'https://github.com/majitmambetzhumayev',
    linkedin: 'https://www.linkedin.com/in/majit-mambetzhumayev-95b4273a7/',
  },
  summary:
    "Développeur web full stack orienté front, autodidacte, avec une forte appétence produit et automatisation. Habitué à travailler sans cadre académique classique, je compense par une capacité d'apprentissage rapide, une approche pragmatique et une mise en production régulière de projets réels.",
  experience: [
    {
      company: 'Projets freelance & produits web',
      position: 'Développeur Web Full Stack',
      period: '2023 - Présent',
      description: [
        'Plateforme de génération de leads : questionnaire interactif avec backend Next.js pour traitement et automatisation vers Notion',
        'E-commerce Umaï : customisation Shopify avec Liquid, optimisation parcours utilisateur',
        'E-learning Faceplastie : migration LMS complexe avec préservation données de +2000 utilisateurs',
        "API REST d'ingestion de leads depuis plateformes externes (Malt, Codeur.com)",
      ],
    },
    {
      company: 'Missions multi-clients',
      position: 'Consultant Designer 3D',
      period: '2018 - 2025',
      description: [
        'Interaction directe clients avec jalons structurés et points de décision',
        'Projets industriels complexes pour grands comptes',
        'Documentation technique et preuves de concept',
        'Collaboration pluridisciplinaire avec standards stricts',
      ],
    },
  ],
  skills: {
    technical: [
      'Next.js (App Router, API Routes)',
      'React',
      'TypeScript',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Tailwind CSS',
      'REST APIs',
    ],
    tools: [
      'Vercel',
      'Git/GitHub',
      'Shopify',
      'LearnWorlds',
      'Notion API',
      'Resend',
      'Stripe',
      'Zapier',
      'Make',
    ],
    languages: ['Français (natif)', 'Anglais (professionnel)'],
  },
  education: [
    {
      degree: 'Parcours autodidacte en développement web',
      school: 'Documentation officielle, projets réels, mise en production',
      period: '2023 - Présent',
    },
    {
      degree: 'Baccalauréat S',
      school: 'Lycée René Cassin - Oslo',
      period: '2014',
    },
  ],
  projects: [
    {
      name: 'Plateforme de génération de leads',
      description:
        'Site vitrine avec questionnaire interactif pour estimation de projets. Backend Next.js avec automatisation vers Notion.',
      tech: ['Next.js', 'TypeScript', 'Notion API', 'Vercel'],
    },
    {
      name: 'Umaï E-commerce',
      description:
        'Plateforme e-commerce Shopify avec customisation Liquid et optimisation parcours utilisateur.',
      tech: ['Shopify', 'Liquid', 'JavaScript', 'APIs tierces'],
    },
    {
      name: 'Faceplastie E-learning',
      description:
        'Migration LMS complexe avec préservation des données de +2000 inscrits sur LearnWorlds.',
      tech: ['LearnWorlds', 'Intégrations API', 'Migration de données'],
    },
  ],
};
