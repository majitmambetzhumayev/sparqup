// app/dashboard/leads/[id]/page.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';

type Lead = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  project_description?: string;
  budget_range?: string;
  status: string;
  source: string;
};

export default function EditLeadPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchLead = useCallback(async () => {
    const res = await fetch(`/api/leads/${id}`);
    if (res.ok) {
      const data = await res.json();
      setLead(data);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchLead();
  }, [fetchLead]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lead) return;

    setSaving(true);
    const res = await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    });

    if (res.ok) {
      router.push('/dashboard/leads');
    } else {
      alert('Erreur lors de la sauvegarde');
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-neutral-400">Chargement...</p>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-neutral-400">Lead introuvable</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="text-neutral-400 hover:text-white">
          ← Retour
        </button>
        <h1 className="text-3xl font-bold text-white">Éditer le lead</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nom */}
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">Nom *</label>
          <input
            type="text"
            required
            value={lead.name}
            onChange={e => setLead({ ...lead, name: e.target.value })}
            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:border-forest-500 focus:outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">Email *</label>
          <input
            type="email"
            required
            value={lead.email}
            onChange={e => setLead({ ...lead, email: e.target.value })}
            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:border-forest-500 focus:outline-none"
          />
        </div>

        {/* Téléphone */}
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">Téléphone</label>
          <input
            type="tel"
            value={lead.phone || ''}
            onChange={e => setLead({ ...lead, phone: e.target.value })}
            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:border-forest-500 focus:outline-none"
          />
        </div>

        {/* Entreprise */}
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">Entreprise</label>
          <input
            type="text"
            value={lead.company || ''}
            onChange={e => setLead({ ...lead, company: e.target.value })}
            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:border-forest-500 focus:outline-none"
          />
        </div>

        {/* Description projet */}
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">
            Description du projet
          </label>
          <textarea
            rows={4}
            value={lead.project_description || ''}
            onChange={e => setLead({ ...lead, project_description: e.target.value })}
            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:border-forest-500 focus:outline-none resize-none"
          />
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">Budget</label>
          <select
            value={lead.budget_range || ''}
            onChange={e => setLead({ ...lead, budget_range: e.target.value })}
            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:border-forest-500 focus:outline-none"
          >
            <option value="">Non spécifié</option>
            <option value="0-5k">0 - 5 000€</option>
            <option value="5-10k">5 000 - 10 000€</option>
            <option value="10-20k">10 000 - 20 000€</option>
            <option value="20k+">20 000€+</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">Statut</label>
          <select
            value={lead.status}
            onChange={e => setLead({ ...lead, status: e.target.value })}
            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:border-forest-500 focus:outline-none"
          >
            <option value="new">Nouveau</option>
            <option value="contacted">Contacté</option>
            <option value="qualified">Qualifié</option>
            <option value="converted">Converti</option>
            <option value="lost">Perdu</option>
          </select>
        </div>

        {/* Source (read-only) */}
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">Source</label>
          <input
            type="text"
            value={lead.source}
            disabled
            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-500 cursor-not-allowed"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-forest-600 text-white rounded-lg hover:bg-forest-500 transition disabled:opacity-50"
          >
            {saving ? 'Enregistrement...' : 'Enregistrer'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 bg-neutral-700 text-white rounded-lg hover:bg-neutral-600 transition"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
