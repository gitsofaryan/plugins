import { ResourceListView, StatusLabel } from '@kinvolk/headlamp-plugin/lib/components/common';
import React from 'react';
import { KafkaTopic } from '../../resources/kafkaTopic';
import { StrimziInstallCheck } from '../common/CommonComponents';

export function KafkaTopicList() {
    return (
        <StrimziInstallCheck>
            <ResourceListView
                title="Kafka Topics"
                resourceClass={KafkaTopic}
                columns={[
                    'name',
                    'namespace',
                    {
                        id: 'partitions',
                        label: 'Partitions',
                        getValue: (item: KafkaTopic) => item.partitions.toString(),
                    },
                    {
                        id: 'replicas',
                        label: 'Replicas',
                        getValue: (item: KafkaTopic) => item.replicas.toString(),
                    },
                    {
                        id: 'ready',
                        label: 'Ready',
                        render: (item: KafkaTopic) => {
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
