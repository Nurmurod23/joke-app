import React from 'react';
import { Crown, Star, Zap, Sparkles } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { usePremiumStatus } from '../hooks/usePremiumStatus';

interface PremiumFeaturesProps {
  isPremium: boolean;
}

export function PremiumFeatures({ isPremium }: PremiumFeaturesProps) {
  const session = useAuth();
  const { isPremium: userIsPremium } = usePremiumStatus(session?.user?.id);

  // Only show premium features to non-premium users or premium users
  if (!session || (userIsPremium && !isPremium)) {
    return null;
  }

  const features = [
    {
      icon: <Crown className="w-6 h-6" />,
      title: 'Create & Manage Jokes',
      description: 'Create your own jokes and manage them',
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Unlimited Votes',
      description: 'Vote on as many jokes as you want',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Early Access',
      description: 'Get early access to new features and jokes',
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Premium Badge',
      description: 'Show off your premium status with a special badge',
    },
  ];

  return (
    <div className="card p-8 mb-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">
          {isPremium ? 'Your Premium Benefits' : 'Upgrade to Premium'}
        </h2>
        <p className="text-gray-600 text-lg">
          {isPremium
            ? 'Enjoy your exclusive premium features!'
            : 'Get access to exclusive features and benefits'}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl transition-all duration-300 ${
              isPremium
                ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-100 hover:shadow-lg'
                : 'bg-white border border-gray-100 hover:border-blue-100 hover:shadow-lg'
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
              isPremium ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'
            }`}>
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {!isPremium && (
        <div className="mt-8 text-center">
          <button className="button-primary">
            Upgrade Now
          </button>
        </div>
      )}
    </div>
  );
}