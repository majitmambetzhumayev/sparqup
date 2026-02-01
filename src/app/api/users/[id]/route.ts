// app/api/users/[id]/route.ts
import { auth } from '@/auth';
import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();

  // Vérifie superuser
  if (!session || session.user.role !== 'superuser') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const { role } = await request.json();

  // Validation
  if (!['viewer', 'admin', 'superuser'].includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  }

  try {
    const result = await sql`
      UPDATE users 
      SET role = ${role}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING id, email, name, role
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: result[0] });
  } catch (error) {
    console.error('Update role error:', error);
    return NextResponse.json({ error: 'Failed to update role' }, { status: 500 });
  }
}
