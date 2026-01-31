import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField,
    Select,
    FormControl,
    InputLabel,
    Box,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import KafkaConnector from '../../resources/kafkaConnector';

export interface CreateConnectorDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function CreateConnectorDialog({ open, onClose, onSuccess }: CreateConnectorDialogProps) {
    const [name, setName] = useState('');
    const [namespace, setNamespace] = useState('kafka');
    const [connectorClass, setConnectorClass] = useState('org.apache.kafka.connect.file.FileStreamSourceConnector');
    const [tasksMax, setTasksMax] = useState(1);
    const [config, setConfig] = useState('{\n  "file": "/opt/kafka/LICENSE",\n  "topic": "my-topic"\n}');
    const [error, setError] = useState<string | null>(null);

    const handleCreate = async () => {
        if (!name || !namespace || !connectorClass) {
            setError('Name, Namespace, and Connector Class are required');
            return;
        }

        let parsedConfig = {};
        try {
            parsedConfig = JSON.parse(config);
        } catch (e) {
            setError('Invalid JSON config');
            return;
        }

        setError(null);

        const connector = {
            apiVersion: KafkaConnector.apiVersion,
            kind: KafkaConnector.kind,
            metadata: {
                name,
                namespace,
                labels: {
                    'strimzi.io/cluster': 'my-connect-cluster' // Assuming a default connect cluster for demo
                }
            },
            spec: {
                class: connectorClass,
                tasksMax: Number(tasksMax),
                config: parsedConfig,
            },
        };

        try {
            await KafkaConnector.apiEndpoint.post(connector);
            onSuccess();
            onClose();
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Failed to create connector');
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Create Kafka Connector</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" gap={2} mt={1}>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Namespace"
                        value={namespace}
                        onChange={(e) => setNamespace(e.target.value)}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Connector Class"
                        value={connectorClass}
                        onChange={(e) => setConnectorClass(e.target.value)}
                        fullWidth
                        helperText="e.g. org.apache.kafka.connect.file.FileStreamSourceConnector"
                    />
                    <TextField
                        label="Tasks Max"
                        type="number"
                        value={tasksMax}
                        onChange={(e) => setTasksMax(Number(e.target.value))}
                        fullWidth
                    />
                    <TextField
                        label="Config (JSON)"
                        value={config}
                        onChange={(e) => setConfig(e.target.value)}
                        multiline
                        rows={4}
                        fullWidth
                        helperText="Enter connector configuration as JSON"
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
