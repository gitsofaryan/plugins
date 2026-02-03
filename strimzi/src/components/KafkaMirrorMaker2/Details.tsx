import { DetailsGrid, EditButton, SectionBox, SimpleTable, ViewButton } from '@kinvolk/headlamp-plugin/lib/components/common';
import { K8s, registerDetailsViewSection } from '@kinvolk/headlamp-plugin/lib';
import { HeadlampKubeObject } from '../../types/k8s';
import React from 'react';
import { useParams } from 'react-router-dom';
import KafkaMirrorMaker2 from '../../resources/kafkaMirrorMaker2';
import { StrimziInstallCheck } from '../common/CommonComponents';

export function KafkaMirrorMaker2Details() {
    const { namespace, name } = useParams<{ namespace: string; name: string }>();

    return (
        <StrimziInstallCheck>
            <DetailsGrid
                resourceType={KafkaMirrorMaker2 as any}
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
                            name: 'Ready Replicas',
                            value: (item.status?.replicas || 0).toString(),
                        },
                    ]
                }
                extraSections={(item: any) =>
                    item && [
                        {
                            id: 'strimzi-mm2-clusters',
                            section: (
                                <SectionBox title="Clusters">
                                    <SimpleTable
                                        columns={[
                                            { label: 'Alias', getter: (c: any) => c.alias },
                                            { label: 'Bootstrap Servers', getter: (c: any) => c.bootstrapServers }
                                        ]}
                                        data={item.spec?.clusters || []}
                                    />
                                </SectionBox>
                            ),
                        },
                    ]
                }
            />
        </StrimziInstallCheck>
    );
}

export const registerKafkaMirrorMaker2Details = () => {
    registerDetailsViewSection(({ resource }: { resource: HeadlampKubeObject }) => {
        if (resource.kind !== 'KafkaMirrorMaker2') return null;

        const item = resource as unknown as KafkaMirrorMaker2;

        return (
            <SectionBox title="Clusters">
                <SimpleTable
                    columns={[
                        { label: 'Alias', getter: (c: any) => c.alias },
                        { label: 'Bootstrap Servers', getter: (c: any) => c.bootstrapServers }
                    ]}
                    data={item.spec?.clusters || []}
                />
            </SectionBox>
        );
    });
};
