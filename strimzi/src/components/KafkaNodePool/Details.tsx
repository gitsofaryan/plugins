import { DetailsGrid, EditButton, SectionBox, SimpleTable, ViewButton } from '@kinvolk/headlamp-plugin/lib/components/common';
import { K8s, registerDetailsViewSection } from '@kinvolk/headlamp-plugin/lib';
import { HeadlampKubeObject } from '../../types/k8s';
import React from 'react';
import { useParams } from 'react-router-dom';
import KafkaNodePool from '../../resources/kafkaNodePool';
import { StrimziInstallCheck } from '../common/CommonComponents';

export function KafkaNodePoolDetails() {
    const { namespace, name } = useParams<{ namespace: string; name: string }>();

    return (
        <StrimziInstallCheck>
            <DetailsGrid
                resourceType={KafkaNodePool as any}
                name={name}
                namespace={namespace}
                withEvents
                actions={(item: any) => [
                    {
                        id: 'edit',
                        action: <EditButton item={item} />,
                    },
                    {
                        id: 'view',
                        action: <ViewButton item={item} />,
                    },
                ]}
                extraInfo={(item: any) =>
                    item && [
                        {
                            name: 'Roles',
                            value: (item.spec?.roles || []).join(', '),
                        },
                        {
                            name: 'Replicas',
                            value: `${item.status?.replicas || 0} / ${item.spec?.replicas || 0}`,
                        },
                    ]
                }
                extraSections={(item: any) =>
                    item && [
                        {
                            id: 'strimzi-nodepool-storage',
                            section: (
                                <SectionBox title="Storage">
                                    <pre style={{ overflow: 'auto' }}>
                                        {JSON.stringify(item.spec?.storage || {}, null, 2)}
                                    </pre>
                                </SectionBox>
                            ),
                        },
                        {
                            id: 'strimzi-nodepool-conditions',
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

export const registerKafkaNodePoolDetails = () => {
    registerDetailsViewSection(({ resource }: { resource: HeadlampKubeObject }) => {
        if (resource.kind !== 'KafkaNodePool') return null;

        const item = resource as unknown as KafkaNodePool;

        return (
            <>
                <SectionBox title="Storage">
                    <pre style={{ overflow: 'auto' }}>
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
            </>
        );
    });
};
