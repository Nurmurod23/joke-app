import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useAdminJokes() {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJokes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('jokes')
        .select(`
          *,
          votes(count)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setJokes(
        data.map((joke) => ({
          ...joke,
          votes: joke.votes?.length || 0
        }))
      );
    } catch (error) {
      console.error('Error fetching admin jokes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJokes();
  }, []);

  return { jokes, loading, refetchJokes: fetchJokes };
}