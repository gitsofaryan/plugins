import { ResourceListView, StatusLabel, Link } from '@kinvolk/headlamp-plugin/lib/components/common';
import React from 'react';
import KafkaNodePool from '../../resources/kafkaNodePool';
import { StrimziInstallCheck } from '../common/CommonComponents';

export function KafkaNodePoolList() {
    return (
        <StrimziInstallCheck>
            <ResourceListView
                title="Kafka Node Pools"
                resourceClass={KafkaNodePool}
                columns={[
                    {
                        id: 'name',
                        label: 'Name',
                        getValue: (item: any) => item.metadata.name,
                        render: (item: any) => (
                            <Link routeName="/strimzi/nodepools/:namespace/:name" params={{ name: item.metadata.name, namespace: item.metadata.namespace }}>
                                {item.metadata.name}
                            </Link>
                        ),
                    },
                    {
                        id: 'namespace',
                        label: 'Namespace',
                        getValue: (item: any) => item.metadata.namespace,
                    },
                    {
                        id: 'roles',
                        label: 'Roles',
                        getValue: (item: any) => (item.spec?.roles || []).join(', '),
                    },
                    {
                        id: 'replicas',
                        label: 'Replicas',
                        getValue: (item: any) => `${item.status?.replicas || 0}/${item.spec?.replicas || 0}`,
                    },
                    {
                        id: 'ready',
                        label: 'Ready',
                        render: (item: any) => {
                            const ready = item.status?.conditions?.find((c: any) => c.type === 'Ready')?.status === 'True';
                            return (
                                <StatusLabel status={ready ? 'success' : 'warning'}>
                                    {ready ? 'Ready' : 'Not Ready'}
                                </StatusLabel>
                            );
                        },
                    },
                    'age',
                ] as any}
            />
        </StrimziInstallCheck>
    );
}
