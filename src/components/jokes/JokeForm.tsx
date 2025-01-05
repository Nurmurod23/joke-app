import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { JOKE_CATEGORIES } from '../../lib/constants';
import { createJoke } from '../../lib/jokes';
import { usePremiumStatus } from '../../hooks/usePremiumStatus';
import { Card } from '../ui/Card';

interface JokeFormProps {
  onJokeAdded: () => void;
  session: any;
}

export function JokeForm({ onJokeAdded, session }: JokeFormProps) {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(JOKE_CATEGORIES[0]);
  const { isPremium } = usePremiumStatus(session?.user?.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPremium) {
      toast.error('Only premium users can create jokes');
      return;
    }

    try {
      const { error } = await createJoke(content, category, session.user.id);

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
    <Card className="p-8 mb-8">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Share Your Joke
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="input-field"
            rows={3}
            placeholder="Type your joke here..."
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as typeof JOKE_CATEGORIES[number])}
            className="select-field"
          >
            {JOKE_CATEGORIES.map((cat) => (
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