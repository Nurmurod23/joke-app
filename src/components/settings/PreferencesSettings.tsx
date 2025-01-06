import React from 'react';
import { Settings } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { updateUserSettings } from '../../lib/settings';
import { useUserSettings } from '../../hooks/useUserSettings';
import { SettingsHeader } from '../ui/SettingsHeader';
import { JOKE_CATEGORIES } from '../../lib/constants';
import toast from 'react-hot-toast';

export function PreferencesSettings() {
  const session = useAuth();
  const { settings, loading } = useUserSettings(session?.user?.id);
  const [preferredCategories, setPreferredCategories] = React.useState(
    settings?.preferredCategories || []
  );

  const handleToggleCategory = (category: string) => {
    setPreferredCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) return;

    try {
      await updateUserSettings(session.user.id, { preferredCategories });
      toast.success('Preferences updated successfully');
    } catch (error) {
      toast.error('Failed to update preferences');
      console.error('Error updating preferences:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <SettingsHeader
        icon={Settings}
        title="Preferences"
        description="Customize your joke feed"
      />

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Preferred Categories
          </label>
          <div className="grid grid-cols-2 gap-4">
            {JOKE_CATEGORIES.map(category => (
              <label
                key={category}
                className="flex items-center p-4 rounded-lg border cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={preferredCategories.includes(category)}
                  onChange={() => handleToggleCategory(category)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="ml-3">{category}</span>
              </label>
            ))}
          </div>
        </div>
        <button type="submit" className="button-primary">
          Save Preferences
        </button>
      </form>
    </div>
  );
}