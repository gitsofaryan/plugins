import { SectionBox, SimpleTable } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { KubeObject } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';
import { Typography, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';

// Simplified Deployment model
class Deployment extends KubeObject {
    static kind = 'Deployment';
    static apiName = 'deployments';
    static apiVersion = 'apps/v1';
    static isNamespaced = true;
}

export function EntityOperatorStatus({ kafka }: { kafka: any }) {
    const [deployment, setDeployment] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const entityOperatorName = `${kafka.metadata.name}-entity-operator`;
    const namespace = kafka.metadata.namespace;

    useEffect(() => {
        if (kafka.spec?.entityOperator) {
            setLoading(true);
            // @ts-ignore
            Deployment.apiEndpoint.get(namespace, entityOperatorName)
                .then((deploy) => {
                    setDeployment(deploy);
                    setLoading(false);
                })
                .catch(() => {
                    setDeployment(null);
                    setLoading(false);
                });
        }
    }, [kafka]);

    if (!kafka.spec?.entityOperator) {
        return null; // Entity Operator not enabled
    }

    if (loading) {
        return <CircularProgress size={20} />;
    }

    const tpoStatus = kafka.spec?.entityOperator?.topicOperator ? (deployment?.status?.readyReplicas > 0 ? 'Ready' : 'Not Ready') : 'Disabled';
    const uoStatus = kafka.spec?.entityOperator?.userOperator ? (deployment?.status?.readyReplicas > 0 ? 'Ready' : 'Not Ready') : 'Disabled';
    const reconciliationStatus = kafka.status?.conditions?.find((c: any) => c.type === 'Ready')?.reason || 'N/A';

    return (
        <SectionBox title="Entity Operator Status">
            <SimpleTable
                columns={[
                    { label: 'Component', getter: (d: any) => d.name },
                    { label: 'Status', getter: (d: any) => d.status }
                ]}
                data={[
                    { name: 'Topic Operator', status: tpoStatus },
                    { name: 'User Operator', status: uoStatus },
                    { name: 'Reconciliation', status: reconciliationStatus },
                    { name: 'Deployment', status: deployment ? `${deployment.status?.readyReplicas}/${deployment.status?.replicas} Ready` : 'Not Found' }
                ]}
            />
        </SectionBox>
    );
}
