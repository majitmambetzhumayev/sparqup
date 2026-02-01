// src/components/ServiceCTA.tsx
'use client';

import Button from '@/components/ui/Button';

interface ServiceCTAProps {
  pricing: string;
  duration: string;
}

export default function ServiceCTA({ pricing, duration }: ServiceCTAProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white rounded-xl border-2 border-neutral-200 p-6">
      <div>
        <div className="text-sm text-neutral-600 mb-1">Tarif indicatif</div>
        <div className="text-2xl font-bold text-neutral-950">{pricing}</div>
      </div>
      <div className="sm:text-right">
        <div className="text-sm text-neutral-600 mb-1">Durée moyenne</div>
        <div className="text-lg font-semibold text-neutral-700">{duration}</div>
      </div>
      <Button variant="primary" onClick={() => (window.location.href = '/questionnaire')}>
        Simuler ce service →
      </Button>
    </div>
  );
}
