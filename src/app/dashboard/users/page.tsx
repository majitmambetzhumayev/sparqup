// app/dashboard/users/page.tsx
import { auth } from '@/auth';
import { sql } from '@/lib/db';
import { UsersList } from '@/components/dashboard/UsersList';

// ✅ Définis le type User ici aussi
type User = {
  id: number;
  email: string;
  name: string;
  role: string;
  created_at: Date;
};

export default async function UsersPage() {
  const session = await auth();

  if (!session || session.user.role !== 'superuser') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">🔒 Accès refusé</h1>
          <p className="text-neutral-400">Seuls les superusers peuvent gérer les utilisateurs.</p>
        </div>
      </div>
    );
  }

  // ✅ Cast explicite
  const result = await sql`
    SELECT id, email, name, role, created_at 
    FROM users 
    ORDER BY created_at DESC
  `;

  const users = result as User[];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Utilisateurs</h1>
      </div>

      <UsersList users={users} />
    </div>
  );
}
