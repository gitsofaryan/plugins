import { MainInfoSection, SectionBox, SimpleTable } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { useParams } from 'react-router-dom';
import { KafkaUser } from '../../resources/kafkaUser';
import { useEffect, useState } from 'react';
import { Typography, Grid } from '@mui/material';

export function KafkaUserDetails() {
    const { name, namespace } = useParams<{ name: string; namespace: string }>();
    const [item, setItem] = useState<KafkaUser | null>(null);

    useEffect(() => {
        if (name && namespace) {
            // @ts-ignore
            KafkaUser.apiEndpoint.get(namespace, name).then(setItem).catch(console.error);
        }
    }, [name, namespace]);

    if (!item) {
        return <Typography>Loading...</Typography>;
    }

    const acls = item.spec?.authorization?.acls || [];
    const quotas = item.spec?.quotas || {};

    return (
        <>
            <Typography variant="h4" gutterBottom>
                {item.metadata.name}
            </Typography>
            <MainInfoSection resource={item} />

            <SectionBox title="Authentication">
                <Typography variant="subtitle2">Type</Typography>
                <Typography>{item.spec?.authentication?.type || 'None'}</Typography>
            </SectionBox>

            <SectionBox title="Authorization (ACLs)">
                {acls.length > 0 ? (
                    <SimpleTable
                        columns={[
                            { label: 'Resource Type', getter: (acl: any) => acl.resource.type },
                            { label: 'Resource Name', getter: (acl: any) => acl.resource.name },
                            { label: 'Pattern Type', getter: (acl: any) => acl.resource.patternType || 'literal' },
                            { label: 'Operation', getter: (acl: any) => acl.operation },
                            { label: 'Type', getter: (acl: any) => acl.type || 'allow' },
                        ]}
                        data={acls}
                    />
                ) : (
                    <Typography>No ACLs configured.</Typography>
                )}
            </SectionBox>

            <SectionBox title="Quotas">
                {Object.keys(quotas).length > 0 ? (
                    <SimpleTable
                        columns={[
                            { label: 'Property', getter: (q: any) => q.name },
                            { label: 'Value', getter: (q: any) => q.value },
                        ]}
                        data={[
                            { name: 'Producer Byte Rate', value: quotas.producerByteRate || 'Unlimited' },
                            { name: 'Consumer Byte Rate', value: quotas.consumerByteRate || 'Unlimited' },
                            { name: 'Request Percentage', value: quotas.requestPercentage ? `${quotas.requestPercentage}%` : 'Unlimited' },
                            { name: 'Controller Mutation Rate', value: quotas.controllerMutationRate || 'Unlimited' },
                        ]}
                    />
                ) : (
                    <Typography>No quotas configured.</Typography>
                )}
            </SectionBox>
        </>
    );
}
