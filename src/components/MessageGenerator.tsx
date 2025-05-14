import React, { useState } from 'react';
import axios from 'axios';
import { Stack, TextField, Button, Box, Typography, Paper } from '@mui/material';

const API_URL = 'http://localhost:5000/personalized-message';

const defaultInput = {
    name: 'John Doe',
    job_title: 'Software Engineer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    summary: 'Experienced in AI & ML...'
};

type InputType = typeof defaultInput;

const MessageGenerator: React.FC = () => {
    const [input, setInput] = useState<InputType>(defaultInput);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            const res = await axios.post(API_URL, input);
            setMessage(res.data.message);
        } catch {
            setMessage('Error generating message');
        }
        setLoading(false);
    };

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField name="name" label="Name" value={input.name} onChange={handleChange} required fullWidth />
                    <TextField name="job_title" label="Job Title" value={input.job_title} onChange={handleChange} required fullWidth />
                    <TextField name="company" label="Company" value={input.company} onChange={handleChange} required fullWidth />
                    <TextField name="location" label="Location" value={input.location} onChange={handleChange} required fullWidth />
                    <TextField name="summary" label="Summary" value={input.summary} onChange={handleChange} required fullWidth multiline minRows={2} />
                    <Button type="submit" variant="contained" color="primary" disabled={loading} size="large">{loading ? 'Generating...' : 'Generate Message'}</Button>
                </Stack>
            </form>
            {message && (
                <Paper elevation={2} sx={{ background: '#f0f4ff', p: 2, borderRadius: 2, mt: 3 }}>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>Generated Message:</Typography>
                    <Typography variant="body1">{message}</Typography>
                </Paper>
            )}
        </Box>
    );
};

export default MessageGenerator; 