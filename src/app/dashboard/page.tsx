// app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Stats = {
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  converted: number;
};

type Lead = {
  id: number;
  status: string;
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    converted: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/leads');
      const leads: Lead[] = await res.json();

      const stats = {
        total: leads.length,
        new: leads.filter(l => l.status === 'new').length,
        contacted: leads.filter(l => l.status === 'contacted').length,
        qualified: leads.filter(l => l.status === 'qualified').length,
        converted: leads.filter(l => l.status === 'converted').length,
      };

      setStats(stats);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

      {loading ? (
        <p className="text-neutral-400">Chargement...</p>
      ) : (
        <>
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Leads"
              value={stats.total}
              icon="📊"
              color="bg-blue-500/10 border-blue-500/20 text-blue-400"
            />
            <StatCard
              title="Nouveaux"
              value={stats.new}
              icon="✨"
              color="bg-green-500/10 border-green-500/20 text-green-400"
            />
            <StatCard
              title="Contactés"
              value={stats.contacted}
              icon="📞"
              color="bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
            />
            <StatCard
              title="Convertis"
              value={stats.converted}
              icon="🎉"
              color="bg-purple-500/10 border-purple-500/20 text-purple-400"
            />
          </div>

          {/* Quick actions */}
          <div className="bg-neutral-900 rounded-lg border border-neutral-800 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Actions rapides</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/dashboard/leads/new"
                className="p-4 bg-forest-600 hover:bg-forest-500 rounded-lg text-white text-center transition"
              >
                + Nouveau lead
              </Link>
              <Link
                href="/dashboard/leads?status=new"
                className="p-4 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-white text-center transition"
              >
                Voir nouveaux leads
              </Link>
              <Link
                href="/dashboard/leads"
                className="p-4 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-white text-center transition"
              >
                Tous les leads
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: string;
  color: string;
}) {
  return (
    <div className={`p-6 rounded-lg border ${color}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        <span className="text-3xl font-bold">{value}</span>
      </div>
      <p className="text-sm opacity-80">{title}</p>
    </div>
  );
}
