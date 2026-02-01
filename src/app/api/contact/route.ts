// src/app/api/contact/route.ts
import { getResend } from '@/lib/email';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 });
    }

    const resend = getResend();

    // 1️⃣ Email de NOTIFICATION
    const notificationResult = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.RESEND_TO_EMAIL!,
      replyTo: email,
      subject: `💬 Contact SparqUp: ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #0a2f1f; margin-bottom: 20px;">Nouveau message de contact</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr style="background-color: #f5f5f5;">
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: 600;">Nom</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: 600;">Email</td>
                <td style="padding: 12px; border: 1px solid #ddd;">
                  <a href="mailto:${email}" style="color: #0a2f1f;">${email}</a>
                </td>
              </tr>
              <tr style="background-color: #f5f5f5;">
                <td style="padding: 12px; border: 1px solid #ddd; font-weight: 600; vertical-align: top;">Message</td>
                <td style="padding: 12px; border: 1px solid #ddd; white-space: pre-wrap;">${message}</td>
              </tr>
            </table>
            
            <p style="color: #666; font-size: 14px;">
              💡 Clique sur "Répondre" pour répondre directement à ${name}
            </p>
          </div>
        </body>
        </html>
      `,
    });

    if (notificationResult.error) {
      console.error('❌ Erreur notification:', notificationResult.error);
      return NextResponse.json({ error: 'Erreur envoi notification' }, { status: 500 });
    }

    // 2️⃣ Email de CONFIRMATION (utilisateur)
    const confirmationResult = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject: '✓ Message reçu — SparqUp',
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            
            <div style="background: linear-gradient(135deg, #0a2f1f 0%, #1a4d33 100%); padding: 30px; border-radius: 8px; margin-bottom: 30px;">
              <h1 style="color: white; margin: 0; font-size: 24px;">✓ Message bien reçu</h1>
            </div>
            
            <p style="font-size: 16px; margin-bottom: 20px;">Bonjour ${name},</p>
            
            <p style="font-size: 16px; line-height: 1.8; margin-bottom: 20px;">
              Merci pour votre message. Je l'ai bien reçu et je vous réponds <strong>sous 24 heures</strong>.
            </p>
            
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 30px 0;">
              <p style="margin: 0 0 10px 0; color: #666; font-size: 14px; font-weight: 600;">Votre message :</p>
              <p style="margin: 0; color: #333; white-space: pre-wrap;">${message}</p>
            </div>
            
            <p style="font-size: 16px; line-height: 1.8; margin-bottom: 30px;">
              En attendant, n'hésitez pas à consulter mes <a href="https://sparqup.fr/services" style="color: #0a2f1f; text-decoration: underline;">services</a> ou mes <a href="https://sparqup.fr/realisations" style="color: #0a2f1f; text-decoration: underline;">réalisations</a>.
            </p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            
            <p style="color: #666; font-size: 14px; margin: 0;">
              <strong>Majit Morosetti</strong><br>
              Développeur Full-Stack & Expert en Automatisation<br>
              SparqUp<br>
              <a href="https://sparqup.fr" style="color: #0a2f1f;">sparqup.fr</a>
            </p>
          </div>
        </body>
        </html>
      `,
    });

    if (confirmationResult.error) {
      console.error('⚠️ Erreur confirmation (non-bloquant):', confirmationResult.error);
      // On continue quand même, la notification principale est envoyée
    }

    console.log('✅ Emails envoyés avec succès');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Erreur serveur:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
