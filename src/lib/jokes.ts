import { supabase } from './supabase';
import { JokeCategory } from './constants';

export async function createJoke(content: string, category: JokeCategory, authorId: string) {
  return supabase
    .from('jokes')
    .insert([{ content, category, author_id: authorId }]);
}

export async function updateJoke(jokeId: string, content: string, category: JokeCategory) {
  return supabase
    .from('jokes')
    .update({ content, category })
    .eq('id', jokeId);
}

export async function deleteJoke(jokeId: string) {
  return supabase
    .from('jokes')
    .delete()
    .eq('id', jokeId);
}