import { ResourceListView, StatusLabel } from '@kinvolk/headlamp-plugin/lib/components/common';
import React from 'react';
import { Kafka } from '../../resources/kafka';
import { StrimziInstallCheck } from '../common/CommonComponents';

export function KafkaList() {
    return (
        <StrimziInstallCheck>
            <ResourceListView
                title="Kafka Clusters"
                resourceClass={Kafka}
                columns={[
                    'name',
                    'namespace',
                    {
                        id: 'version',
                        label: 'Version',
                        getValue: (item: Kafka) => item.kafkaVersion,
                    },
                    {
                        id: 'replicas',
                        label: 'Replicas',
                        getValue: (item: Kafka) => item.replicas.toString(),
                    },
                    {
                        id: 'ready',
                        label: 'Ready',
                        render: (item: Kafka) => {
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
