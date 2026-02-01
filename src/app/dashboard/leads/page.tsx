// app/dashboard/leads/page.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { NotionSyncButton } from '@/components/dashboard/NotionSyncButton';

type Lead = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  budget_range?: string;
  status: string;
  source: string;
  created_at: string;
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: '', source: '' });

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filter.status) params.append('status', filter.status);
    if (filter.source) params.append('source', filter.source);

    const res = await fetch(`/api/leads?${params}`);
    const data = await res.json();
    setLeads(data);
    setLoading(false);
  }, [filter.status, filter.source]);

  const deleteLead = async (id: number) => {
    if (!confirm('Supprimer ce lead ?')) return;

    await fetch(`/api/leads/${id}`, { method: 'DELETE' });
    fetchLeads();
  };

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Leads</h1>
        <NotionSyncButton />
        <Link
          href="/dashboard/leads/new"
          className="px-4 py-2 bg-forest-600 text-white rounded-lg hover:bg-forest-500 transition"
        >
          + Nouveau lead
        </Link>
      </div>

      {/* Filtres */}
      <div className="flex gap-4 mb-6">
        <select
          value={filter.status}
          onChange={e => setFilter({ ...filter, status: e.target.value })}
          className="px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white"
        >
          <option value="">Tous les statuts</option>
          <option value="new">Nouveau</option>
          <option value="contacted">Contacté</option>
          <option value="qualified">Qualifié</option>
          <option value="converted">Converti</option>
        </select>

        <select
          value={filter.source}
          onChange={e => setFilter({ ...filter, source: e.target.value })}
          className="px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white"
        >
          <option value="">Toutes les sources</option>
          <option value="website_form">Site web</option>
          <option value="malt">Malt</option>
          <option value="codeur">Codeur.com</option>
        </select>
      </div>

      {/* Table */}
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
                Budget
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase">
                Source
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-neutral-400 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-neutral-500">
                  Chargement...
                </td>
              </tr>
            ) : leads.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-neutral-500">
                  Aucun lead
                </td>
              </tr>
            ) : (
              leads.map(lead => (
                <tr key={lead.id} className="hover:bg-neutral-800/50 transition">
                  <td className="px-6 py-4 text-sm text-white">{lead.name}</td>
                  <td className="px-6 py-4 text-sm text-neutral-300">{lead.email}</td>
                  <td className="px-6 py-4 text-sm text-neutral-300">{lead.budget_range || '-'}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        lead.status === 'new'
                          ? 'bg-blue-500/20 text-blue-400'
                          : lead.status === 'contacted'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : lead.status === 'qualified'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-purple-500/20 text-purple-400'
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-300">{lead.source}</td>
                  <td className="px-6 py-4 text-sm text-neutral-400">
                    {new Date(lead.created_at).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 text-sm text-right space-x-2">
                    <Link
                      href={`/dashboard/leads/${lead.id}`}
                      className="text-forest-400 hover:text-forest-300"
                    >
                      Éditer
                    </Link>
                    <button
                      onClick={() => deleteLead(lead.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
