import React, { useState } from 'react';
import { User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { updateUserSettings } from '../../lib/settings';
import { useUserSettings } from '../../hooks/useUserSettings';
import { SettingsHeader } from '../ui/SettingsHeader';
import toast from 'react-hot-toast';

export function ProfileSettings() {
  const session = useAuth();
  const { settings, loading } = useUserSettings(session?.user?.id);
  const [displayName, setDisplayName] = useState(settings?.displayName || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) return;

    try {
      await updateUserSettings(session.user.id, { displayName });
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <SettingsHeader
        icon={User}
        title="Profile Settings"
        description="Manage your profile information"
      />

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-2">
            Display Name
          </label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="input-field"
            placeholder="Enter your display name"
          />
        </div>
        <button type="submit" className="button-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
}