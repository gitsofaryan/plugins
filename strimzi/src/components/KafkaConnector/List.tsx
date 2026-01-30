import { ResourceListView, StatusLabel } from '@kinvolk/headlamp-plugin/lib/components/common';
import React from 'react';
import { KafkaConnector } from '../../resources/kafkaConnector';
import { StrimziInstallCheck } from '../common/CommonComponents';

export function KafkaConnectorList() {
    return (
        <StrimziInstallCheck>
            <ResourceListView
                title="Kafka Connectors"
                resourceClass={KafkaConnector}
                columns={[
                    'name',
                    'namespace',
                    {
                        id: 'state',
                        label: 'State',
                        getValue: (item: KafkaConnector) => item.state,
                    },
                    {
                        id: 'ready',
                        label: 'Ready',
                        render: (item: KafkaConnector) => {
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
