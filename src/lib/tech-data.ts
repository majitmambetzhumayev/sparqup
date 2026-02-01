// src/lib/tech-data.ts
export interface Tech {
  name: string;
  logo: string;
  width?: number; // Largeur custom en px (optionnel)
}

export const DEFAULT_LOGO_WIDTH = 120; // Largeur par défaut

export const TECHS: Tech[] = [
  { name: 'Airtable', logo: '/media/logos/tech/airtable-logo.png', width: 50 },
  { name: 'React', logo: '/media/logos/tech/react-logo.png', width: 50 },
  { name: 'Shopify', logo: '/media/logos/tech/shopify-logo.png', width: 50 },
  { name: 'WordPress', logo: '/media/logos/tech/wordpress-color-logo.png', width: 50 },
  { name: 'Wix', logo: '/media/logos/tech/wix-logo.png', width: 70 },
  { name: 'Mailchimp', logo: '/media/logos/tech/mailchimp-logo.png', width: 50 },
  { name: 'Notion', logo: '/media/logos/tech/notion-logo.png', width: 50 },
  { name: 'Zapier', logo: '/media/logos/tech/zapier-logo.png', width: 100 },
  { name: 'Stripe', logo: '/media/logos/tech/stripe-logo.png', width: 100 },
  { name: 'PayPal', logo: '/media/logos/tech/paypal-logo.png', width: 50 },
  { name: 'Figma', logo: '/media/logos/tech/figma-logo.png', width: 50 },
  { name: 'Google Analytics', logo: '/media/logos/tech/google-analytics-logo.png', width: 50 },
  { name: 'Google Tag Manager', logo: '/media/logos/tech/google-tag-manager-logo.png', width: 50 },
  { name: 'Make.com', logo: '/media/logos/tech/make-logo.png', width: 100 },
  { name: 'Meta', logo: '/media/logos/tech/meta-logo.png', width: 50 },
  { name: 'Django', logo: '/media/logos/tech/django-icon-logo.png', width: 50 },
];
