import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function usePremiumStatus(userId: string | undefined) {
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchPremiumStatus = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('is_premium')
          .eq('id', userId)
          .single();

        if (error) throw error;
        setIsPremium(data.is_premium);
      } catch (error) {
        console.error('Error fetching premium status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPremiumStatus();
  }, [userId]);

  return { isPremium, loading };
}