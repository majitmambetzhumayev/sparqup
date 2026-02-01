// src/lib/questionnaire/schema.ts

import { z } from 'zod';

export const contactSchema = z.object({
  firstName: z.string().min(2, 'Prénom requis (minimum 2 caractères)'),
  lastName: z.string().min(2, 'Nom requis (minimum 2 caractères)'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  company: z.string().min(2, "Nom de l'entreprise requis"),
  sector: z.string().optional(),
  description: z.string().max(1000, 'Description trop longue (max 1000 caractères)').optional(),
  consent: z.boolean().refine(val => val === true, {
    message: "Vous devez accepter d'être recontacté pour continuer",
  }),
});

export const questionnaireSchemaTPE = z.object({
  projectType: z.enum(['vitrine', 'ecommerce', 'automatisation', 'refonte', 'plateforme']),
  branch: z.literal('tpe'),
  features: z.array(z.string()).min(1, 'Sélectionnez au moins une fonctionnalité'),
  assets: z.array(z.string()),
  tools: z.array(z.string()),
  timeline: z.enum(['fast', '1-3months', '3-6months', 'flexible']),
  budget: z.enum(['<2000', '2000-5000', '5000-10000', '10000-20000', '>20000', 'tbd']),
  contact: contactSchema,
});

export const questionnaireSchematech = z.object({
  projectType: z.literal('tech'),
  branch: z.literal('tech'),
  techNature: z.string().min(1, 'Sélectionnez le type de projet technique'),
  techStack: z.string().optional(),
  techScale: z.string().optional(),
  techTeam: z.string().optional(),
  budget: z.enum(['5000-15000', '15000-30000', '30000-50000', '>50000', 'tbd']),
  contact: contactSchema,
});

export const questionnaireSchemaconseil = z.object({
  projectType: z.literal('conseil'),
  branch: z.literal('conseil'),
  conseilObjectives: z.array(z.string()).min(1, 'Sélectionnez au moins un objectif'),
  conseilUrgency: z.string().optional(),
  budget: z.enum(['<3000', '3000-10000', '>10000', 'unknown']).nullable().optional(),
  contact: contactSchema,
});

export const questionnaireSchema = z.discriminatedUnion('branch', [
  questionnaireSchemaTPE,
  questionnaireSchematech,
  questionnaireSchemaconseil,
]);

export type QuestionnaireFormData = z.infer<typeof questionnaireSchema>;
