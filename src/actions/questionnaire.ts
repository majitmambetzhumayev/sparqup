// src/actions/questionnaire.ts
'use server';

import { Resend } from 'resend';
import { sql } from '@/lib/db';
import { questionnaireSchema } from '@/lib/questionnaire/schema';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

type QuestionnaireData = z.infer<typeof questionnaireSchema>;

export async function submitQuestionnaire(data: QuestionnaireData) {
  try {
    const validated = questionnaireSchema.parse(data);

    const leadData = {
      name: `${validated.contact.firstName} ${validated.contact.lastName}`,
      email: validated.contact.email,
      phone: validated.contact.phone || null,
      company: validated.contact.company,
      project_description: generateProjectDescription(validated),
      budget_range: getBudgetRange(validated.budget),
      source: 'questionnaire',
    };

    const result = await sql`
      INSERT INTO leads (name, email, phone, company, project_description, budget_range, source)
      VALUES (${leadData.name}, ${leadData.email}, ${leadData.phone}, ${leadData.company}, ${leadData.project_description}, ${leadData.budget_range}, ${leadData.source})
      RETURNING id, created_at
    `;

    const leadId = result[0]?.id;
    console.log('✅ Lead enregistré:', leadId);
    // ✅ Utilise ton domaine vérifié
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'contact@sparqup.fr';

    // 1️⃣ Email au visiteur
    const confirmationEmail = await resend.emails.send({
      from: fromEmail, // ✅ contact@sparqup.fr
      to: validated.contact.email, // ✅ N'importe quel email
      subject: '✓ Demande reçue — Estimation sous 24h',
      html: generateConfirmationEmail(validated),
    });

    if (confirmationEmail.error) {
      console.error('⚠️ Erreur confirmation (non-bloquant):', confirmationEmail.error);
      // ❌ NE PAS throw ici
      // L'email de notification a été envoyé, c'est le principal
    } else {
      console.log('✅ Email de confirmation envoyé');
    }

    // Continue le flow normalement
    console.log('✅ Questionnaire enregistré avec succès');
    return { success: true };

    // 2️⃣ Email à toi
    const notificationEmail = await resend.emails.send({
      from: fromEmail,
      to: process.env.RESEND_TO_EMAIL!,
      replyTo: validated.contact.email, // ✅ Pour répondre facilement
      subject: `🔔 Nouveau lead: ${validated.contact.company}`,
      html: generateNotificationEmail(validated),
    });

    if (notificationEmail.error) {
      console.error('⚠️ Erreur notification:', notificationEmail.error);
      // Continue quand même
    }

    return { success: true };
  } catch (error) {
    console.error('❌ Erreur submission:', error);
    throw new Error("Erreur lors de l'envoi. Veuillez réessayer.");
  }
}

// ============================================
// Helper pour générer description du projet
// ============================================
function generateProjectDescription(data: QuestionnaireData): string {
  const projectTypeLabels: Record<string, string> = {
    vitrine: 'Site vitrine',
    ecommerce: 'Site e-commerce',
    automatisation: 'Automatisation',
    refonte: 'Refonte de site',
    plateforme: 'Plateforme / App web',
    tech: 'Projet technique',
    conseil: 'Conseil',
  };

  let description = `Type: ${projectTypeLabels[data.projectType]}\n`;

  if (data.branch === 'tpe') {
    description += `Fonctionnalités: ${data.features.join(', ')}\n`;
    description += `Assets: ${data.assets.join(', ')}\n`;
    description += `Outils: ${data.tools.join(', ')}\n`;
    description += `Timeline: ${data.timeline}\n`;
  }

  if (data.branch === 'tech' && data.techNature) {
    description += `Nature: ${data.techNature}\n`;
  }

  if (data.branch === 'conseil' && data.conseilObjectives) {
    description += `Objectifs: ${data.conseilObjectives.join(', ')}\n`;
  }

  if (data.contact.sector) {
    description += `Secteur: ${data.contact.sector}\n`;
  }

  if (data.contact.description) {
    description += `\nDescription:\n${data.contact.description}`;
  }

  return description;
}

