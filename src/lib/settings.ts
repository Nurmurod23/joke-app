import { supabase } from './supabase';
import type { UserSettings } from './types/settings';

export async function updateUserSettings(userId: string, settings: Partial<UserSettings>) {
  const { data: currentData, error: fetchError } = await supabase
    .from('profiles')
    .select('settings')
    .eq('id', userId)
    .single();

  if (fetchError) throw fetchError;

  const updatedSettings = {
    ...currentData?.settings,
    ...settings
  };

  const { error } = await supabase
    .from('profiles')
    .update({ settings: updatedSettings })
    .eq('id', userId);

  if (error) throw error;
}

export async function getUserSettings(userId: string): Promise<UserSettings | undefined> {
  const { data, error } = await supabase
    .from('profiles')
    .select('settings')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data?.settings;
}