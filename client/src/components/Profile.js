import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from '../utils/axios';
import {
    Container,
    Box,
    Typography,
    Paper,
    Avatar,
    CircularProgress,
    Button,
    Grid,
    TextField,
    IconButton,
    Tabs,
    Tab,
    Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Edit as EditIcon,
    Save as SaveIcon,
    Cancel as CancelIcon,
    Security as SecurityIcon,
    Notifications as NotificationsIcon,
    History as HistoryIcon,
} from '@mui/icons-material';
import './Profile.css';

const Profile = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        location: '',
        timezone: ''
    });
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        try {
            const response = await axios.get('/api/profile');
            setFormData(response.data);
        } catch (err) {
            setError('Failed to load profile data');
            console.error('Error fetching profile:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        try {
            const response = await axios.put('/api/profile', formData);
            setFormData(response.data);
            setSuccess('Profile updated successfully');
            setIsEditing(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile');
        }
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="md">
            <ToastContainer />
            <Paper sx={{ p: 4, mt: 4 }}>
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <Avatar
                        sx={{
                            width: 100,
                            height: 100,
                            margin: '0 auto',
                            mb: 2,
                            bgcolor: 'primary.main'
                        }}
                    >
                        {formData.name?.charAt(0)}
                    </Avatar>
                    <Typography variant="h5" component="h1">
                        Profile Settings
                    </Typography>
                </Box>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Phone"
                                name="phone"
                                value={formData.phone || ''}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Department"
                                name="department"
                                value={formData.department || ''}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Location"
                                name="location"
                                value={formData.location || ''}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Timezone"
                                name="timezone"
                                value={formData.timezone || ''}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        {isEditing ? (
                            <>
                                <Button onClick={() => setIsEditing(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Save Changes
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setIsEditing(true)}
                            >
                                Edit Profile
                            </Button>
                        )}
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Profile;
