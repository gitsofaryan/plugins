import { ResourceListView, StatusLabel } from '@kinvolk/headlamp-plugin/lib/components/common';
import React from 'react';
import { KafkaUser } from '../../resources/kafkaUser';
import { StrimziInstallCheck } from '../common/CommonComponents';

export function KafkaUserList() {
    return (
        <StrimziInstallCheck>
            <ResourceListView
                title="Kafka Users"
                resourceClass={KafkaUser}
                columns={[
                    'name',
                    'namespace',
                    {
                        id: 'auth-type',
                        label: 'Auth Type',
                        getValue: (item: KafkaUser) => item.authType,
                    },
                    {
                        id: 'ready',
                        label: 'Ready',
                        render: (item: KafkaUser) => {
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
