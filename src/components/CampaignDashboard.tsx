import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, key: 'leads' | 'accountIDs') => {
        setForm({ ...form, [key]: e.target.value.split(',').map(s => s.trim()) });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            await axios.put(`${API_URL}/${editingId}`, form);
            setEditingId(null);
        } else {
            await axios.post(API_URL, form);
        }
        setForm({ name: '', description: '', status: 'active', leads: [], accountIDs: [] });
        fetchCampaigns();
    };

    const handleEdit = (c: Campaign) => {
        setForm(c);
        setEditingId(c._id!);
    };

    const handleDelete = async (id: string) => {
        await axios.delete(`${API_URL}/${id}`);
        fetchCampaigns();
    };

    const handleToggleStatus = async (c: Campaign) => {
        const newStatus = c.status === 'active' ? 'inactive' : 'active';
        await axios.put(`${API_URL}/${c._id}`, { ...c, status: newStatus });
        fetchCampaigns();
    };

    return (
        <div>
            <h2>Campaigns</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
                <input name="name" placeholder="Name" value={form.name || ''} onChange={handleChange} required />
                <input name="description" placeholder="Description" value={form.description || ''} onChange={handleChange} required />
                <input name="leads" placeholder="Leads (comma separated URLs)" value={form.leads?.join(',') || ''} onChange={e => handleArrayChange(e, 'leads')} />
                <input name="accountIDs" placeholder="Account IDs (comma separated)" value={form.accountIDs?.join(',') || ''} onChange={e => handleArrayChange(e, 'accountIDs')} />
                <button type="submit">{editingId ? 'Update' : 'Create'} Campaign</button>
                {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ name: '', description: '', status: 'active', leads: [], accountIDs: [] }); }}>Cancel</button>}
            </form>
            <table border={1} cellPadding={6} style={{ width: '100%', marginBottom: 20 }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Leads</th>
                        <th>Account IDs</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {campaigns.map(c => (
                        <tr key={c._id}>
                            <td>{c.name}</td>
                            <td>{c.description}</td>
                            <td>
                                <button onClick={() => handleToggleStatus(c)}>{c.status}</button>
                            </td>
                            <td>{c.leads.join(', ')}</td>
                            <td>{c.accountIDs.join(', ')}</td>
                            <td>
                                <button onClick={() => handleEdit(c)}>Edit</button>
                                <button onClick={() => handleDelete(c._id!)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CampaignDashboard; 