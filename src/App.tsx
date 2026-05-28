import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';
import Layout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Flashcards from './pages/Flashcards';
import Quiz from './pages/Quiz';
import Games from './pages/Games';
import RecruitingTracker from './pages/RecruitingTracker';
import Hubs from './pages/Hubs';
import HubDashboard from './pages/HubDashboard';
import Game from './pages/Game';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) return null;

  if (!session) return <Login />;

  return (
    <BrowserRouter>
      <Layout onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId" element={<CourseDetail />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/games" element={<Games />} />
          <Route path="/tracker" element={<RecruitingTracker />} />
          <Route path="/hubs" element={<Hubs />} />
          <Route path="/hubs/:hubId" element={<HubDashboard />} />
          <Route path="/hubs/:hubId/game/:sessionId" element={<Game />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
