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
            const response = await axios.post('http://localhost:5000/api/signin', {
                email,
                password
            });

            if (response.data && response.data.token) {
                // First store the user data
                login(response.data.user, response.data.token);

                toast.success('Successfully logged in!', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });

                // Navigate immediately after successful login
                navigate('/profile');
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Invalid credentials';
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
                    Sign In
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
                        {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
                    </Button>
                    <Link href="/signup" variant="body2">
                        Don't have an account? Sign Up
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};

export default SignIn;
