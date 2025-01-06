import React from 'react';
import { Palette, Sun, Moon, Monitor } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { updateUserSettings } from '../../lib/settings';
import { useUserSettings } from '../../hooks/useUserSettings';
import { SettingsHeader } from '../ui/SettingsHeader';
import { Theme } from '../../lib/types/settings';
import toast from 'react-hot-toast';

const themes: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
];

export function AppearanceSettings() {
  const session = useAuth();
  const { settings, loading } = useUserSettings(session?.user?.id);
  const [theme, setTheme] = React.useState<Theme>(settings?.theme || 'system');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) return;

    try {
      await updateUserSettings(session.user.id, { theme });
      toast.success('Appearance settings updated successfully');
    } catch (error) {
      toast.error('Failed to update appearance settings');
      console.error('Error updating appearance settings:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <SettingsHeader
        icon={Palette}
        title="Appearance"
        description="Customize your viewing experience"
      />

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Theme
          </label>
          <div className="grid grid-cols-3 gap-4">
            {themes.map(({ value, label, icon: Icon }) => (
              <label
                key={value}
                className={`flex flex-col items-center p-4 rounded-lg border cursor-pointer
                          transition-all duration-200 ${
                            theme === value
                              ? 'border-blue-500 bg-blue-50'
                              : 'hover:bg-gray-50'
                          }`}
              >
                <Icon className={`w-6 h-6 mb-2 ${
                  theme === value ? 'text-blue-600' : 'text-gray-600'
                }`} />
                <span className={theme === value ? 'text-blue-600' : 'text-gray-600'}>
                  {label}
                </span>
                <input
                  type="radio"
                  name="theme"
                  value={value}
                  checked={theme === value}
                  onChange={(e) => setTheme(e.target.value as Theme)}
                  className="sr-only"
                />
              </label>
            ))}
          </div>
        </div>
        <button type="submit" className="button-primary">
          Save Appearance Settings
        </button>
      </form>
    </div>
  );
}