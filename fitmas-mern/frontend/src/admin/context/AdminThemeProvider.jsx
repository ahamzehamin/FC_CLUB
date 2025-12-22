import React, { createContext, useContext, useEffect, useState, Suspense } from 'react';

// Lazy load libraries
const loadLibraries = async () => {
  try {
    // Import chartist
    await import('chartist');
  } catch (e) {
    console.warn('Chartist library not available:', e);
  }

  try {
    // Import metismenu
    await import('metismenujs');
  } catch (e) {
    console.warn('MetisMenu library not available:', e);
  }

  try {
    // Import bootstrap datepicker
    await import('bootstrap-datepicker');
  } catch (e) {
    console.warn('Bootstrap Datepicker not available:', e);
  }

  try {
    // Import jQuery for compatibility
    await import('jquery');
  } catch (e) {
    console.warn('jQuery not available:', e);
  }
};

const AdminThemeContext = createContext();

export const useAdminTheme = () => {
  const context = useContext(AdminThemeContext);
  if (!context) {
    throw new Error('useAdminTheme must be used within AdminThemeProvider');
  }
  return context;
};

export const AdminThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [librariesLoaded, setLibrariesLoaded] = useState(false);

  useEffect(() => {
    // Load admin libraries lazily
    const loadAdminLibraries = async () => {
      try {
        await loadLibraries();
        setLibrariesLoaded(true);
      } catch (error) {
        console.error('Failed to load admin libraries:', error);
      }
    };

    loadAdminLibraries();

    // Load theme from localStorage
    const savedTheme = localStorage.getItem('admin-theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('admin-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const value = {
    theme,
    toggleTheme,
    librariesLoaded,
  };

  return (
    <AdminThemeContext.Provider value={value}>
      <Suspense fallback={<div>Loading admin libraries...</div>}>
        {children}
      </Suspense>
    </AdminThemeContext.Provider>
  );
};

export default AdminThemeProvider;
