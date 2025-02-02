import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import ManufacturerDashboard from './components/Dashboard/ManufacturerDashboard';
import UserDashboard from './components/Dashboard/UserDashboard';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import Profile from './components/Profile';
import EmailList from './components/Email/EmailList';
import OrderList from './components/Order/OrderList';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';
import UserSignIn from './components/user/UserSignIn';
import UserSignUp from './components/user/UserSignUp';

// Dashboard component that renders based on userType
const DashboardComponent = () => {
    const { user } = useAuth();
    return user?.userType === 'manufacturer' ? <ManufacturerDashboard /> : <UserDashboard />;
};

// Root component to handle conditional rendering
const Root = () => {
    const { user } = useAuth();
    if (!user) return <Navigate to="/signin" />;
    return <Navigate to="/dashboard" />;
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Root />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/user/signin" element={<UserSignIn />} />
                        <Route path="/user/signup" element={<UserSignUp />} />

                        {/* Protected Routes */}
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Layout>
                                        <DashboardComponent />
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
                        <Route
                            path="/email_list"
                            element={
                                <ProtectedRoute allowedUserType="manufacturer">
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

                        {/* Redirect any other routes to dashboard */}
                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
