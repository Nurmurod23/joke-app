import { Routes, Route, Navigate } from 'react-router-dom';
import { SettingsLayout } from '../components/settings/SettingsLayout';
import { ProfileSettings } from '../components/settings/ProfileSettings';
import { PreferencesSettings } from '../components/settings/PreferencesSettings';
import { NotificationsSettings } from '../components/settings/NotificationsSettings';
import { AppearanceSettings } from '../components/settings/AppearanceSettings';

export function SettingsPage() {
  return (
    <SettingsLayout>
      <Routes>
        <Route path="/profile" element={<ProfileSettings />} />
        <Route path="/preferences" element={<PreferencesSettings />} />
        <Route path="/notifications" element={<NotificationsSettings />} />
        <Route path="/appearance" element={<AppearanceSettings />} />
        <Route path="*" element={<Navigate to="/settings/profile" replace />} />
      </Routes>
    </SettingsLayout>
  );
}