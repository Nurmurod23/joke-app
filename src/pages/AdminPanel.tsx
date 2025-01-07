import React, { useState } from 'react';
import { JokeForm } from '../components/JokeForm';
import { AdminJokeCard } from '../components/AdminJokeCard';
import { UserManagement } from '../components/UserManagement';
import { CategoryManagement } from '../components/admin/CategoryManagement';
import { useAuth } from '../hooks/useAuth';
import { useAdminJokes } from '../hooks/useAdminJokes';
import { useUsers } from '../hooks/useUsers';
import { useCategories } from '../hooks/useCategories';
import { Shield, Users, BookOpen, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

type Tab = 'jokes' | 'users' | 'categories';

export function AdminPanel() {
  const session = useAuth();
  const { jokes, loading: jokesLoading, refetchJokes } = useAdminJokes();
  const { users, loading: usersLoading, refetchUsers } = useUsers();
  const { categories, loading: categoriesLoading, refetchCategories } = useCategories();
  const [activeTab, setActiveTab] = useState<Tab>('jokes');

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Shield className="text-blue-600 w-8 h-8 mr-2" />
            <h1 className="text-2xl font-bold">Admin Panel</h1>
          </div>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Back to Home
          </Link>
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('jokes')}
            className={`flex items-center px-4 py-2 rounded-md ${
              activeTab === 'jokes'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Manage Jokes
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center px-4 py-2 rounded-md ${
              activeTab === 'users'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Users className="w-4 h-4 mr-2" />
            Manage Users
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`flex items-center px-4 py-2 rounded-md ${
              activeTab === 'categories'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Tag className="w-4 h-4 mr-2" />
            Manage Categories
          </button>
        </div>

        {activeTab === 'jokes' && (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Add New Joke</h2>
              <JokeForm onJokeAdded={refetchJokes} session={session} />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Manage Jokes</h2>
              {jokesLoading ? (
                <div className="text-center py-12">Loading jokes...</div>
              ) : jokes.length === 0 ? (
                <div className="text-center py-12 text-gray-600">
                  No jokes found.
                </div>
              ) : (
                jokes.map((joke) => (
                  <AdminJokeCard
                    key={joke.id}
                    joke={joke}
                    onJokeUpdated={refetchJokes}
                  />
                ))
              )}
            </div>
          </>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
            {usersLoading ? (
              <div className="text-center py-12">Loading users...</div>
            ) : users.length === 0 ? (
              <div className="text-center py-12 text-gray-600">
                No users found.
              </div>
            ) : (
              <UserManagement users={users} onUserUpdated={refetchUsers} />
            )}
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Manage Categories</h2>
            {categoriesLoading ? (
              <div className="text-center py-12">Loading categories...</div>
            ) : (
              <CategoryManagement 
                categories={categories} 
                onCategoryUpdated={refetchCategories} 
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}