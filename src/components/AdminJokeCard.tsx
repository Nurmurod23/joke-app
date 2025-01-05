import React, { useState } from 'react';
import { Pencil, Trash2, X, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface AdminJokeCardProps {
  joke: {
    id: string;
    content: string;
    category: string;
    votes: number;
  };
  onJokeUpdated: () => void;
}

export function AdminJokeCard({ joke, onJokeUpdated }: AdminJokeCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(joke.content);
  const [category, setCategory] = useState(joke.category);

  const categories = [
    'Dad Jokes',
    'Puns',
    'One-liners',
    'Knock-knock',
    'Programming',
  ];

  const handleUpdate = async () => {
    try {
      const { error } = await supabase
        .from('jokes')
        .update({ content, category })
        .eq('id', joke.id);

      if (error) throw error;
      
      toast.success('Joke updated successfully!');
      setIsEditing(false);
      onJokeUpdated();
    } catch (error) {
      toast.error('Failed to update joke');
      console.error('Error updating joke:', error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this joke?')) return;

    try {
      const { error } = await supabase
        .from('jokes')
        .delete()
        .eq('id', joke.id);

      if (error) throw error;
      
      toast.success('Joke deleted successfully!');
      onJokeUpdated();
    } catch (error) {
      toast.error('Failed to delete joke');
      console.error('Error deleting joke:', error);
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <div className="mb-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
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
            onClick={() => setIsEditing(false)}
            className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-800"
          >
            <X className="w-4 h-4 mr-1" />
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Check className="w-4 h-4 mr-1" />
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <p className="text-lg mb-2">{joke.content}</p>
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
          {joke.category}
        </span>
        <div className="flex items-center gap-2">
          <span>{joke.votes} votes</span>
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 text-gray-600 hover:text-blue-600"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 text-gray-600 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}