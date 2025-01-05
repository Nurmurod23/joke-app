import { supabase } from './supabase';
import { UserSettings } from './types/settings';

export async function updateUserSettings(userId: string, settings: Partial<UserSettings>) {
  return supabase
    .from('profiles')
    .update({ settings })
    .eq('id', userId);
}

export async function getUserSettings(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('settings')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data?.settings as UserSettings | undefined;
}