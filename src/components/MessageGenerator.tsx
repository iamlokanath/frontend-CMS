import React, { useState } from 'react';
import axios from 'axios';

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
        <div>
            <h2>LinkedIn Message Generator</h2>
            <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
                <input name="name" placeholder="Name" value={input.name} onChange={handleChange} required />
                <input name="job_title" placeholder="Job Title" value={input.job_title} onChange={handleChange} required />
                <input name="company" placeholder="Company" value={input.company} onChange={handleChange} required />
                <input name="location" placeholder="Location" value={input.location} onChange={handleChange} required />
                <textarea name="summary" placeholder="Summary" value={input.summary} onChange={handleChange} required />
                <button type="submit" disabled={loading}>{loading ? 'Generating...' : 'Generate Message'}</button>
            </form>
            {message && (
                <div style={{ background: '#f0f0f0', padding: 10, borderRadius: 4 }}>
                    <strong>Generated Message:</strong>
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
};

export default MessageGenerator; 