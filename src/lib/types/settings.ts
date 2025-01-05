import { JokeCategory } from '../constants';

export interface UserSettings {
  displayName: string;
  preferredCategories: JokeCategory[];
  emailNotifications: boolean;
  theme: 'light' | 'dark' | 'system';
}

export interface UserProfile {
  id: string;
  email: string;
  is_premium: boolean;
  settings?: UserSettings;
}