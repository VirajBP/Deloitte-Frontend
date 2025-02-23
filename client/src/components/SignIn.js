import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    Link,
    Alert,
    CircularProgress
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // First, try to get the user to check their role
            const user = await axios.post('http://localhost:5000/api/signin', {
                email,
                password
            });

            // If user exists but is not a manufacturer, show error
            if (user.data.user.role === 'user') {
                setError('Please use the user sign-in page');
                setIsLoading(false);
                return;
            }

            // If we get here, proceed with manufacturer sign-in
            const response = await axios.post('http://localhost:5000/api/signin', {
                email,
                password,
                role: 'manufacturer'
            });

            if (response.data && response.data.token) {
                const userData = {
                    ...response.data.user,
                    role: 'manufacturer'
                };
                
                login(userData, response.data.token);

                toast.success('Successfully logged in!', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });

                navigate('/dashboard');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'An error occurred during sign in';
            setError(errorMessage);
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 3000
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <ToastContainer />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Manufacturer Sign In
                </Typography>
                {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                        <Link href="/signup" variant="body2">
                            Don't have an account? Sign Up
                        </Link>
                        <Link href="/user/signin" variant="body2">
                            User Sign In
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default SignIn;
