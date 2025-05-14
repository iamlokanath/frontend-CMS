import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer: React.FC = () => (
    <Box component="footer" sx={{ width: '100%', py: 3, textAlign: 'center', bgcolor: 'grey.200', mt: 'auto', boxShadow: 1 }}>
        <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} OutFlo. All rights reserved.
        </Typography>
    </Box>
);

export default Footer; 