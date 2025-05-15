import React, { useState } from 'react';
import axios from 'axios';
import '../components/styles/MessageGenerator.css';
import Navbar from '../components/layouts/Navbar';
// import '../components/styles/Home.css';

const API_URL = 'https://backend-cms-seven.vercel.app/personalized-message';

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
    const [copied, setCopied] = useState(false);

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
        } catch (error) {
            setMessage('Error generating message. Please try again later.');
        }
        setLoading(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(message);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const resetForm = () => {
        setInput(defaultInput);
        setMessage('');
    };

    return (
        <>
            <div className='App'>
                <Navbar />

                <div className="generator-container">
                    <div className="generator-header">
                        <h2>LinkedIn Message Generator</h2>
                    </div>

                    <p className="generator-description">
                        Generate personalized LinkedIn connection messages tailored to prospects based on their profile information.
                        Our AI algorithm creates engaging and relevant messages to increase your connection acceptance rate.
                    </p>

                    <div className="generator-form-container">
                        <form onSubmit={handleSubmit} className="generator-form">
                            <div className="form-group">
                                <label htmlFor="name">Prospect Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    placeholder="Enter prospect's name"
                                    value={input.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="job_title">Job Title</label>
                                <input
                                    id="job_title"
                                    name="job_title"
                                    placeholder="Enter prospect's job title"
                                    value={input.job_title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="company">Company</label>
                                <input
                                    id="company"
                                    name="company"
                                    placeholder="Enter prospect's company"
                                    value={input.company}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="location">Location</label>
                                <input
                                    id="location"
                                    name="location"
                                    placeholder="Enter prospect's location"
                                    value={input.location}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="summary">Profile Summary/Highlights</label>
                                <textarea
                                    id="summary"
                                    name="summary"
                                    placeholder="Enter key points from prospect's profile summary or highlights"
                                    value={input.summary}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                />
                            </div>

                            <div className="form-actions">
                                <button
                                    type="button"
                                    className="secondary-btn"
                                    onClick={resetForm}
                                >
                                    Reset
                                </button>
                                <button
                                    type="submit"
                                    className="primary-btn"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="loading-indicator">
                                            <span className="loading-spinner"></span>
                                            Generating...
                                        </span>
                                    ) : (
                                        'Generate Message'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {message && (
                        <div className="message-result-container">
                            <div className="message-result-header">
                                <h3>Generated Message</h3>
                                {copied && <span className="copied-indicator">Copied!</span>}
                            </div>
                            <div className="message-content">
                                {message}
                            </div>
                            <div className="message-actions">
                                <button
                                    className="copy-button"
                                    onClick={copyToClipboard}
                                >
                                    Copy to clipboard
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default MessageGenerator;