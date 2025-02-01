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
    Button,
    Grid,
    TextField,
    IconButton,
    Tabs,
    Tab,
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
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState(null);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

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

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = () => {
        setEditMode(false);
        // Add API call to save profile data
    };

    const handleCancel = () => {
        setEditMode(false);
        // Reset any changes
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
            <Box className="profile-container">
                <Paper elevation={0} className="profile-header">
                    <Grid container spacing={3} alignItems="center">
                        <Grid item>
                            <Avatar
                                src="/path-to-profile-image.jpg"
                                className="profile-avatar"
                            />
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h4" className="profile-name">
                                {profileData?.name}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                {profileData?.role}
                            </Typography>
                        </Grid>
                        <Grid item>
                            {!editMode ? (
                                <Button
                                    startIcon={<EditIcon />}
                                    variant="outlined"
                                    onClick={handleEdit}
                                >
                                    Edit Profile
                                </Button>
                            ) : (
                                <Box>
                                    <IconButton color="primary" onClick={handleSave}>
                                        <SaveIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={handleCancel}>
                                        <CancelIcon />
                                    </IconButton>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </Paper>

                <Box className="profile-content">
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        className="profile-tabs"
                    >
                        <Tab icon={<EditIcon />} label="Personal Info" />
                        <Tab icon={<SecurityIcon />} label="Security" />
                        <Tab icon={<NotificationsIcon />} label="Notifications" />
                        <Tab icon={<HistoryIcon />} label="Activity" />
                    </Tabs>

                    <Box className="tab-content">
                        {activeTab === 0 && (
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Full Name"
                                        value={profileData?.name}
                                        disabled={!editMode}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        value={profileData?.email}
                                        disabled={!editMode}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Phone"
                                        value={profileData?.phone}
                                        disabled={!editMode}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Department"
                                        value={profileData?.department}
                                        disabled={!editMode}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Location"
                                        value={profileData?.location}
                                        disabled={!editMode}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Timezone"
                                        value={profileData?.timezone}
                                        disabled={!editMode}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        )}
                        {/* Add other tab contents here */}
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default Profile;
