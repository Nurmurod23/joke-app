import { ReactNode } from 'react';
import { Settings, User, Bell, Palette } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';

const settingsSections = [
  { path: '/settings/profile', label: 'Profile', icon: User },
  { path: '/settings/preferences', label: 'Preferences', icon: Settings },
  { path: '/settings/notifications', label: 'Notifications', icon: Bell },
  { path: '/settings/appearance', label: 'Appearance', icon: Palette },
];

interface SettingsLayoutProps {
  children: ReactNode;
}

export function SettingsLayout({ children }: SettingsLayoutProps) {
  const location = useLocation();

  return (
    <Container className="py-8">
      <div className="flex gap-8">
        <Card className="w-64 p-4 h-fit">
          <nav>
            {settingsSections.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg mb-1 ${
                  location.pathname === path
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </Card>
        <div className="flex-1">
          <Card className="p-6">{children}</Card>
        </div>
      </div>
    </Container>
  );
}