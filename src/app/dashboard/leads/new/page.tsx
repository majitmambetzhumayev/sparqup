// app/dashboard/leads/new/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewLeadPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    project_description: '',
    budget_range: '',
    source: 'manual',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push('/dashboard/leads');
    } else {
      alert('Erreur lors de la création');
    }
    setSaving(false);
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="text-neutral-400 hover:text-white">
          ← Retour
        </button>
        <h1 className="text-3xl font-bold text-white">Nouveau lead</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Même structure que Edit, mais avec formData */}
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">Nom *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:border-forest-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">Email *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:border-forest-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">Téléphone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:border-forest-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">Entreprise</label>
          <input
            type="text"
            value={formData.company}
            onChange={e => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:border-forest-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">
            Description du projet
          </label>
          <textarea
            rows={4}
            value={formData.project_description}
            onChange={e => setFormData({ ...formData, project_description: e.target.value })}
            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:border-forest-500 focus:outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">Budget</label>
          <select
            value={formData.budget_range}
            onChange={e => setFormData({ ...formData, budget_range: e.target.value })}
            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:border-forest-500 focus:outline-none"
          >
            <option value="">Non spécifié</option>
            <option value="0-5k">0 - 5 000€</option>
            <option value="5-10k">5 000 - 10 000€</option>
            <option value="10-20k">10 000 - 20 000€</option>
            <option value="20k+">20 000€+</option>
          </select>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-forest-600 text-white rounded-lg hover:bg-forest-500 transition disabled:opacity-50"
          >
            {saving ? 'Création...' : 'Créer le lead'}
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
