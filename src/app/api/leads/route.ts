// app/api/leads/route.ts
import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';

// POST new lead
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, project_description, budget_range, source } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email required' }, { status: 400 });
    }

    // ✅ Tagged template literal (backticks)
    const result = await sql`
      INSERT INTO leads (name, email, phone, company, project_description, budget_range, source, status)
      VALUES (${name}, ${email}, ${phone}, ${company}, ${project_description}, ${budget_range}, ${source || 'website_form'}, 'new')
      RETURNING *
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('POST lead error:', error);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}

// GET all leads
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const source = searchParams.get('source');

    // ✅ Requête dynamique avec conditions
    const leads = await sql`
      SELECT * FROM leads 
      WHERE 
        (${status}::text IS NULL OR status = ${status})
        AND (${source}::text IS NULL OR source = ${source})
      ORDER BY created_at DESC
    `;

    return NextResponse.json(leads);
  } catch (error) {
    console.error('GET leads error:', error);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}
