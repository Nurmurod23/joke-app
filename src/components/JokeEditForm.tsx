import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface JokeEditFormProps {
  joke: {
    id: string;
    content: string;
    category: string;
  };
  onCancel: () => void;
  onSave: () => void;
}

export function JokeEditForm({ joke, onCancel, onSave }: JokeEditFormProps) {
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
        .eq('id', joke.id);

      if (error) throw error;
      
      toast.success('Joke updated successfully!');
      onSave();
    } catch (error) {
      toast.error('Failed to update joke');
      console.error('Error updating joke:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-6 mb-6">
      <div className="mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          required
        />
      </div>
      <div className="mb-4">
        <select
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
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-800"
        >
          <X className="w-4 h-4 mr-1" />
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Check className="w-4 h-4 mr-1" />
          Save
        </button>
      </div>
    </form>
  );
}