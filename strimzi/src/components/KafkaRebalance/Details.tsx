import { MainInfoSection, SectionBox, SimpleTable } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { useParams } from 'react-router-dom';
import KafkaRebalance from '../../resources/kafkaRebalance';
import { useEffect, useState } from 'react';
import { Typography, Grid, Button, Box } from '@mui/material';
import { StrimziInstallCheck } from '../common/CommonComponents';

export function KafkaRebalanceDetails() {
    const { name, namespace } = useParams<{ name: string; namespace: string }>();
    const [item, setItem] = useState<any>(null);

    const refresh = () => {
        if (name && namespace) {
            // @ts-ignore
            KafkaRebalance.apiEndpoint.get(namespace, name).then(setItem).catch(console.error);
        }
    };

    useEffect(() => {
        refresh();
        const interval = setInterval(refresh, 5000);
        return () => clearInterval(interval);
    }, [name, namespace]);

    const approveProposal = async () => {
        try {
            await item.patch({
                metadata: {
                    annotations: {
                        'strimzi.io/rebalance': 'approve'
                    }
                }
            });
            alert('Proposal approved! Rebalancing will start...');
        } catch (err) {
            console.error(err);
            alert('Failed to approve proposal');
        }
    };

    if (!item) {
        return <Typography>Loading...</Typography>;
    }

    const state = item.status?.conditions?.find((c: any) => c.type === 'Ready')?.reason || 'Unknown';
    const canApprove = state === 'ProposalReady';

    return (
        <StrimziInstallCheck>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h4" gutterBottom>
                        Rebalance: {item.metadata.name}
                    </Typography>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={approveProposal}
                        disabled={!canApprove}
                    >
                        Approve Proposal
                    </Button>
                </Grid>
            </Grid>

            <MainInfoSection resource={item} />

            <SectionBox title="Optimization Details">
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="subtitle2">Mode</Typography>
                        <Typography>{item.spec?.mode || 'full'}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle2">Current State</Typography>
                        <Typography color={state === 'Ready' ? 'success.main' : 'warning.main'}>
                            {state}
                        </Typography>
                    </Grid>
                </Grid>
            </SectionBox>

            {item.status?.optimizationResult && (
                <SectionBox title="Optimization Result Summary">
                    <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', fontSize: '0.8rem' }}>
                        {JSON.stringify(item.status.optimizationResult, null, 2)}
                    </pre>
                </SectionBox>
            )}

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
