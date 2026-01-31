import { ActionButton, MainInfoSection, SectionBox } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { useParams } from 'react-router-dom';
import KafkaConnect from '../../resources/kafkaConnect';
import { useEffect, useState } from 'react';
import { Typography, Grid } from '@mui/material';

export function KafkaConnectDetails() {
    const { name, namespace } = useParams<{ name: string; namespace: string }>();
    const [item, setItem] = useState<any>(null);

    useEffect(() => {
        if (name && namespace) {
            // @ts-ignore
            KafkaConnect.apiEndpoint.get(namespace, name).then(setItem).catch(console.error);
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
                    <Grid item xs={6}>
                        <Typography variant="subtitle2">Version</Typography>
                        <Typography>{item.spec.version}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle2">Replicas</Typography>
                        <Typography>{item.spec.replicas}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">Bootstrap Servers</Typography>
                        <Typography>{item.spec.bootstrapServers}</Typography>
                    </Grid>
                </Grid>
            </SectionBox>
        </>
    );
}
