import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../utils/axios';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'user'
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
    setError('');
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...signupData } = formData;
      const response = await axios.post('/api/auth/signup', signupData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userType', response.data.userType);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during signup');
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
          Sign Up
        </Typography>
        {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            label="Full Name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
            disabled={isLoading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email Address"
            autoComplete="email"
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
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={isLoading}
            error={formData.password !== formData.confirmPassword && formData.confirmPassword !== ''}
            helperText={
              formData.password !== formData.confirmPassword && formData.confirmPassword !== ''
                ? 'Passwords do not match'
                : ''
            }
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>User Type</InputLabel>
            <Select
              name="userType"
              value={formData.userType}
              label="User Type"
              onChange={handleChange}
              disabled={isLoading}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="manufacturer">Manufacturer</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </Button>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link to="/signin" style={{ color: 'primary.main', textDecoration: 'none' }}>
                Sign In
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp; 