import { DetailsGrid, SectionBox, SimpleTable } from '@kinvolk/headlamp-plugin/lib/components/common';
import { K8s } from '@kinvolk/headlamp-plugin/lib';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Kafka } from '../../resources/kafka';
import { StrimziInstallCheck } from '../common/CommonComponents';
import { EntityOperatorStatus } from '../EntityOperator/Status';
import { EventsTimeline } from '../Events/Timeline';

export function KafkaDetails() {
    const { namespace, name } = useParams<{ namespace: string; name: string }>();

    return (
        <StrimziInstallCheck>
            <DetailsGrid
                resourceType={Kafka}
                name={name}
                namespace={namespace}
                withEvents
                extraInfo={(item: Kafka) =>
                    item && [
                        {
                            name: 'Version',
                            value: item.kafkaVersion,
                        },
                        {
                            name: 'Replicas',
                            value: item.replicas.toString(),
                        },
                    ]
                }
                extraSections={(item: Kafka) =>
                    item && [
                        {
                            id: 'strimzi-listeners',
                            section: (
                                <SectionBox title="Listener Endpoints">
                                    <SimpleTable
                                        columns={[
                                            { label: 'Type', getter: (l: any) => l.type },
                                            {
                                                label: 'Address',
                                                getter: (l: any) => l.addresses?.[0] ? `${l.addresses[0].host}:${l.addresses[0].port}` : 'Pending'
                                            },
                                        ]}
                                        data={item.status?.listeners || []}
                                    />
                                </SectionBox>
                            ),
                        },
                        {
                            id: 'strimzi-conditions',
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
                        {
                            id: 'strimzi-entity-operator',
                            section: <EntityOperatorStatus kafka={item} />,
                        },
                        {
                            id: 'strimzi-events',
                            section: <EventsTimeline resource={item} />,
                        },
                        {
                            id: 'strimzi-status',
                            section: (
                                <SectionBox title="Raw Status">
                                    <pre>{JSON.stringify(item.status, null, 2)}</pre>
                                </SectionBox>
                            ),
                        },
                    ]
                }
            />
        </StrimziInstallCheck>
    );
}
