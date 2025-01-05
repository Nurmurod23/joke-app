import { Routes, Route, Navigate } from 'react-router-dom';
import { SettingsLayout } from '../components/settings/SettingsLayout';
import { ProfileSettings } from '../components/settings/ProfileSettings';

export function SettingsPage() {
  return (
    <SettingsLayout>
      <Routes>
        <Route path="/profile" element={<ProfileSettings />} />
        <Route path="*" element={<Navigate to="/settings/profile" replace />} />
      </Routes>
    </SettingsLayout>
  );
}