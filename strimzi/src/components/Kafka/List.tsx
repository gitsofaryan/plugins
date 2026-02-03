import { Link, ResourceListView, StatusLabel } from '@kinvolk/headlamp-plugin/lib/components/common';
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
                    {
                        id: 'name',
                        label: 'Name',
                        getValue: (item: any) => item.metadata.name,
                        render: (item: any) => (
                            <Link
                                routeName="customresource"
                                params={{
                                    crd: 'kafkas.kafka.strimzi.io',
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
                        id: 'version',
                        label: 'Version',
                        getValue: (item: any) => item.kafkaVersion,
                    },
                    {
                        id: 'replicas',
                        label: 'Replicas',
                        getValue: (item: any) => item.replicas.toString(),
                    },
                    {
                        id: 'ready',
                        label: 'Ready',
                        render: (item: any) => {
                            const status = item.readyStatus;
                            return (
                                <StatusLabel status={status === 'True' ? 'success' : status === 'False' ? 'error' : 'warning'}>
                                    {status}
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
