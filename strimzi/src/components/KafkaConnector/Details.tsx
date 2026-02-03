import { ActionButton, MainInfoSection, SectionBox, SimpleTable } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { useParams } from 'react-router-dom';
import KafkaConnector from '../../resources/kafkaConnector';
import { useEffect, useState } from 'react';
import { Typography, Grid, Button } from '@mui/material';

export function KafkaConnectorDetails() {
    const { name, namespace } = useParams<{ name: string; namespace: string }>();
    const [item, setItem] = useState<any>(null);

    const refresh = () => {
        if (name && namespace) {
            // @ts-ignore
            KafkaConnector.apiEndpoint.get(namespace, name).then(setItem).catch(console.error);
        }
    };

    useEffect(() => {
        refresh();
        const interval = setInterval(refresh, 5000); // Auto refresh
        return () => clearInterval(interval);
    }, [name, namespace]);

    if (!item) {
        return <Typography>Loading...</Typography>;
    }

    const tasks = item.status?.connectorStatus?.tasks || [];

    const restartConnector = async () => {
        try {
            await item.patch({
                metadata: {
                    annotations: {
                        'strimzi.io/restart-connector': 'true'
                    }
                }
            });
            alert('Restarting connector...');
        } catch (err) {
            console.error(err);
            alert('Failed to restart connector');
        }
    };

    const restartTask = async (taskId: number) => {
        try {
            await item.patch({
                metadata: {
                    annotations: {
                        'strimzi.io/restart-task': taskId.toString()
                    }
                }
            });
            alert(`Restarting task ${taskId}...`);
        } catch (err) {
            console.error(err);
            alert(`Failed to restart task ${taskId}`);
        }
    };

    return (
        <>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h4" gutterBottom>
                        {item.metadata.name}
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="secondary" onClick={restartConnector}>
                        Restart Connector
                    </Button>
                </Grid>
            </Grid>
            <MainInfoSection resource={item} />
            <SectionBox title="Spec">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">Class</Typography>
                        <Typography>{item.spec?.class || 'N/A'}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle2">Tasks Max</Typography>
                        <Typography>{item.spec?.tasksMax || 0}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">Config</Typography>
                        <pre style={{ backgroundColor: '#f5f5f5', padding: '10px' }}>
                            {JSON.stringify(item.spec?.config || {}, null, 2)}
                        </pre>
                    </Grid>
                </Grid>
            </SectionBox>
            <SectionBox title="Status">
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="subtitle2">Connector State</Typography>
                        <Typography color={item.status?.connectorStatus?.connector?.state === 'RUNNING' ? 'success.main' : 'error.main'}>
                            {item.status?.connectorStatus?.connector?.state || 'Unknown'}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle2">Worker ID</Typography>
                        <Typography>{item.status?.connectorStatus?.connector?.worker_id || 'Unknown'}</Typography>
                    </Grid>
                </Grid>
            </SectionBox>
            <SectionBox title="Tasks">
                {tasks.length > 0 ? (
                    <SimpleTable
                        columns={[
                            { label: 'ID', getter: (t: any) => t.id },
                            { label: 'State', getter: (t: any) => t.state },
                            { label: 'Worker', getter: (t: any) => t.worker_id },
                            {
                                label: 'Action',
                                getter: (t: any) => (
                                    <Button size="small" variant="outlined" onClick={() => restartTask(t.id)}>
                                        Restart Task
                                    </Button>
                                )
                            }
                        ]}
                        data={tasks}
                    />
                ) : (
                    <Typography>No tasks found.</Typography>
                )}
            </SectionBox>
        </>
    );
}
