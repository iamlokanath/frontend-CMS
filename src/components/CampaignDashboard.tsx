import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef, GridActionsCellItem, GridValueGetter } from '@mui/x-data-grid';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Switch, Stack, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

// Type for campaign
type Campaign = {
    _id?: string;
    name: string;
    description: string;
    status: 'active' | 'inactive' | 'deleted';
    leads: string[];
    accountIDs: string[];
};

const API_URL = 'http://localhost:5000/campaigns';

const CampaignDashboard: React.FC = () => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [form, setForm] = useState<Partial<Campaign>>({ name: '', description: '', status: 'active', leads: [], accountIDs: [] });
    const [editingId, setEditingId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);

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

    const handleArrayChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        key: 'leads' | 'accountIDs'
    ) => {
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
        setOpen(false);
        fetchCampaigns();
    };

    const handleEdit = (c: Campaign) => {
        setForm(c);
        setEditingId(c._id!);
        setOpen(true);
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

    const leadsValueGetter: GridValueGetter = (params: any) => (params.row && Array.isArray(params.row.leads) ? params.row.leads.join(', ') : '');
    const accountIDsValueGetter: GridValueGetter = (params: any) => (params.row && Array.isArray(params.row.accountIDs) ? params.row.accountIDs.join(', ') : '');

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', flex: 1, minWidth: 120 },
        { field: 'description', headerName: 'Description', flex: 2, minWidth: 180 },
        {
            field: 'status',
            headerName: 'Status',
            minWidth: 120,
            renderCell: (params) => (
                <Switch
                    checked={params.value === 'active'}
                    onChange={() => handleToggleStatus(params.row)}
                    color="primary"
                />
            ),
        },
        {
            field: 'leads',
            headerName: 'Leads',
            flex: 1,
            minWidth: 120,
            valueGetter: leadsValueGetter,
        },
        {
            field: 'accountIDs',
            headerName: 'Account IDs',
            flex: 1,
            minWidth: 120,
            valueGetter: accountIDsValueGetter,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            minWidth: 120,
            getActions: (params) => [
                <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={() => handleEdit(params.row)} />,
                <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => handleDelete(params.row._id!)} />,
            ],
        },
    ];

    return (
        <Box sx={{ width: '100%', bgcolor: 'white', borderRadius: 2, boxShadow: 2, p: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" fontWeight={600}>Campaigns</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setForm({ name: '', description: '', status: 'active', leads: [], accountIDs: [] }); setEditingId(null); setOpen(true); }}>
                    Add Campaign
                </Button>
            </Stack>
            {error && <Box color="error.main" mb={2}>{error}</Box>}
            <DataGrid
                autoHeight
                rows={campaigns.map(c => ({ ...c, id: c._id }))}
                columns={columns}
                initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                pageSizeOptions={[5, 10, 20]}
                disableRowSelectionOnClick
                sx={{
                    '& .MuiDataGrid-row:hover': { backgroundColor: '#f5f5f5' },
                    minHeight: 350,
                }}
            />
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>{editingId ? 'Edit Campaign' : 'Create Campaign'}</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField name="name" label="Name" value={form.name || ''} onChange={handleChange} required fullWidth margin="normal" />
                        <TextField name="description" label="Description" value={form.description || ''} onChange={handleChange} required fullWidth margin="normal" />
                        <TextField name="leads" label="Leads (comma separated URLs)" value={form.leads?.join(',') || ''} onChange={e => handleArrayChange(e, 'leads')} fullWidth margin="normal" />
                        <TextField name="accountIDs" label="Account IDs (comma separated)" value={form.accountIDs?.join(',') || ''} onChange={e => handleArrayChange(e, 'accountIDs')} fullWidth margin="normal" />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" variant="contained">{editingId ? 'Update' : 'Create'}</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
};

export default CampaignDashboard; 