import React from 'react';
import { Link } from 'react-router-dom';
import { Laugh, Settings } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { PremiumBadge } from './PremiumBadge';

interface HeaderProps {
  isAuthenticated: boolean;
  isPremium?: boolean;
}

export function Header({ isAuthenticated, isPremium }: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <Link to="/" className="flex items-center">
        <Laugh className="text-blue-600 w-12 h-12" />
        <h1 className="text-4xl font-bold ml-2">JokeBox</h1>
        {isPremium && <div className="ml-4"><PremiumBadge /></div>}
      </Link>
      {isAuthenticated && (
        <div className="flex items-center gap-4">
          <Link
            to="/settings/profile"
            className="p-2 text-gray-600 hover:text-gray-800 rounded-full hover:bg-gray-100"
          >
            <Settings className="w-5 h-5" />
          </Link>
          <button
            onClick={() => supabase.auth.signOut()}
            className="text-gray-600 hover:text-gray-800"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}