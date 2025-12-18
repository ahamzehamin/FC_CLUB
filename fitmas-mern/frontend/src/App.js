import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';

// Admin Components
import { AuthProvider, useAuth } from './admin/context/AuthContext';
import AdminLayout from './admin/components/AdminLayout';
import AdminLogin from './admin/pages/AdminLogin';
import Dashboard from './admin/pages/Dashboard';
import BlogList from './admin/pages/BlogList';
import AddBlog from './admin/pages/AddBlog';
import EditBlog from './admin/pages/EditBlog';
import ContentList from './admin/pages/ContentList';

// Public Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Preloader from './components/Preloader/Preloader';

// Public Pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import ServiceDetails from './pages/ServiceDetails/ServiceDetails';
import Team from './pages/Team/Team';
import TeamDetails from './pages/TeamDetails/TeamDetails';
import Blog from './pages/Blog/Blog';
import BlogDetails from './pages/BlogDetails/BlogDetails';
import Contact from './pages/Contact/Contact';
import Pricing from './pages/Pricing/Pricing';
import Gallery from './pages/Gallery/Gallery';
import ErrorPage from './pages/Error/ErrorPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="loading-spinner" style={{
      width: '40px',
      height: '40px',
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #007bff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '100px auto'
    }}></div>;
  }

  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('App loaded, showing preloader');
    // Simulate preloader timing (or remove for instant loading)
    const timer = setTimeout(() => {
      console.log('Preloader timeout reached, hiding preloader');
      setIsLoading(false);
    }, 1000); // 1 second preloader

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    console.log('Rendering preloader component');
    return <Preloader />;
  }

  return (
    <div className="App">
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/blogs" element={
          <ProtectedRoute>
            <AdminLayout>
              <BlogList />
            </AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/blogs/add" element={
          <ProtectedRoute>
            <AdminLayout>
              <AddBlog />
            </AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/blogs/edit/:id" element={
          <ProtectedRoute>
            <AdminLayout>
              <EditBlog />
            </AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/content" element={
          <ProtectedRoute>
            <AdminLayout>
              <ContentList />
            </AdminLayout>
          </ProtectedRoute>
        } />

        {/* Public Routes */}
        <Route path="/*" element={
          <>
            <Header />
            <main>
              <Routes>
                {/* Home Pages */}
                <Route path="/" element={<Home />} />
                <Route path="/home-2" element={<Home variant="home-2" />} />
                <Route path="/home-3" element={<Home variant="home-3" />} />

                {/* Main Pages */}
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:slug" element={<ServiceDetails />} />
                <Route path="/team" element={<Team />} />
                <Route path="/team/:slug" element={<TeamDetails />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogDetails />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/pricing" element={<Pricing />} />

                {/* Gallery Pages */}
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/gallery-2" element={<Gallery variant="gallery-2" />} />

                {/* Projects Pages (using Gallery for now) */}
                <Route path="/projects" element={<Gallery />} />
                <Route path="/projects/:slug" element={<Gallery />} />

                {/* 404 Error Page */}
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </main>
            <Footer />
          </>
        } />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
