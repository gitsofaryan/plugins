import { DetailsGrid, SectionBox } from '@kinvolk/headlamp-plugin/lib/components/common';
import React from 'react';
import { useParams } from 'react-router-dom';
import { KafkaTopic } from '../../resources/kafkaTopic';
import { StrimziInstallCheck } from '../common/CommonComponents';

export function KafkaTopicDetails() {
    const { namespace, name } = useParams<{ namespace: string; name: string }>();

    return (
        <StrimziInstallCheck>
            <DetailsGrid
                resourceType={KafkaTopic}
                name={name}
                namespace={namespace}
                withEvents
                extraInfo={(item: KafkaTopic) =>
                    item && [
                        {
                            name: 'Partitions',
                            value: item.partitions.toString(),
                        },
                        {
                            name: 'Replicas',
                            value: item.replicas.toString(),
                        },
                        {
                            name: 'Ready',
                            value: item.readyStatus,
                        },
                    ]
                }
                extraSections={(item: KafkaTopic) =>
                    item && [
                        {
                            id: 'strimzi-spec',
                            section: (
                                <SectionBox title="Topic Configuration">
                                    <pre>{JSON.stringify(item.spec?.config || {}, null, 2)}</pre>
                                </SectionBox>
                            ),
                        },
                    ]
                }
            />
        </StrimziInstallCheck>
    );
}
