import { ResourceListView, StatusLabel, Link } from '@kinvolk/headlamp-plugin/lib/components/common';
import React from 'react';
import KafkaRebalance from '../../resources/kafkaRebalance';
import { StrimziInstallCheck } from '../common/CommonComponents';

export function KafkaRebalanceList() {
    return (
        <StrimziInstallCheck>
            <ResourceListView
                title="Kafka Rebalances"
                resourceClass={KafkaRebalance}
                columns={[
                    {
                        id: 'name',
                        label: 'Name',
                        getValue: (item: any) => item.metadata.name,
                        render: (item: any) => (
                            <Link
                                routeName="customresource"
                                params={{
                                    crd: 'kafkarebalances.kafka.strimzi.io',
                                    namespace: item.metadata.namespace,
                                    crName: item.metadata.name
                                }}
                            >
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
                        id: 'mode',
                        label: 'Mode',
                        getValue: (item: any) => item.spec?.mode || 'full',
                    },
                    {
                        id: 'state',
                        label: 'State',
                        render: (item: any) => {
                            const condition = item.status?.conditions?.find((c: any) => c.type === 'Ready');
                            const state = condition?.reason || 'Unknown';
                            const status = condition?.status === 'True' ? 'success' : condition?.status === 'False' ? 'error' : 'warning';
                            return (
                                <StatusLabel status={status}>
                                    {state}
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
