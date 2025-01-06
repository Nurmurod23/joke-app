export type Theme = 'light' | 'dark' | 'system';

export interface UserSettings {
  displayName?: string;
  preferredCategories?: string[];
  emailNotifications?: boolean;
  theme?: Theme;
}

export interface UserProfile {
  id: string;
  email: string;
  is_premium: boolean;
  settings?: UserSettings;
  created_at: string;
}