import { ActionButton } from '@kinvolk/headlamp-plugin/lib/components/common';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { KafkaUser } from '../../resources/kafkaUser';

interface CreateUserDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function CreateUserDialog({ open, onClose, onSuccess }: CreateUserDialogProps) {
    const [name, setName] = useState('');
    const [namespace, setNamespace] = useState('default');
    const [authType, setAuthType] = useState('tls');
    const [error, setError] = useState<string | null>(null);

    const handleCreate = async () => {
        setError(null);
        if (!name || !namespace) {
            setError('Name and Namespace are required');
            return;
        }

        try {
            const user = {
                apiVersion: KafkaUser.apiVersion,
                kind: KafkaUser.kind,
                metadata: {
                    name,
                    namespace,
                    labels: {
                        'strimzi.io/cluster': 'my-cluster', // Placeholder
                    },
                },
                spec: {
                    authentication: {
                        type: authType,
                    },
                },
            };

            await KafkaUser.apiEndpoint.post(user);
            onSuccess();
            onClose();
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Failed to create user');
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Create Kafka User</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" gap={2} mt={1}>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        fullWidth
                        required
                        autoFocus
                    />
                    <TextField
                        label="Namespace"
                        value={namespace}
                        onChange={e => setNamespace(e.target.value)}
                        fullWidth
                        required
                    />
                    <FormControl fullWidth>
                        <InputLabel id="auth-type-label">Authentication Type</InputLabel>
                        <Select
                            labelId="auth-type-label"
                            value={authType}
                            label="Authentication Type"
                            onChange={e => setAuthType(e.target.value)}
                        >
                            <MenuItem value="tls">TLS</MenuItem>
                            <MenuItem value="scram-sha-512">SCRAM-SHA-512</MenuItem>
                        </Select>
                    </FormControl>
                    {error && (
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleCreate} color="primary" variant="contained">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
}
