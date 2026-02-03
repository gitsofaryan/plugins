import { ActionButton } from '@kinvolk/headlamp-plugin/lib/components/common';
import { Utils } from '@kinvolk/headlamp-plugin/lib';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { KafkaTopic } from '../../resources/kafkaTopic';

interface CreateTopicDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function CreateTopicDialog({ open, onClose, onSuccess }: CreateTopicDialogProps) {
    const history = useHistory();
    const [name, setName] = useState('');
    const [namespace, setNamespace] = useState('default');
    const [partitions, setPartitions] = useState(3);
    const [replicas, setReplicas] = useState(1);
    const [error, setError] = useState<string | null>(null);

    const handleCreate = async () => {
        setError(null);
        if (!name || !namespace) {
            setError('Name and Namespace are required');
            return;
        }

        try {
            const topic = {
                apiVersion: KafkaTopic.apiVersion,
                kind: KafkaTopic.kind,
                metadata: {
                    name,
                    namespace,
                    labels: {
                        'strimzi.io/cluster': 'my-cluster',
                    },
                },
                spec: {
                    partitions: Number(partitions),
                    replicas: Number(replicas),
                    config: {
                        'retention.ms': '7200000',
                        'segment.bytes': '1073741824',
                    },
                },
            };

            await KafkaTopic.apiEndpoint.post(topic);
            onSuccess();
            onClose();
            // Navigate to details using cluster-prefixed path to avoid 404
            history.push(Utils.getClusterPrefixedPath(`/strimzi/topics/${namespace}/${name}`));
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Failed to create topic');
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Create Kafka Topic</DialogTitle>
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
                    <TextField
                        label="Partitions"
                        type="number"
                        value={partitions}
                        onChange={e => setPartitions(Number(e.target.value))}
                        fullWidth
                    />
                    <TextField
                        label="Replicas"
                        type="number"
                        value={replicas}
                        onChange={e => setReplicas(Number(e.target.value))}
                        fullWidth
                    />
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
