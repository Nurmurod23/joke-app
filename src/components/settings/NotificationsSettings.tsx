import React from 'react';
import { Bell } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { updateUserSettings } from '../../lib/settings';
import { useUserSettings } from '../../hooks/useUserSettings';
import { SettingsHeader } from '../ui/SettingsHeader';
import toast from 'react-hot-toast';

export function NotificationsSettings() {
  const session = useAuth();
  const { settings, loading } = useUserSettings(session?.user?.id);
  const [emailNotifications, setEmailNotifications] = React.useState(
    settings?.emailNotifications || false
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) return;

    try {
      await updateUserSettings(session.user.id, { emailNotifications });
      toast.success('Notification settings updated successfully');
    } catch (error) {
      toast.error('Failed to update notification settings');
      console.error('Error updating notification settings:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <SettingsHeader
        icon={Bell}
        title="Notifications"
        description="Manage your notification preferences"
      />

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50">
            <div>
              <h3 className="font-medium">Email Notifications</h3>
              <p className="text-sm text-gray-600">Receive updates about new jokes and features</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                           peer-focus:ring-blue-300 rounded-full peer 
                           peer-checked:after:translate-x-full peer-checked:after:border-white 
                           after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                           after:bg-white after:border-gray-300 after:border after:rounded-full 
                           after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600">
              </div>
            </label>
          </div>
        </div>
        <button type="submit" className="button-primary mt-6">
          Save Notification Settings
        </button>
      </form>
    </div>
  );
}