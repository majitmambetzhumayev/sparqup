'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

// Définis un type pour la réponse
type SyncResult = {
  success?: boolean;
  synced?: number;
  total?: number;
  error?: string;
};

export function NotionSyncButton() {
  const [syncing, setSyncing] = useState(false);
  const [result, setResult] = useState<SyncResult | null>(null); // ← Type explicite

  const handleSync = async () => {
    setSyncing(true);
    setResult(null);

    try {
      const response = await fetch('/api/sync-notion', {
        method: 'POST',
      });

      const data: SyncResult = await response.json(); // ← Type explicite
      setResult(data);
    } catch {
      // ← Enlève 'error' non utilisé
      setResult({ error: 'Sync failed' });
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="space-y-2">
      <Button onClick={handleSync} disabled={syncing} variant="outline">
        {syncing ? '⏳ Synchronisation...' : '🔄 Sync Notion'}
      </Button>

      {result && (
        <div className={`text-sm ${result.error ? 'text-red-500' : 'text-green-500'}`}>
          {result.error
            ? `❌ ${result.error}`
            : `✅ ${result.synced}/${result.total} leads synchronisés`}
        </div>
      )}
    </div>
  );
}
