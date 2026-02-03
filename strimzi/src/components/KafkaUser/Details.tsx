import { DetailsGrid, EditButton, SectionBox, SimpleTable, ViewButton } from '@kinvolk/headlamp-plugin/lib/components/common';
import { K8s, registerDetailsViewSection } from '@kinvolk/headlamp-plugin/lib';
import { HeadlampKubeObject } from '../../types/k8s';
import React from 'react';
import { useParams } from 'react-router-dom';
import { KafkaUser } from '../../resources/kafkaUser';
import { StrimziInstallCheck } from '../common/CommonComponents';

export function KafkaUserDetails() {
    const { namespace, name } = useParams<{ namespace: string; name: string }>();

    return (
        <StrimziInstallCheck>
            <DetailsGrid
                resourceType={KafkaUser}
                name={name}
                namespace={namespace}
                withEvents
                actions={(item: KafkaUser) => [
                    {
                        id: 'edit',
                        action: <EditButton item={item} />,
                    },
                    {
                        id: 'view',
                        action: <ViewButton item={item} />,
                    },
                ]}
                extraInfo={(item: KafkaUser) =>
                    item && [
                        {
                            name: 'Authentication',
                            value: item.spec?.authentication?.type || 'None',
                        },
                        {
                            name: 'Ready',
                            value: item.readyStatus,
                        },
                    ]
                }
                extraSections={(item: KafkaUser) =>
                    item && [
                        {
                            id: 'strimzi-acls',
                            section: (
                                <SectionBox title="Authorization (ACLs)">
                                    {item.spec?.authorization?.acls?.length > 0 ? (
                                        <SimpleTable
                                            columns={[
                                                { label: 'Resource Type', getter: (acl: any) => acl.resource.type },
                                                { label: 'Resource Name', getter: (acl: any) => acl.resource.name },
                                                { label: 'Pattern Type', getter: (acl: any) => acl.resource.patternType || 'literal' },
                                                { label: 'Operation', getter: (acl: any) => acl.operation },
                                                { label: 'Type', getter: (acl: any) => acl.type || 'allow' },
                                            ]}
                                            data={item.spec.authorization.acls}
                                        />
                                    ) : (
                                        'No ACLs configured.'
                                    )}
                                </SectionBox>
                            ),
                        },
                        {
                            id: 'strimzi-quotas',
                            section: (
                                <SectionBox title="Quotas">
                                    <SimpleTable
                                        columns={[
                                            { label: 'Property', getter: (q: any) => q.name },
                                            { label: 'Value', getter: (q: any) => q.value },
                                        ]}
                                        data={[
                                            { name: 'Producer Byte Rate', value: item.spec?.quotas?.producerByteRate || 'Unlimited' },
                                            { name: 'Consumer Byte Rate', value: item.spec?.quotas?.consumerByteRate || 'Unlimited' },
                                            { name: 'Request Percentage', value: item.spec?.quotas?.requestPercentage ? `${item.spec?.quotas.requestPercentage}%` : 'Unlimited' },
                                            { name: 'Controller Mutation Rate', value: item.spec?.quotas?.controllerMutationRate || 'Unlimited' },
                                        ]}
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

export const registerKafkaUserDetails = () => {
    registerDetailsViewSection(({ resource }: { resource: HeadlampKubeObject }) => {
        if (resource.kind !== 'KafkaUser') return null;

        const item = resource as unknown as KafkaUser;

        return (
            <>
                <SectionBox title="Authorization (ACLs)">
                    {item.spec?.authorization?.acls?.length > 0 ? (
                        <SimpleTable
                            columns={[
                                { label: 'Resource Type', getter: (acl: any) => acl.resource.type },
                                { label: 'Resource Name', getter: (acl: any) => acl.resource.name },
                                { label: 'Pattern Type', getter: (acl: any) => acl.resource.patternType || 'literal' },
                                { label: 'Operation', getter: (acl: any) => acl.operation },
                                { label: 'Type', getter: (acl: any) => acl.type || 'allow' },
                            ]}
                            data={item.spec.authorization.acls}
                        />
                    ) : (
                        'No ACLs configured.'
                    )}
                </SectionBox>
                <SectionBox title="Quotas">
                    <SimpleTable
                        columns={[
                            { label: 'Property', getter: (q: any) => q.name },
                            { label: 'Value', getter: (q: any) => q.value },
                        ]}
                        data={[
                            { name: 'Producer Byte Rate', value: item.spec?.quotas?.producerByteRate || 'Unlimited' },
                            { name: 'Consumer Byte Rate', value: item.spec?.quotas?.consumerByteRate || 'Unlimited' },
                            { name: 'Request Percentage', value: item.spec?.quotas?.requestPercentage ? `${item.spec?.quotas.requestPercentage}%` : 'Unlimited' },
                            { name: 'Controller Mutation Rate', value: item.spec?.quotas?.controllerMutationRate || 'Unlimited' },
                        ]}
                    />
                </SectionBox>
            </>
        );
    });
};
