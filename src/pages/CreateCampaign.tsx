import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Stack } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/campaigns';

const CreateCampaign: React.FC = () => {
    const [form, setForm] = useState({
        name: '',
        description: '',
        status: 'active',
        leads: '',
        accountIDs: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await axios.post(API_URL, {
                name: form.name,
                description: form.description,
                status: form.status,
                leads: form.leads.split(',').map(s => s.trim()),
                accountIDs: form.accountIDs.split(',').map(s => s.trim())
            });
            navigate('/campaigns');
        } catch (err: any) {
            setError('Could not create campaign. Please check your input and try again.');
        }
        setLoading(false);
    };

    return (
        <Box>
            <Paper elevation={2} sx={{ p: 3, mb: 3, maxWidth: 600, mx: 'auto' }}>
                <Typography variant="h4" gutterBottom>Create Campaign</Typography>
                {error && <Typography color="error">{error}</Typography>}
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField name="name" label="Name" value={form.name} onChange={handleChange} required fullWidth />
                        <TextField name="description" label="Description" value={form.description} onChange={handleChange} required fullWidth />
                        <TextField name="leads" label="Leads (comma separated URLs)" value={form.leads} onChange={handleChange} fullWidth />
                        <TextField name="accountIDs" label="Account IDs (comma separated)" value={form.accountIDs} onChange={handleChange} fullWidth />
                        <Button type="submit" variant="contained" color="primary" disabled={loading}>{loading ? 'Creating...' : 'Create Campaign'}</Button>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
};

export default CreateCampaign; 