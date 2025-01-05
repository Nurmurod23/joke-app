import React, { useState } from 'react';
import { ThumbsUp } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { PremiumBadge } from './PremiumBadge';
import { JokeActions } from './JokeActions';
import { JokeEditForm } from './JokeEditForm';

interface JokeCardProps {
  joke: {
    id: string;
    content: string;
    category: string;
    votes: number;
    author: {
      id: string;
      email: string;
      is_premium?: boolean;
    };
    user_has_voted: boolean;
  };
  onVote: () => void;
  userId: string;
  userIsPremium: boolean;
}

export function JokeCard({ joke, onVote, userId, userIsPremium }: JokeCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleVote = async () => {
    if (!userIsPremium && joke.user_has_voted) {
      toast.error('Upgrade to premium for unlimited votes!');
      return;
    }

    try {
      const { error } = await supabase
        .from('votes')
        .insert([{ 
          joke_id: joke.id,
          user_id: userId
        }]);

      if (error) throw error;
      onVote();
      toast.success('Vote recorded!');
    } catch (error) {
      toast.error('Failed to vote');
      console.error('Error voting:', error);
    }
  };

  if (isEditing) {
    return (
      <JokeEditForm
        joke={joke}
        onCancel={() => setIsEditing(false)}
        onSave={() => {
          setIsEditing(false);
          onVote();
        }}
      />
    );
  }

  return (
    <div className="card p-6 mb-6 group hover:scale-[1.02]">
      <p className="text-xl text-gray-800 mb-4 leading-relaxed">{joke.content}</p>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-medium">
            {joke.category}
          </span>
          {joke.author.is_premium && <PremiumBadge />}
        </div>
        <div className="flex items-center gap-6">
          <span className="text-gray-600">by {joke.author.email}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleVote}
              disabled={!userIsPremium && joke.user_has_voted}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 ${
                joke.user_has_voted 
                  ? userIsPremium 
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'hover:bg-blue-50 text-gray-600 hover:text-blue-600'
              }`}
            >
              <ThumbsUp className={`w-4 h-4 ${joke.user_has_voted ? 'fill-current' : ''}`} />
              <span className="font-medium">{joke.votes}</span>
            </button>
            <JokeActions
              jokeId={joke.id}
              authorId={joke.author.id}
              currentUserId={userId}
              isPremium={userIsPremium}
              onEdit={() => setIsEditing(true)}
              onDelete={onVote}
            />
          </div>
        </div>
      </div>
    </div>
  );
}