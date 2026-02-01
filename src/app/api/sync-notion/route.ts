// app/api/sync-notion/route.ts
import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import { sql } from '@/lib/db';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function POST() {
  try {
    // Récupère les leads non synchronisés
    const leads = await sql`
      SELECT * FROM leads 
      WHERE synced_to_notion = false 
      ORDER BY created_at DESC 
      LIMIT 10
    `;

    for (const lead of leads) {
      await notion.pages.create({
        parent: { database_id: process.env.NOTION_DATABASE_ID! },
        properties: {
          Name: { title: [{ text: { content: lead.name } }] },
          Email: { email: lead.email },
          Phone: { phone_number: lead.phone || '' },
          Company: { rich_text: [{ text: { content: lead.company || '' } }] },
          Message: { rich_text: [{ text: { content: lead.message || '' } }] },
          Budget: { select: { name: lead.budget || 'unknown' } },
          Source: { select: { name: lead.source || 'unknown' } },
          Status: { status: { name: lead.status } },
        },
      });

      // Marque comme synchronisé
      await sql`
        UPDATE leads 
        SET synced_to_notion = true 
        WHERE id = ${lead.id}
      `;
    }

    return NextResponse.json({
      success: true,
      synced: leads.length,
    });
  } catch (error) {
    console.error('Notion sync error:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
