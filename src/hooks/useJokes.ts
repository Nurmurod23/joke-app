import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useJokes(selectedCategory: string, session: any) {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJokes = async () => {
    if (!session) return;
    
    setLoading(true);
    try {
      let query = supabase
        .from('jokes')
        .select(`
          *,
          author:profiles!jokes_author_id_fkey(email, is_premium),
          votes:votes(count)
        `)
        .order('created_at', { ascending: false });

      if (selectedCategory) {
        query = query.eq('category', selectedCategory);
      }

      const { data: jokesData, error: jokesError } = await query;
      if (jokesError) throw jokesError;

      // Get user's votes
      const { data: userVotes, error: userVotesError } = await supabase
        .from('votes')
        .select('joke_id')
        .eq('user_id', session.user.id);
      if (userVotesError) throw userVotesError;

      // Create a set of jokes the user has voted on
      const userVotedJokes = new Set(userVotes.map(v => v.joke_id));

      // Combine all the data
      setJokes(
        jokesData.map((joke) => ({
          ...joke,
          votes: joke.votes?.length || 0,
          user_has_voted: userVotedJokes.has(joke.id)
        }))
      );
    } catch (error) {
      console.error('Error fetching jokes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJokes();
  }, [selectedCategory, session]);

  return { jokes, loading, refetchJokes: fetchJokes };
}