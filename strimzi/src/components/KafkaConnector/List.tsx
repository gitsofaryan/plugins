import { ResourceListView } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Button } from '@mui/material';
import KafkaConnector from '../../resources/kafkaConnector';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { StrimziInstallCheck } from '../common/CommonComponents';
import { useState } from 'react';
import { CreateConnectorDialog } from './CreateDialog';

export function KafkaConnectorList() {
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <StrimziInstallCheck>
            <ResourceListView
                title="Kafka Connectors"
                headerProps={{
                    actions: [
                        <Button
                            key="create"
                            color="primary"
                            variant="contained"
                            onClick={() => setOpenDialog(true)}
                        >
                            Create Connector
                        </Button>
                    ],
                }}
                resourceClass={KafkaConnector}
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
                        id: 'class',
                        label: 'Class',
                        getValue: (item: any) => item.spec.class,
                    },
                    {
                        id: 'tasks',
                        label: 'Tasks Max',
                        getValue: (item: any) => item.spec.tasksMax,
                    },
                    {
                        id: 'state',
                        label: 'Status',
                        getValue: (item: any) => item.status?.connectorStatus?.connector?.state || 'Unknown',
                    },
                    {
                        id: 'created',
                        label: 'Age',
                        getValue: (item: any) => item.metadata.creationTimestamp,
                    },
                ]}
            />
            <CreateConnectorDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onSuccess={() => {
                    setOpenDialog(false);
                }}
            />
        </StrimziInstallCheck>
    );
}
