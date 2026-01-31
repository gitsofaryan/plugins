import { ActionButton, MainInfoSection, SectionBox } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { useParams } from 'react-router-dom';
import KafkaConnector from '../../resources/kafkaConnector';
import { useEffect, useState } from 'react';
import { Typography, Grid } from '@mui/material';

export function KafkaConnectorDetails() {
    const { name, namespace } = useParams<{ name: string; namespace: string }>();
    const [item, setItem] = useState<any>(null);

    useEffect(() => {
        if (name && namespace) {
            // @ts-ignore
            KafkaConnector.apiEndpoint.get(namespace, name).then(setItem).catch(console.error);
        }
    }, [name, namespace]);

    if (!item) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <>
            <Typography variant="h4" gutterBottom>
                {item.metadata.name}
            </Typography>
            <MainInfoSection resource={item} />
            <SectionBox title="Spec">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">Class</Typography>
                        <Typography>{item.spec.class}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle2">Tasks Max</Typography>
                        <Typography>{item.spec.tasksMax}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">Config</Typography>
                        <pre>{JSON.stringify(item.spec.config, null, 2)}</pre>
                    </Grid>
                </Grid>
            </SectionBox>
            <SectionBox title="Status">
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="subtitle2">State</Typography>
                        <Typography>{item.status?.connectorStatus?.connector?.state || 'Unknown'}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle2">Worker ID</Typography>
                        <Typography>{item.status?.connectorStatus?.connector?.worker_id || 'Unknown'}</Typography>
                    </Grid>
                </Grid>
            </SectionBox>
        </>
    );
}
