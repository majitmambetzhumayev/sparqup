// components/dashboard/UsersList.tsx
'use client';

import { useState } from 'react';

type User = {
  id: number;
  email: string;
  name: string;
  role: string;
  created_at: Date;
};

export function UsersList({ users }: { users: User[] }) {
  const [optimisticUsers, setOptimisticUsers] = useState(users);

  const updateRole = async (userId: number, newRole: string) => {
    // Optimistic update
    setOptimisticUsers(prev => prev.map(u => (u.id === userId ? { ...u, role: newRole } : u)));

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        // Rollback si erreur
        setOptimisticUsers(users);
        alert('Erreur lors de la modification');
      }
    } catch {
      setOptimisticUsers(users);
      alert('Erreur réseau');
    }
  };

  return (
    <div className="bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden">
      <table className="w-full">
        <thead className="bg-neutral-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase">
              Nom
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase">
              Rôle
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase">
              Créé le
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800">
          {optimisticUsers.map(user => (
            <tr key={user.id} className="hover:bg-neutral-800/50 transition">
              <td className="px-6 py-4 text-sm text-white">{user.name}</td>
              <td className="px-6 py-4 text-sm text-neutral-300">{user.email}</td>
              <td className="px-6 py-4 text-sm">
                <select
                  value={user.role}
                  onChange={e => updateRole(user.id, e.target.value)}
                  className="px-3 py-1 bg-neutral-800 border border-neutral-700 rounded text-white text-sm"
                >
                  <option value="viewer">Viewer</option>
                  <option value="admin">Admin</option>
                  <option value="superuser">Superuser</option>
                </select>
              </td>
              <td className="px-6 py-4 text-sm text-neutral-400">
                {new Date(user.created_at).toLocaleDateString('fr-FR')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
