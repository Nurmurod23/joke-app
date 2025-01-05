import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface JokeActionsProps {
  jokeId: string;
  authorId: string;
  currentUserId: string;
  isPremium: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export function JokeActions({ 
  jokeId, 
  authorId, 
  currentUserId, 
  isPremium,
  onEdit,
  onDelete 
}: JokeActionsProps) {
  if (!isPremium || authorId !== currentUserId) {
    return null;
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this joke?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('jokes')
        .delete()
        .eq('id', jokeId);

      if (error) throw error;
      
      toast.success('Joke deleted successfully');
      onDelete();
    } catch (error) {
      toast.error('Failed to delete joke');
      console.error('Error deleting joke:', error);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={onEdit}
        className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
        title="Edit joke"
      >
        <Pencil className="w-4 h-4" />
      </button>
      <button
        onClick={handleDelete}
        className="p-1 text-gray-600 hover:text-red-600 transition-colors"
        title="Delete joke"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}