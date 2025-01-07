import React from 'react';
import { Crown, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface User {
  id: string;
  email: string;
  is_premium: boolean;
  created_at: string;
}

interface UserManagementProps {
  users: User[];
  onUserUpdated: () => void;
}

export function UserManagement({ users, onUserUpdated }: UserManagementProps) {
  const togglePremium = async (userId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_premium: !currentStatus })
        .eq('id', userId);

      if (error) throw error;
      
      toast.success('User status updated successfully!');
      onUserUpdated();
    } catch (error) {
      toast.error('Failed to update user status');
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase.auth.admin.deleteUser(userId);
      if (error) throw error;
      
      toast.success('User deleted successfully');
      onUserUpdated();
    } catch (error) {
      toast.error('Failed to delete user');
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Joined
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(user.created_at).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  user.is_premium 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.is_premium ? 'Premium' : 'Standard'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => togglePremium(user.id, user.is_premium)}
                    className={`flex items-center px-3 py-1 rounded-md ${
                      user.is_premium
                        ? 'text-gray-600 hover:text-gray-800'
                        : 'text-blue-600 hover:text-blue-800'
                    }`}
                  >
                    <Crown className="w-4 h-4 mr-1" />
                    {user.is_premium ? 'Remove Premium' : 'Make Premium'}
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="flex items-center px-3 py-1 text-red-600 hover:text-red-800 rounded-md"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}