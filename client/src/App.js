import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import EmailList from './components/Email/EmailList';
import OrderList from './components/Order/OrderList';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';

// Root component to handle conditional rendering
const Root = () => {
  const { user } = useAuth();
  return user ? <Layout><Dashboard /></Layout> : <SignIn />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/email_list"
              element={
                <ProtectedRoute>
                  <Layout>
                    <EmailList />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/order_list"
              element={
                <ProtectedRoute>
                  <Layout>
                    <OrderList />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Profile />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Root />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
