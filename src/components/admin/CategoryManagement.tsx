import React, { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

interface Category {
  id: string;
  name: string;
}

interface CategoryManagementProps {
  categories: Category[];
  onCategoryUpdated: () => void;
}

export function CategoryManagement({ categories, onCategoryUpdated }: CategoryManagementProps) {
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('categories')
        .insert([{ name: newCategory }]);

      if (error) throw error;
      
      toast.success('Category added successfully');
      setNewCategory('');
      onCategoryUpdated();
    } catch (error) {
      toast.error('Failed to add category');
      console.error('Error adding category:', error);
    }
  };

  const handleUpdate = async (id: string, newName: string) => {
    try {
      const { error } = await supabase
        .from('categories')
        .update({ name: newName })
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Category updated successfully');
      setEditingCategory(null);
      onCategoryUpdated();
    } catch (error) {
      toast.error('Failed to update category');
      console.error('Error updating category:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure? This will affect all jokes in this category.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Category deleted successfully');
      onCategoryUpdated();
    } catch (error) {
      toast.error('Failed to delete category');
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category name"
          className="input-field flex-1"
          required
        />
        <button type="submit" className="button-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </button>
      </form>

      <div className="divide-y">
        {categories.map((category) => (
          <div key={category.id} className="py-3 flex items-center justify-between">
            {editingCategory?.id === category.id ? (
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  className="input-field flex-1"
                />
                <button
                  onClick={() => handleUpdate(category.id, editingCategory.name)}
                  className="p-2 text-green-600 hover:text-green-700"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setEditingCategory(null)}
                  className="p-2 text-gray-600 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <span>{category.name}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingCategory(category)}
                    className="p-2 text-blue-600 hover:text-blue-700"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}