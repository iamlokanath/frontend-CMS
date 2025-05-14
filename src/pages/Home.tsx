import React from 'react';
import { Box, Typography, Button, Stack, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link as RouterLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const features = [
    {
        icon: <DashboardIcon color="primary" sx={{ fontSize: 40 }} />,
        title: 'Campaign Management Dashboard',
        desc: 'Easily manage, edit, and track your outreach campaigns.'
    },
    {
        icon: <SmartToyIcon color="secondary" sx={{ fontSize: 40 }} />,
        title: 'AI-powered LinkedIn Message Generator',
        desc: 'Generate personalized messages for your leads in seconds.'
    },
    {
        icon: <SyncAltIcon color="primary" sx={{ fontSize: 40 }} />,
        title: 'Status toggling & soft delete',
        desc: 'Quickly activate, deactivate, or soft-delete campaigns.'
    },
    {
        icon: <RocketLaunchIcon color="secondary" sx={{ fontSize: 40 }} />,
        title: 'Modern, responsive UI',
        desc: 'Enjoy a beautiful, device-friendly experience everywhere.'
    }
];

const Home: React.FC = () => (
    <Box>
        <Box
            sx={{
                width: '100%',
                minHeight: { xs: 320, md: 380 },
                py: { xs: 6, md: 8 },
                px: 2,
                mb: 6,
                background: 'linear-gradient(90deg, #1976d2 0%, #9c27b0 100%)',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 3,
                boxShadow: 3
            }}
        >
            <Typography variant="h2" align="center" fontWeight={700} gutterBottom>
                Welcome to OutFlo
            </Typography>
            <Typography variant="h5" align="center" sx={{ maxWidth: 700, mb: 3 }}>
                The next-gen AI outreach tool for sales teams. Manage campaigns, generate personalized LinkedIn messages, and boost your sales outreach.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" mt={2}>
                <Button variant="contained" color="secondary" size="large" component={RouterLink} to="/campaigns">
                    View Campaigns
                </Button>
                <Button variant="outlined" color="inherit" size="large" component={RouterLink} to="/message-generator">
                    Message Generator
                </Button>
            </Stack>
        </Box>
        <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom align="center">Features</Typography>
            <Grid container spacing={3} justifyContent="center">
                {features.map((f, i) => (
                    // <Grid item xs={12} sm={6} md={3} key={i}>
                    <Paper elevation={3} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                        {f.icon}
                        <Typography variant="h6" sx={{ mt: 1 }}>{f.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{f.desc}</Typography>
                    </Paper>
                    // </Grid>
                ))}
            </Grid>
        </Box>
    </Box>
);

export default Home; 