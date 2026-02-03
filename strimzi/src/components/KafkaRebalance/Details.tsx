import { DetailsGrid, EditButton, SectionBox, SimpleTable, ViewButton } from '@kinvolk/headlamp-plugin/lib/components/common';
import { K8s, registerDetailsViewSection } from '@kinvolk/headlamp-plugin/lib';
import { HeadlampKubeObject } from '../../types/k8s';
import React from 'react';
import { useParams } from 'react-router-dom';
import KafkaRebalance from '../../resources/kafkaRebalance';
import { StrimziInstallCheck } from '../common/CommonComponents';
import { Button } from '@mui/material';

export function KafkaRebalanceDetails() {
    const { namespace, name } = useParams<{ namespace: string; name: string }>();

    const approveProposal = async (item: any) => {
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

    return (
        <StrimziInstallCheck>
            <DetailsGrid
                resourceType={KafkaRebalance as any}
                name={name}
                namespace={namespace}
                withEvents
                actions={(item: any) => {
                    const state = item.status?.conditions?.find((c: any) => c.type === 'Ready')?.reason || 'Unknown';
                    const canApprove = state === 'ProposalReady';
                    return [
                        {
                            id: 'approve',
                            action: (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={() => approveProposal(item)}
                                    disabled={!canApprove}
                                >
                                    Approve Proposal
                                </Button>
                            ),
                        },
                        {
                            id: 'edit',
                            action: <EditButton item={item} />,
                        },
                        {
                            id: 'view',
                            action: <ViewButton item={item} />,
                        },
                    ];
                }}
                extraInfo={(item: any) => {
                    const state = item.status?.conditions?.find((c: any) => c.type === 'Ready')?.reason || 'Unknown';
                    return item && [
                        {
                            name: 'Mode',
                            value: item.spec?.mode || 'full',
                        },
                        {
                            name: 'State',
                            value: state,
                        },
                    ];
                }}
                extraSections={(item: any) =>
                    item && [
                        {
                            id: 'strimzi-rebalance-result',
                            section: item.status?.optimizationResult && (
                                <SectionBox title="Optimization Result Summary">
                                    <pre style={{ overflow: 'auto', fontSize: '0.8rem' }}>
                                        {JSON.stringify(item.status.optimizationResult, null, 2)}
                                    </pre>
                                </SectionBox>
                            ),
                        },
                        {
                            id: 'strimzi-rebalance-conditions',
                            section: (
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
                            ),
                        },
                    ]
                }
            />
        </StrimziInstallCheck>
    );
}

export const registerKafkaRebalanceDetails = () => {
    registerDetailsViewSection(({ resource }: { resource: HeadlampKubeObject }) => {
        if (resource.kind !== 'KafkaRebalance') return null;

        const item = resource as unknown as any; // Cast to access patch and custom fields
        const state = item.status?.conditions?.find((c: any) => c.type === 'Ready')?.reason || 'Unknown';
        const canApprove = state === 'ProposalReady';

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

        return (
            <>
                <SectionBox title="Management">
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={approveProposal}
                        disabled={!canApprove}
                    >
                        Approve Proposal
                    </Button>
                </SectionBox>
                {item.status?.optimizationResult && (
                    <SectionBox title="Optimization Result Summary">
                        <pre style={{ overflow: 'auto', fontSize: '0.8rem' }}>
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
            </>
        );
    });
};
