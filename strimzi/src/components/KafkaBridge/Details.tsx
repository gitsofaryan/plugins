import { MainInfoSection, SectionBox } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { useParams } from 'react-router-dom';
import KafkaBridge from '../../resources/kafkaBridge';
import { useEffect, useState } from 'react';
import { Typography, Grid } from '@mui/material';

export function KafkaBridgeDetails() {
    const { name, namespace } = useParams<{ name: string; namespace: string }>();
    const [item, setItem] = useState<any>(null);

    useEffect(() => {
        if (name && namespace) {
            // @ts-ignore
            KafkaBridge.apiEndpoint.get(namespace, name).then(setItem).catch(console.error);
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
                        <Typography variant="subtitle2">Replicas</Typography>
                        <Typography>{item.spec?.replicas || 0}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle2">HTTP Port</Typography>
                        <Typography>{item.spec?.http?.port || 'N/A'}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">Bootstrap Servers</Typography>
                        <Typography>{item.spec?.bootstrapServers || 'N/A'}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">Image</Typography>
                        <Typography>{item.spec?.image || 'Default'}</Typography>
                    </Grid>
                </Grid>
            </SectionBox>
            <SectionBox title="Status">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">URL</Typography>
                        <Typography>{item.status?.url || 'N/A'}</Typography>
                    </Grid>
                </Grid>
            </SectionBox>
        </>
    );
}
