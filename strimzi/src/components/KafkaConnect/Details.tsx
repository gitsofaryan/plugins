import { DetailsGrid, EditButton, SectionBox, ViewButton } from '@kinvolk/headlamp-plugin/lib/components/common';
import { K8s, registerDetailsViewSection } from '@kinvolk/headlamp-plugin/lib';
import { HeadlampKubeObject } from '../../types/k8s';
import React from 'react';
import { useParams } from 'react-router-dom';
import KafkaConnect from '../../resources/kafkaConnect';
import { StrimziInstallCheck } from '../common/CommonComponents';

export function KafkaConnectDetails() {
    const { namespace, name } = useParams<{ namespace: string; name: string }>();

    return (
        <StrimziInstallCheck>
            <DetailsGrid
                resourceType={KafkaConnect as any}
                name={name}
                namespace={namespace}
                withEvents
                actions={(item: any) => [
                    {
                        id: 'edit',
                        action: <EditButton item={item} />,
                    },
                    {
                        id: 'view',
                        action: <ViewButton item={item} />,
                    },
                ]}
                extraInfo={(item: any) =>
                    item && [
                        {
                            name: 'Version',
                            value: item.spec?.version || 'N/A',
                        },
                        {
                            name: 'Replicas',
                            value: (item.spec?.replicas || 0).toString(),
                        },
                    ]
                }
                extraSections={(item: any) =>
                    item && [
                        {
                            id: 'strimzi-connect-spec',
                            section: (
                                <SectionBox title="Connect Configuration">
                                    <pre style={{ overflow: 'auto' }}>
                                        {JSON.stringify(item.spec || {}, null, 2)}
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

export const registerKafkaConnectDetails = () => {
    registerDetailsViewSection(({ resource }: { resource: HeadlampKubeObject }) => {
        if (resource.kind !== 'KafkaConnect') return null;

        const item = resource as unknown as KafkaConnect;

        return (
            <SectionBox title="Connect Configuration">
                <pre style={{ overflow: 'auto' }}>
                    {JSON.stringify(item.spec || {}, null, 2)}
                </pre>
            </SectionBox>
        );
    });
};
