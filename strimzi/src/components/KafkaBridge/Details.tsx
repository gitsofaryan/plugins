import { DetailsGrid, EditButton, SectionBox, ViewButton } from '@kinvolk/headlamp-plugin/lib/components/common';
import { K8s, registerDetailsViewSection } from '@kinvolk/headlamp-plugin/lib';
import { HeadlampKubeObject } from '../../types/k8s';
import React from 'react';
import { useParams } from 'react-router-dom';
import KafkaBridge from '../../resources/kafkaBridge';
import { StrimziInstallCheck } from '../common/CommonComponents';

export function KafkaBridgeDetails() {
    const { namespace, name } = useParams<{ namespace: string; name: string }>();

    return (
        <StrimziInstallCheck>
            <DetailsGrid
                resourceType={KafkaBridge as any}
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
                            name: 'Replicas',
                            value: (item.spec?.replicas || 0).toString(),
                        },
                        {
                            name: 'Port',
                            value: (item.spec?.http?.port || 'N/A').toString(),
                        },
                    ]
                }
                extraSections={(item: any) =>
                    item && [
                        {
                            id: 'strimzi-bridge-spec',
                            section: (
                                <SectionBox title="Bridge Configuration">
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

export const registerKafkaBridgeDetails = () => {
    registerDetailsViewSection(({ resource }: { resource: HeadlampKubeObject }) => {
        if (resource.kind !== 'KafkaBridge') return null;

        const item = resource as unknown as KafkaBridge;

        return (
            <SectionBox title="Bridge Configuration">
                <pre style={{ overflow: 'auto' }}>
                    {JSON.stringify(item.spec || {}, null, 2)}
                </pre>
            </SectionBox>
        );
    });
};
