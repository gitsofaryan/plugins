import { ResourceListView } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import KafkaBridge from '../../resources/kafkaBridge';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { StrimziInstallCheck } from '../common/CommonComponents';

export function KafkaBridgeList() {
    return (
        <StrimziInstallCheck>
            <ResourceListView
                title="Kafka Bridges"
                resourceClass={KafkaBridge}
                columns={[
                    {
                        id: 'name',
                        label: 'Name',
                        getValue: (item: any) => item.metadata.name,
                        render: (item: any) => (
                            <Link
                                routeName="customresource"
                                params={{
                                    crd: 'kafkabridges.kafka.strimzi.io',
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
                        id: 'replicas',
                        label: 'Replicas',
                        getValue: (item: any) => item.spec?.replicas || 0,
                    },
                    {
                        id: 'bootstrapServers',
                        label: 'Bootstrap Servers',
                        getValue: (item: any) => item.spec?.bootstrapServers || 'N/A',
                    },
                    {
                        id: 'port',
                        label: 'HTTP Port',
                        getValue: (item: any) => item.spec?.http?.port || 'N/A',
                    },
                    {
                        id: 'created',
                        label: 'Age',
                        getValue: (item: any) => item.metadata.creationTimestamp,
                    },
                ] as any}
            />
        </StrimziInstallCheck>
    );
}
