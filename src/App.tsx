import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Auth } from './components/Auth';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { PremiumFeatures } from './components/PremiumFeatures';
import { useAuth } from './hooks/useAuth';
import { useJokes } from './hooks/useJokes';
import { usePremiumStatus } from './hooks/usePremiumStatus';
import { AdminPanel } from './pages/AdminPanel';
import { AdminRoute } from './components/AdminRoute';
import { JokeCard } from './components/JokeCard';
import { Shield } from 'lucide-react';

function HomePage() {
  const session = useAuth();
  const { isPremium, loading: premiumLoading } = usePremiumStatus(session?.user?.id);
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const { jokes, loading, refetchJokes } = useJokes(selectedCategory, session);

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Header isAuthenticated={false} />
          <Auth />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Header isAuthenticated={true} isPremium={isPremium} />
        {session?.user?.email === 'admin3180@gmail.com' && (
          <Link
            to="/admin"
            className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-700"
          >
            <Shield className="w-4 h-4 mr-2" />
            Admin Panel
          </Link>
        )}
        
        <PremiumFeatures isPremium={isPremium} />
        <CategoryFilter value={selectedCategory} onChange={setSelectedCategory} />
        
        {loading || premiumLoading ? (
          <div className="text-center py-12">Loading jokes...</div>
        ) : jokes.length === 0 ? (
          <div className="text-center py-12 text-gray-600">
            No jokes found in this category.
          </div>
        ) : (
          jokes.map((joke) => (
            <JokeCard
              key={joke.id}
              joke={joke}
              onVote={refetchJokes}
              userId={session.user.id}
              userIsPremium={isPremium}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />
      </Routes>
      <Toaster position="top-right" />
    </Router>
  );
}