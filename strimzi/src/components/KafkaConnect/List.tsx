import { ResourceListView, StatusLabel } from '@kinvolk/headlamp-plugin/lib/components/common';
import React from 'react';
import { KafkaConnect } from '../../resources/kafkaConnect';
import { StrimziInstallCheck } from '../common/CommonComponents';

export function KafkaConnectList() {
    return (
        <StrimziInstallCheck>
            <ResourceListView
                title="Kafka Connect"
                resourceClass={KafkaConnect}
                columns={[
                    'name',
                    'namespace',
                    {
                        id: 'replicas',
                        label: 'Replicas',
                        getValue: (item: KafkaConnect) => item.replicas.toString(),
                    },
                    {
                        id: 'ready',
                        label: 'Ready',
                        render: (item: KafkaConnect) => {
                            const status = item.readyStatus;
                            return (
                                <StatusLabel status={status === 'True' ? 'success' : status === 'False' ? 'error' : 'warning'}>
                                    {status}
                                </StatusLabel>
                            );
                        },
                    },
                    'age',
                ]}
            />
        </StrimziInstallCheck>
    );
}
