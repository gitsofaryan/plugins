import { ResourceListView } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import KafkaMirrorMaker2 from '../../resources/kafkaMirrorMaker2';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { StrimziInstallCheck } from '../common/CommonComponents';

export function KafkaMirrorMaker2List() {
    return (
        <StrimziInstallCheck>
            <ResourceListView
                title="Kafka MirrorMaker 2"
                resourceClass={KafkaMirrorMaker2}
                columns={[
                    {
                        id: 'name',
                        label: 'Name',
                        getValue: (item: any) => item.metadata.name,
                        render: (item: any) => (
                            <Link routeName="/strimzi/mirrormaker2/:namespace/:name" params={{ name: item.metadata.name, namespace: item.metadata.namespace }}>
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
                        id: 'created',
                        label: 'Age',
                        getValue: (item: any) => item.metadata.creationTimestamp,
                    },
                ]}
            />
        </StrimziInstallCheck>
    );
}
