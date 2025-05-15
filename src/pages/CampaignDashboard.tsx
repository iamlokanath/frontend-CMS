import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../components/styles/CampaignDashboard.css';
import Navbar from '../components/layouts/Navbar';
// import '../components/styles/Home.css';
type Campaign = {
    _id?: string;
    name: string;
    description: string;
    status: 'active' | 'inactive' | 'deleted';
    leads: string[];
    accountIDs: string[];
};

const API_URL = 'https://backend-cms-seven.vercel.app/campaigns';

const CampaignDashboard: React.FC = () => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [form, setForm] = useState<Partial<Campaign>>({ name: '', description: '', status: 'active', leads: [], accountIDs: [] });
    const [editingId, setEditingId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

    const fetchCampaigns = async () => {
        try {
            const res = await axios.get(API_URL);
            setCampaigns(res.data);
            setError(null);
        } catch (err: any) {
            setError('Could not fetch campaigns. Is the backend running and CORS enabled?');
        }
    };

    useEffect(() => { fetchCampaigns(); }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, key: 'leads' | 'accountIDs') => {
        setForm({ ...form, [key]: e.target.value.split(',').map(s => s.trim()) });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`${API_URL}/${editingId}`, form);
                setEditingId(null);
            } else {
                await axios.post(API_URL, form);
            }
            setForm({ name: '', description: '', status: 'active', leads: [], accountIDs: [] });
            setIsFormVisible(false);
            fetchCampaigns();
        } catch (err) {
            setError('Failed to save campaign. Please try again.');
        }
    };

    const handleEdit = (c: Campaign) => {
        setForm(c);
        setEditingId(c._id!);
        setIsFormVisible(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this campaign?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                fetchCampaigns();
            } catch (err) {
                setError('Failed to delete campaign. Please try again.');
            }
        }
    };

    const handleToggleStatus = async (c: Campaign) => {
        try {
            const newStatus = c.status === 'active' ? 'inactive' : 'active';
            await axios.put(`${API_URL}/${c._id}`, { ...c, status: newStatus });
            fetchCampaigns();
        } catch (err) {
            setError('Failed to update campaign status. Please try again.');
        }
    };

    const filteredCampaigns = filterStatus === 'all'
        ? campaigns
        : campaigns.filter(c => c.status === filterStatus);

    return (
        <>
        <div className='campaign-dashboard'>
            
        <Navbar />
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2>Campaign Management</h2>
                <div className="dashboard-actions">
                    <div className="filter-container">
                        <label htmlFor="filter">Filter:</label>
                        <select
                            id="filter"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
                            className="filter-select"
                        >
                            <option value="all">All</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <button
                        className="primary-btn create-btn"
                        onClick={() => {
                            setForm({ name: '', description: '', status: 'active', leads: [], accountIDs: [] });
                            setEditingId(null);
                            setIsFormVisible(!isFormVisible);
                        }}
                    >
                        {isFormVisible ? 'Cancel' : 'Create Campaign'}
                    </button>
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            {isFormVisible && (
                <div className="campaign-form-container">
                    <h3>{editingId ? 'Edit Campaign' : 'Create New Campaign'}</h3>
                    <form onSubmit={handleSubmit} className="campaign-form">
                        <div className="form-group">
                            <label htmlFor="name">Campaign Name</label>
                            <input
                                id="name"
                                name="name"
                                placeholder="Enter campaign name"
                                value={form.name || ''}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Enter campaign description"
                                value={form.description || ''}
                                onChange={handleChange}
                                required
                                rows={3}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <select
                                id="status"
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="leads">Leads (comma separated)</label>
                            <input
                                id="leads"
                                name="leads"
                                placeholder="e.g., linkedin.com/in/user1, linkedin.com/in/user2"
                                value={form.leads?.join(',') || ''}
                                onChange={e => handleArrayChange(e, 'leads')}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="accountIDs">Account IDs (comma separated)</label>
                            <input
                                id="accountIDs"
                                name="accountIDs"
                                placeholder="e.g., acc123, acc456"
                                value={form.accountIDs?.join(',') || ''}
                                onChange={e => handleArrayChange(e, 'accountIDs')}
                            />
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="primary-btn">
                                {editingId ? 'Update Campaign' : 'Create Campaign'}
                            </button>
                            <button
                                type="button"
                                className="secondary-btn"
                                onClick={() => {
                                    setIsFormVisible(false);
                                    setEditingId(null);
                                    setForm({ name: '', description: '', status: 'active', leads: [], accountIDs: [] });
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="campaigns-grid">
                {filteredCampaigns.length === 0 ? (
                    <div className="no-campaigns">
                        <p>No campaigns found. Create your first campaign to get started!</p>
                    </div>
                ) : (
                    filteredCampaigns.map(c => (
                        <div className="campaign-card" key={c._id}>
                            <div className="campaign-header">
                                <h3>{c.name}</h3>
                                <div className={`status-badge ${c.status}`}>
                                    {c.status}
                                </div>
                            </div>
                            <p className="campaign-description">{c.description}</p>

                            <div className="campaign-details">
                                <div className="detail-group">
                                    <div className="detail-label">Leads:</div>
                                    <div className="detail-value">
                                        {c.leads.length > 0 ? (
                                            <div className="tag-container">
                                                {c.leads.length > 3 ? (
                                                    <>
                                                        {c.leads.slice(0, 2).map((lead, i) => (
                                                            <span key={i} className="tag">{lead}</span>
                                                        ))}
                                                        <span className="tag">+{c.leads.length - 2} more</span>
                                                    </>
                                                ) : (
                                                    c.leads.map((lead, i) => (
                                                        <span key={i} className="tag">{lead}</span>
                                                    ))
                                                )}
                                            </div>
                                        ) : (
                                            <span className="empty-value">No leads added</span>
                                        )}
                                    </div>
                                </div>

                                <div className="detail-group">
                                    <div className="detail-label">Account IDs:</div>
                                    <div className="detail-value">
                                        {c.accountIDs.length > 0 ? (
                                            <div className="tag-container">
                                                {c.accountIDs.length > 3 ? (
                                                    <>
                                                        {c.accountIDs.slice(0, 2).map((id, i) => (
                                                            <span key={i} className="tag">{id}</span>
                                                        ))}
                                                        <span className="tag">+{c.accountIDs.length - 2} more</span>
                                                    </>
                                                ) : (
                                                    c.accountIDs.map((id, i) => (
                                                        <span key={i} className="tag">{id}</span>
                                                    ))
                                                )}
                                            </div>
                                        ) : (
                                            <span className="empty-value">No accounts added</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="campaign-actions">
                                <button
                                    className="action-btn toggle-btn"
                                    onClick={() => handleToggleStatus(c)}
                                >
                                    {c.status === 'active' ? 'Deactivate' : 'Activate'}
                                </button>
                                <button
                                    className="action-btn edit-btn"
                                    onClick={() => handleEdit(c)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="action-btn delete-btn"
                                    onClick={() => handleDelete(c._id!)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
        
        </div>
        
        </>
    );
};

export default CampaignDashboard;