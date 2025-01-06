import { LucideIcon } from 'lucide-react';

interface SettingsHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function SettingsHeader({ icon: Icon, title, description }: SettingsHeaderProps) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
        <Icon className="w-8 h-8 text-blue-600" />
      </div>
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}