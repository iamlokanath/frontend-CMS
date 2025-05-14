import React from 'react';
import { Typography, Box, Paper } from '@mui/material';
import MessageGenerator from '../components/MessageGenerator';

const MessageGeneratorPage: React.FC = () => (
    <Box sx={{ width: '100%', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', py: 4 }}>
        <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, width: '100%', maxWidth: 500 }}>
            <Typography variant="h4" gutterBottom fontWeight={600} align="center">LinkedIn Message Generator</Typography>
            <MessageGenerator />
        </Paper>
    </Box>
);

export default MessageGeneratorPage; 