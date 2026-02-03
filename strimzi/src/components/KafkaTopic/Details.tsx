import { DetailsGrid, EditButton, SectionBox, ViewButton } from '@kinvolk/headlamp-plugin/lib/components/common';
import { K8s, registerDetailsViewSection } from '@kinvolk/headlamp-plugin/lib';
import { HeadlampKubeObject } from '../../types/k8s';
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
                actions={(item: KafkaTopic) => [
                    {
                        id: 'edit',
                        action: <EditButton item={item} />,
                    },
                    {
                        id: 'view',
                        action: <ViewButton item={item} />,
                    },
                ]}
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
                                    <pre style={{ overflow: 'auto' }}>
                                        {JSON.stringify(item.spec?.config || {}, null, 2)}
                                    </pre>
                                </SectionBox>
                            ),
                        },
                    ]
                }
            />
        </StrimziInstallCheck>
    );
}

export const registerKafkaTopicDetails = () => {
    registerDetailsViewSection(({ resource }: { resource: HeadlampKubeObject }) => {
        if (resource.kind !== 'KafkaTopic') return null;

        const item = resource as unknown as KafkaTopic;

        return (
            <SectionBox title="Topic Configuration">
                <pre style={{ overflow: 'auto' }}>
                    {JSON.stringify(item.spec?.config || {}, null, 2)}
                </pre>
            </SectionBox>
        );
    });
};
