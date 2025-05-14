import React from 'react';
import { Typography, Box } from '@mui/material';
import CampaignDashboard from '../components/CampaignDashboard';

const Campaigns: React.FC = () => (
    <Box sx={{ width: '100%', maxWidth: '100vw', px: { xs: 1, md: 4 }, py: 2 }}>
        <Typography variant="h3" gutterBottom fontWeight={600} sx={{ mb: 3 }}>
            Campaigns
        </Typography>
        <CampaignDashboard />
    </Box>
);

export default Campaigns; 