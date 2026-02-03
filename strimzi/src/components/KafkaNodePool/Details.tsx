import { MainInfoSection, SectionBox, SimpleTable } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { useParams } from 'react-router-dom';
import KafkaNodePool from '../../resources/kafkaNodePool';
import { useEffect, useState } from 'react';
import { Typography, Grid } from '@mui/material';
import { StrimziInstallCheck } from '../common/CommonComponents';

export function KafkaNodePoolDetails() {
    const { name, namespace } = useParams<{ name: string; namespace: string }>();
    const [item, setItem] = useState<any>(null);

    useEffect(() => {
        if (name && namespace) {
            // @ts-ignore
            KafkaNodePool.apiEndpoint.get(namespace, name).then(setItem).catch(console.error);
        }
    }, [name, namespace]);

    if (!item) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <StrimziInstallCheck>
            <Typography variant="h4" gutterBottom>
                Node Pool: {item.metadata.name}
            </Typography>
            <MainInfoSection resource={item} />

            <SectionBox title="Roles & Scaling">
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="subtitle2">Roles</Typography>
                        <Typography>{(item.spec?.roles || []).join(', ')}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle2">Replicas (Current/Target)</Typography>
                        <Typography>{item.status?.replicas || 0} / {item.spec?.replicas || 0}</Typography>
                    </Grid>
                </Grid>
            </SectionBox>

            <SectionBox title="Storage">
                <pre style={{ backgroundColor: '#f5f5f5', padding: '10px' }}>
                    {JSON.stringify(item.spec?.storage || {}, null, 2)}
                </pre>
            </SectionBox>

            <SectionBox title="Status Conditions">
                <SimpleTable
                    columns={[
                        { label: 'Type', getter: (c: any) => c.type },
                        { label: 'Status', getter: (c: any) => c.status },
                        { label: 'Reason', getter: (c: any) => c.reason || 'N/A' },
                        { label: 'Message', getter: (c: any) => c.message || 'N/A' },
                    ]}
                    data={item.status?.conditions || []}
                />
            </SectionBox>
        </StrimziInstallCheck>
    );
}
