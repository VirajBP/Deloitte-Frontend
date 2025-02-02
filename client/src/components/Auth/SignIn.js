import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Alert 
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../utils/axios';
import { useAuth } from '../../context/AuthContext';

function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/auth/signin', formData);
      const { token, userType, user } = response.data;

      if (token && userType) {
        // Store auth data
        localStorage.setItem('token', token);
        localStorage.setItem('userType', userType);

        // Update auth context
        login({
          token,
          userType,
          ...user
        });

        // Navigate to dashboard
        navigate('/dashboard', { replace: true });
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
        err.message || 
        'An error occurred during sign in';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
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
            name="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
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
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Link to="/signup" style={{ color: 'primary.main', textDecoration: 'none' }}>
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn; 