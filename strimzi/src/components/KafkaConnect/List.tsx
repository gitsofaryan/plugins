import { ResourceListView } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Button } from '@mui/material';
import KafkaConnect from '../../resources/kafkaConnect';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { StrimziInstallCheck } from '../common/CommonComponents';

export function KafkaConnectList() {
    return (
        <StrimziInstallCheck>
            <ResourceListView
                title="Kafka Connect Clusters"
                headerProps={{
                    actions: [
                        // Create button to be added later
                    ],
                }}
                resourceClass={KafkaConnect}
                columns={[
                    {
                        id: 'name',
                        label: 'Name',
                        getValue: (item: any) => item.metadata.name,
                        render: (item: any) => <Link routeName="details" params={{ name: item.metadata.name, namespace: item.metadata.namespace }}>{item.metadata.name}</Link>,
                    },
                    {
                        id: 'namespace',
                        label: 'Namespace',
                        getValue: (item: any) => item.metadata.namespace,
                    },
                    {
                        id: 'replicas',
                        label: 'Replicas',
                        getValue: (item: any) => item.spec.replicas,
                    },
                    {
                        id: 'version',
                        label: 'Version',
                        getValue: (item: any) => item.spec.version || 'N/A',
                    },
                    {
                        id: 'created',
                        label: 'Age',
                        getValue: (item: any) => item.metadata.creationTimestamp,
                    },
                ]}
            />
        </StrimziInstallCheck>
    );
}
