import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import {
    Container,
    Box,
    Typography,
    Paper,
    Avatar,
    CircularProgress,
    Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState(null);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProfileData(response.data);
                setLoading(false);
            } catch (error) {
                toast.error('Error fetching profile data');
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/signin');
        toast.info('Logged out successfully');
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container component="main" maxWidth="sm">
            <ToastContainer />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Avatar
                        sx={{
                            m: 1,
                            bgcolor: 'primary.main',
                            width: 80,
                            height: 80,
                            fontSize: '2rem',
                        }}
                    >
                        {profileData?.name?.charAt(0)?.toUpperCase()}
                    </Avatar>

                    <Typography component="h1" variant="h4" sx={{ mt: 2 }}>
                        Profile
                    </Typography>

                    <Box sx={{ mt: 3, width: '100%' }}>
                        <Typography variant="h6" color="primary" gutterBottom>
                            Name
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {profileData?.name}
                        </Typography>

                        <Typography variant="h6" color="primary" sx={{ mt: 2 }} gutterBottom>
                            Email
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {profileData?.email}
                        </Typography>

                        <Typography variant="h6" color="primary" sx={{ mt: 2 }} gutterBottom>
                            Account Created
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {new Date(profileData?.createdAt).toLocaleDateString()}
                        </Typography>

                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleLogout}
                            sx={{ mt: 4 }}
                        >
                            Logout
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default Profile;
