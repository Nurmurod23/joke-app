import { useState, useEffect } from 'react';
import { getUserSettings } from '../lib/settings';
import type { UserSettings } from '../lib/types/settings';

export function useUserSettings(userId: string | undefined) {
  const [settings, setSettings] = useState<UserSettings | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadSettings() {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const data = await getUserSettings(userId);
        setSettings(data || {}); // Ensure we always have an object
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load settings'));
        console.error('Error loading settings:', err);
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, [userId]);

  return { settings, loading, error };
}