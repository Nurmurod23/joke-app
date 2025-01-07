import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { usePremiumStatus } from '../hooks/usePremiumStatus';
import { Card } from './ui/Card';

const categories = [
  'Dad Jokes',
  'Puns',
  'One-liners',
  'Knock-knock',
  'Programming',
];

interface JokeFormProps {
  onJokeAdded: () => void;
  session: any;
}

export function JokeForm({ onJokeAdded, session }: JokeFormProps) {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const { isPremium } = usePremiumStatus(session?.user?.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPremium) {
      toast.error('Only premium users can create jokes');
      return;
    }

    try {
      const { error } = await supabase
        .from('jokes')
        .insert([{ 
          content, 
          category,
          author_id: session.user.id 
        }]);

      if (error) throw error;
      
      toast.success('Joke added successfully!');
      setContent('');
      onJokeAdded();
    } catch (error) {
      toast.error('Failed to add joke');
      console.error('Error adding joke:', error);
    }
  };

  if (!isPremium) {
    return null;
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Your Joke
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="input-field"
            rows={3}
            required
            placeholder="Type your joke here..."
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="select-field"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="button-primary w-full">
          Share Joke
        </button>
      </form>
    </Card>
  );
}