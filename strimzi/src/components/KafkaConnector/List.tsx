import { ResourceListView, StatusLabel } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Button } from '@mui/material';
import KafkaConnector from '../../resources/kafkaConnector';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { StrimziInstallCheck } from '../common/CommonComponents';

export function KafkaConnectorList() {
    return (
        <StrimziInstallCheck>
            <ResourceListView
                title="Kafka Connectors"
                resourceClass={KafkaConnector}
                columns={[
                    {
                        id: 'name',
                        label: 'Name',
                        getValue: (item: any) => item.metadata.name,
                        render: (item: any) => (
                            <Link
                                routeName="customresource"
                                params={{
                                    crd: 'kafkaconnectors.kafka.strimzi.io',
                                    namespace: item.metadata.namespace,
                                    crName: item.metadata.name
                                }}
                            >
                                {item.metadata.name}
                            </Link>
                        ),
                    },
                    {
                        id: 'namespace',
                        label: 'Namespace',
                        getValue: (item: any) => item.metadata.namespace,
                    },
                    {
                        id: 'class',
                        label: 'Class',
                        getValue: (item: any) => item.spec?.class || 'N/A',
                    },
                    {
                        id: 'tasks',
                        label: 'Tasks Max',
                        getValue: (item: any) => item.spec?.tasksMax || 0,
                    },
                    {
                        id: 'state',
                        label: 'Status',
                        render: (item: any) => {
                            const state = item.status?.connectorStatus?.connector?.state || 'Unknown';
                            return (
                                <StatusLabel status={state === 'RUNNING' ? 'success' : state === 'FAILED' ? 'error' : 'warning'}>
                                    {state}
                                </StatusLabel>
                            );
                        },
                    },
                    {
                        id: 'created',
                        label: 'Created',
                        getValue: (item: any) => item.metadata.creationTimestamp,
                    },
                ] as any}
            />
        </StrimziInstallCheck>
    );
}
