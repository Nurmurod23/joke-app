import { Laugh } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { PremiumBadge } from './PremiumBadge';

interface HeaderProps {
  isAuthenticated: boolean;
  isPremium?: boolean;
}

export function Header({ isAuthenticated, isPremium }: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center">
        <Laugh className="text-blue-600 w-12 h-12" />
        <h1 className="text-4xl font-bold ml-2">JokeBox</h1>
        {isPremium && <div className="ml-4"><PremiumBadge /></div>}
      </div>
      {isAuthenticated && (
        <button
          onClick={() => supabase.auth.signOut()}
          className="text-gray-600 hover:text-gray-800"
        >
          Sign Out
        </button>
      )}
    </div>
  );
}