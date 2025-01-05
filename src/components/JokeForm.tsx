import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { usePremiumStatus } from '../hooks/usePremiumStatus';

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

    const { error } = await supabase
      .from('jokes')
      .insert([{ 
        content, 
        category,
        author_id: session.user.id 
      }]);

    if (error) {
      toast.error('Failed to add joke');
      console.error('Error adding joke:', error);
    } else {
      toast.success('Joke added successfully!');
      setContent('');
      onJokeAdded();
    }
  };

  if (!isPremium) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
          Your Joke
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          required
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Share Joke
      </button>
    </form>
  );
}