// ============================================
// Helper pour mapper le budget
// ============================================
type Budget =
  | '<2000'
  | '2000-5000'
  | '5000-10000'
  | '10000-20000'
  | '>20000'
  | '5000-15000'
  | '15000-30000'
  | '30000-50000'
  | '>50000'
  | '<3000'
  | '3000-10000'
  | '>10000'
  | 'tbd'
  | 'unknown'
  | null
  | undefined;

function getBudgetRange(budget: Budget): string {
  if (!budget) return 'non spécifié';

  const budgetMap: Record<string, string> = {
    '<2000': '0-2k',
    '2000-5000': '2-5k',
    '5000-10000': '5-10k',
    '10000-20000': '10-20k',
    '>20000': '20k+',
    '5000-15000': '5-15k',
    '15000-30000': '15-30k',
    '30000-50000': '30-50k',
    '>50000': '50k+',
    '<3000': '0-3k',
    '3000-10000': '3-10k',
    '>10000': '10k+',
    tbd: 'à définir',
    unknown: 'inconnu',
  };

  return budgetMap[budget] || budget;
}

// ============================================
// Templates emails
// ============================================

function generateConfirmationEmail(data: QuestionnaireData): string {
  const projectTypeLabels: Record<string, string> = {
    vitrine: 'Site vitrine',
    ecommerce: 'Site e-commerce',
    automatisation: 'Automatisation',
    refonte: 'Refonte de site',
    plateforme: 'Plateforme / App web',
    tech: 'Projet technique',
    conseil: 'Conseil',
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif; 
          line-height: 1.6; 
          color: #171717;
          background: #fafafa;
          padding: 40px 20px;
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .header {
          padding: 48px 40px 32px 40px;
          border-bottom: 1px solid #f5f5f5;
        }
        .header h1 {
          font-size: 24px;
          font-weight: 600;
          color: #171717;
          margin-bottom: 8px;
        }
        .header p {
          font-size: 15px;
          color: #737373;
        }
        .content {
          padding: 40px;
        }
        .content p {
          margin-bottom: 16px;
          font-size: 15px;
          color: #404040;
        }
        .summary {
          background: #fafafa;
          border-radius: 8px;
          padding: 20px;
          margin: 24px 0;
        }
        .summary-row {
          display: flex;
          padding: 8px 0;
          border-bottom: 1px solid #f0f0f0;
        }
        .summary-row:last-child {
          border-bottom: none;
        }
        .summary-label {
          font-size: 14px;
          color: #737373;
          min-width: 120px;
        }
        .summary-value {
          font-size: 14px;
          color: #171717;
          font-weight: 500;
        }
        .steps {
          margin: 32px 0;
        }
        .step {
          padding: 16px 0;
          border-bottom: 1px solid #f5f5f5;
        }
        .step:last-child {
          border-bottom: none;
        }
        .step-number {
          display: inline-block;
          width: 24px;
          height: 24px;
          background: #171717;
          color: white;
          border-radius: 50%;
          text-align: center;
          line-height: 24px;
          font-size: 12px;
          font-weight: 600;
          margin-right: 12px;
        }
        .step-title {
          font-size: 15px;
          font-weight: 500;
          color: #171717;
          margin-bottom: 4px;
        }
        .step-desc {
          font-size: 14px;
          color: #737373;
          margin-left: 36px;
        }
        .footer {
          padding: 32px 40px;
          text-align: center;
          border-top: 1px solid #f5f5f5;
          background: #fafafa;
        }
        .footer-brand {
          font-size: 14px;
          font-weight: 600;
          color: #171717;
          margin-bottom: 8px;
        }
        .footer-links {
          font-size: 14px;
          color: #737373;
        }
        .footer-links a {
          color: #737373;
          text-decoration: none;
        }
        @media only screen and (max-width: 600px) {
          .header { padding: 32px 24px 24px 24px; }
          .content { padding: 24px; }
          .footer { padding: 24px; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✓ Demande reçue</h1>
          <p>Merci d'avoir pris le temps de remplir le questionnaire</p>
        </div>

        <div class="content">
          <p>Bonjour ${data.contact.firstName},</p>
          
          <p>J'ai bien reçu votre demande pour un projet <strong>${projectTypeLabels[data.projectType]}</strong>.</p>

          <p>Je vais étudier votre besoin et vous envoyer une estimation personnalisée sous 24h (jours ouvrés).</p>

          <div class="summary">
            <div class="summary-row">
              <div class="summary-label">Type de projet</div>
              <div class="summary-value">${projectTypeLabels[data.projectType]}</div>
            </div>
            ${
              data.branch === 'tpe'
                ? `
              <div class="summary-row">
                <div class="summary-label">Fonctionnalités</div>
                <div class="summary-value">${data.features.length} sélectionnée(s)</div>
              </div>
              <div class="summary-row">
                <div class="summary-label">Timeline</div>
                <div class="summary-value">${getTimelineLabel(data.timeline)}</div>
              </div>
              <div class="summary-row">
                <div class="summary-label">Budget estimé</div>
                <div class="summary-value">${getBudgetLabel(data.budget)}</div>
              </div>
            `
                : ''
            }
            <div class="summary-row">
              <div class="summary-label">Entreprise</div>
              <div class="summary-value">${data.contact.company}</div>
            </div>
          </div>

          <div class="steps">
            <div class="step">
              <span class="step-number">1</span>
              <div class="step-title">Confirmation immédiate</div>
              <div class="step-desc">C'est cet email. Gardez-le précieusement.</div>
            </div>
            <div class="step">
              <span class="step-number">2</span>
              <div class="step-title">Analyse sous 24h</div>
              <div class="step-desc">J'étudie votre projet en détail.</div>
            </div>
            <div class="step">
              <span class="step-number">3</span>
              <div class="step-title">Estimation personnalisée</div>
              <div class="step-desc">Budget, timeline et stack recommandée.</div>
            </div>
            <div class="step">
              <span class="step-number">4</span>
              <div class="step-title">Échange gratuit</div>
              <div class="step-desc">30 min pour affiner ensemble si besoin.</div>
            </div>
          </div>
        </div>

        <div class="footer">
          <div class="footer-brand">SparqUp</div>
          <div class="footer-links">
            <a href="mailto:contact@sparqup.fr">contact@sparqup.fr</a> · 
            <a href="https://sparqup.fr">sparqup.fr</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateNotificationEmail(data: QuestionnaireData): string {
  const projectTypeLabels: Record<string, string> = {
    vitrine: 'Site vitrine',
    ecommerce: 'Site e-commerce',
    automatisation: 'Automatisation',
    refonte: 'Refonte',
    plateforme: 'Plateforme',
    tech: 'Projet technique',
    conseil: 'Conseil',
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
          line-height: 1.6; 
          color: #171717;
          background: #fafafa;
          padding: 40px 20px;
        }
        .container { 
          max-width: 700px; 
          margin: 0 auto; 
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .header {
          padding: 32px 32px 24px 32px;
          background: #171717;
          color: white;
        }
        .header h1 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .header p {
          font-size: 14px;
          opacity: 0.8;
        }
        .content {
          padding: 32px;
        }
        .section {
          margin-bottom: 24px;
          padding-bottom: 24px;
          border-bottom: 1px solid #f5f5f5;
        }
        .section:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }
        .section h2 {
          font-size: 14px;
          font-weight: 600;
          color: #737373;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 12px;
        }
        .row {
          display: flex;
          padding: 8px 0;
        }
        .label {
          font-size: 14px;
          color: #737373;
          min-width: 140px;
        }
        .value {
          font-size: 14px;
          color: #171717;
          font-weight: 500;
        }
        .badge {
          display: inline-block;
          padding: 4px 12px;
          background: #fef3c7;
          color: #92400e;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
        }
        .badge.urgent {
          background: #fee2e2;
          color: #991b1b;
        }
        .action {
          background: #fafafa;
          padding: 20px;
          border-radius: 8px;
          margin-top: 24px;
        }
        .action strong {
          color: #171717;
          font-size: 15px;
        }
        @media only screen and (max-width: 600px) {
          .header { padding: 24px; }
          .content { padding: 24px; }
          .row { flex-direction: column; }
          .label { margin-bottom: 4px; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔔 Nouveau lead</h1>
          <p>${data.contact.company} · ${projectTypeLabels[data.projectType]}</p>
        </div>

        <div class="content">
          <div class="section">
            <h2>Contact</h2>
            <div class="row">
              <div class="label">Nom</div>
              <div class="value">${data.contact.firstName} ${data.contact.lastName}</div>
            </div>
            <div class="row">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${data.contact.email}" style="color: #171717; text-decoration: none;">${data.contact.email}</a></div>
            </div>
            ${
              data.contact.phone
                ? `
              <div class="row">
                <div class="label">Téléphone</div>
                <div class="value">${data.contact.phone}</div>
              </div>
            `
                : ''
            }
            <div class="row">
              <div class="label">Entreprise</div>
              <div class="value">${data.contact.company}</div>
            </div>
            ${
              data.contact.sector
                ? `
              <div class="row">
                <div class="label">Secteur</div>
                <div class="value">${data.contact.sector}</div>
              </div>
            `
                : ''
            }
          </div>

          <div class="section">
            <h2>Projet</h2>
            <div class="row">
              <div class="label">Type</div>
              <div class="value">${projectTypeLabels[data.projectType]}</div>
            </div>
            <div class="row">
              <div class="label">Timeline</div>
              <div class="value">
                ${'timeline' in data ? `<tr><td>Timeline:</td><td>${data.timeline}</td></tr>` : ''}
                ${'timeline' in data ? (data.timeline === 'fast' ? '<span class="badge urgent">Urgent</span>' : '') : ''}
              </div>
            </div>
            ${
              'budget' in data
                ? `<div class="row">
              <div class="label">Budget</div>
              <div class="value">${data.budget}</div>
            </div>
          </div>`
                : ''
            }

          ${
            data.branch === 'tpe'
              ? `
            <div class="section">
              <h2>Détails</h2>
              <div class="row">
                <div class="label">Fonctionnalités</div>
                <div class="value">${data.features.length} sélectionnée(s)</div>
              </div>
              <div class="row">
                <div class="label">Assets</div>
                <div class="value">${data.assets.length > 0 ? data.assets.join(', ') : 'Aucun'}</div>
              </div>
              <div class="row">
                <div class="label">Outils</div>
                <div class="value">${data.tools.length > 0 ? data.tools.join(', ') : 'Aucun'}</div>
              </div>
            </div>
          `
              : ''
          }

          ${
            data.contact.description
              ? `
            <div class="section">
              <h2>Description</h2>
              <p style="font-size: 14px; color: #404040; line-height: 1.6;">${data.contact.description}</p>
            </div>
          `
              : ''
          }

          <div class="action">
            <strong>Action requise</strong><br>
            <span style="font-size: 14px; color: #737373;">Envoyer estimation sous 24h · Reçu le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}</span>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// ============================================
// Helpers
// ============================================

function getTimelineLabel(timeline: string | null): string {
  const labels: Record<string, string> = {
    fast: 'Le plus vite possible (< 1 mois)',
    '1-3months': 'Dans 1 à 3 mois',
    '3-6months': 'Dans 3 à 6 mois',
    flexible: 'Pas de deadline précise',
  };
  return labels[timeline || ''] || 'Non spécifié';
}

function getBudgetLabel(budget: string | null): string {
  const labels: Record<string, string> = {
    '<2000': 'Moins de 2 000 €',
    '2000-5000': '2 000 € - 5 000 €',
    '5000-10000': '5 000 € - 10 000 €',
    '10000-20000': '10 000 € - 20 000 €',
    '>20000': 'Plus de 20 000 €',
    tbd: 'À définir ensemble',
    '5000-15000': '5 000 € - 15 000 €',
    '15000-30000': '15 000 € - 30 000 €',
    '30000-50000': '30 000 € - 50 000 €',
    '>50000': 'Plus de 50 000 €',
    '<3000': 'Moins de 3 000 €',
    '3000-10000': '3 000 € - 10 000 €',
    '>10000': 'Plus de 10 000 €',
    unknown: 'Aucune idée',
  };
  return labels[budget || ''] || 'Non spécifié';
}
