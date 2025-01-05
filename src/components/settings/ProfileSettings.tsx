import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { getUserSettings, updateUserSettings } from '../../lib/settings';
import toast from 'react-hot-toast';

export function ProfileSettings() {
  const session = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      if (!session?.user?.id) return;
      try {
        const settings = await getUserSettings(session.user.id);
        setDisplayName(settings?.displayName || '');
      } catch (error) {
        console.error('Error loading settings:', error);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, [session?.user?.id]);

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
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
          <User className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Profile Settings</h2>
          <p className="text-gray-600">Manage your profile information</p>
        </div>
      </div>

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