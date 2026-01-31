import { DetailsGrid, SectionBox } from '@kinvolk/headlamp-plugin/lib/components/common';
import { K8s } from '@kinvolk/headlamp-plugin/lib';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Kafka } from '../../resources/kafka';
import { StrimziInstallCheck } from '../common/CommonComponents';

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
                            id: 'strimzi-status',
                            section: (
                                <SectionBox title="Strimzi Status">
                                    {/* Add more detailed status information here later */}
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
