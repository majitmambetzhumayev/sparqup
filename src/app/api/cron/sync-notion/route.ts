import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import { sql } from '@/lib/db';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET(request: Request) {
  try {
    // 🔒 Sécurité : Vérifie le secret
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Récupère les leads non synchronisés (max 20 par run)
    const leads = await sql`
      SELECT * FROM leads 
      WHERE synced_to_notion = false 
      ORDER BY created_at DESC 
      LIMIT 20
    `;

    let synced = 0;
    const errors: Array<{ leadId: string; error: string }> = [];

    for (const lead of leads) {
      try {
        await notion.pages.create({
          parent: { database_id: process.env.NOTION_DATABASE_ID! },
          properties: {
            Name: {
              title: [{ text: { content: lead.name || 'Sans nom' } }],
            },
            Email: {
              email: lead.email,
            },
            Phone: {
              phone_number: lead.phone || '',
            },
            Company: {
              rich_text: [{ text: { content: lead.company || '' } }],
            },
            Message: {
              rich_text: [{ text: { content: lead.message || '' } }],
            },
            Budget: {
              select: { name: lead.budget || 'unknown' },
            },
            Source: {
              select: { name: lead.source || 'unknown' },
            },
            Status: {
              status: { name: lead.status || 'new' },
            },
          },
        });

        // Marque comme synchronisé
        await sql`
          UPDATE leads 
          SET synced_to_notion = true 
          WHERE id = ${lead.id}
        `;

        synced++;

        // Rate limit protection: ~3 req/sec
        await new Promise(resolve => setTimeout(resolve, 350));
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        console.error(`Error syncing lead ${lead.id}:`, error);
        errors.push({ leadId: lead.id, error: error.message });

        // Stop si rate limited
        if ('code' in error && (error as { code?: string }).code === 'rate_limited') {
          console.log('⚠️ Rate limited, stopping sync');
          break;
        }
      }
    }

    return NextResponse.json({
      success: true,
      synced,
      total: leads.length,
      errors: errors.length > 0 ? errors : undefined,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error('Notion sync error:', err);
    return NextResponse.json(
      {
        error: err.message,
      },
      { status: 500 }
    );
  }
}
