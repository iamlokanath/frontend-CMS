import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { Link as RouterLink } from 'react-router-dom';

const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Campaigns', to: '/campaigns' },
    { label: 'Create Campaign', to: '/create-campaign' },
    { label: 'Message Generator', to: '/message-generator' },
];

const Navbar: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <AppBar position="sticky" color="primary" elevation={2}>
            <Toolbar>
                <Typography
                    variant="h6"
                    component={RouterLink}
                    to="/"
                    sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', fontWeight: 700 }}
                >
                    OutFlo
                </Typography>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    {navLinks.map(link => (
                        <Button key={link.to} color="inherit" component={RouterLink} to={link.to} sx={{ ml: 1 }}>
                            {link.label}
                        </Button>
                    ))}
                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton color="inherit" edge="end" onClick={() => setDrawerOpen(true)}>
                        <MenuIcon />
                    </IconButton>
                </Box>
                <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                    <Box sx={{ width: 220 }} role="presentation" onClick={() => setDrawerOpen(false)}>
                        <List>
                            {navLinks.map(link => (
                                <ListItem key={link.to} disablePadding>
                                    <ListItemButton component={RouterLink} to={link.to}>
                                        <ListItemText primary={link.label} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Drawer>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar; 