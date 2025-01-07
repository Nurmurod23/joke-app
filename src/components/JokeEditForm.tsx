import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { Card } from './ui/Card';

interface JokeEditFormProps {
  joke: {
    id: string;
    content: string;
    category: string;
    author_id: string;
  };
  currentUserId: string;
  onCancel: () => void;
  onSave: () => void;
}

export function JokeEditForm({ joke, currentUserId, onCancel, onSave }: JokeEditFormProps) {
  const [content, setContent] = useState(joke.content);
  const [category, setCategory] = useState(joke.category);

  const categories = [
    'Dad Jokes',
    'Puns',
    'One-liners',
    'Knock-knock',
    'Programming',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from('jokes')
        .update({ content, category })
        .eq('id', joke.id)
        .eq('author_id', currentUserId); // Extra safety check

      if (error) throw error;
      
      toast.success('Joke updated successfully!');
      onSave();
    } catch (error) {
      toast.error('Failed to update joke');
      console.error('Error updating joke:', error);
    }
  };

  return (
    <Card className="p-6 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Edit Your Joke
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="input-field"
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
            className="select-field"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="button-secondary"
          >
            <X className="w-4 h-4 mr-1" />
            Cancel
          </button>
          <button
            type="submit"
            className="button-primary"
          >
            <Check className="w-4 h-4 mr-1" />
            Save Changes
          </button>
        </div>
      </form>
    </Card>
  );
}