import React from 'react';
import { Crown } from 'lucide-react';

export function PremiumBadge() {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
      <Crown className="w-3 h-3 mr-1" />
      Premium
    </span>
  );
}