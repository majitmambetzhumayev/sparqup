// app/dashboard/layout.tsx
import Link from 'next/link';
import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-neutral-900 border-r border-neutral-800 p-6 flex flex-col">
        <div className="flex-1">
          <h1 className="text-xl font-bold text-white mb-8">SparqUp Admin</h1>

          <nav className="space-y-2">
            <Link
              href="/dashboard"
              className="block px-4 py-2 rounded-lg text-neutral-300 hover:bg-neutral-800 hover:text-white transition"
            >
              📊 Dashboard
            </Link>
            <Link
              href="/dashboard/leads"
              className="block px-4 py-2 rounded-lg text-neutral-300 hover:bg-neutral-800 hover:text-white transition"
            >
              📧 Leads
            </Link>
            <Link
              href="/dashboard/users"
              className="block px-4 py-2 rounded-lg text-neutral-300 hover:bg-neutral-800 hover:text-white transition"
            >
              👥 Users
            </Link>
          </nav>
        </div>

        {/* User info + Logout */}
        <div className="border-t border-neutral-800 pt-4">
          <div className="px-4 py-2 text-sm text-neutral-400 mb-2">{session.user?.email}</div>
          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/login' });
            }}
          >
            <button
              type="submit"
              className="w-full px-4 py-2 text-left rounded-lg text-neutral-300 hover:bg-neutral-800 hover:text-white transition"
            >
              🚪 Déconnexion
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 p-8">{children}</main>
    </div>
  );
}
