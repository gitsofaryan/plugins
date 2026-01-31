import { ActionButton, DeleteButton, Link, ResourceListView, StatusLabel } from '@kinvolk/headlamp-plugin/lib/components/common';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import { KafkaTopic } from '../../resources/kafkaTopic';
import { StrimziInstallCheck } from '../common/CommonComponents';
import { CreateTopicDialog } from './CreateDialog';

export function KafkaTopicList() {
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <StrimziInstallCheck>
            <ResourceListView
                title="Kafka Topics"
                headerProps={{
                    actions: [
                        <Button
                            key="create"
                            color="primary"
                            variant="contained"
                            onClick={() => setOpenDialog(true)}
                        >
                            Create Topic
                        </Button>
                    ],
                }}
                resourceClass={KafkaTopic}
                columns={[
                    {
                        id: 'name',
                        label: 'Name',
                        getValue: (item: any) => item.metadata.name,
                        render: (item: any) => (
                            <Link routeName="/strimzi/topics/:namespace/:name" params={{ namespace: item.metadata.namespace, name: item.metadata.name }}>
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
                        id: 'partitions',
                        label: 'Partitions',
                        getValue: (item: any) => item.partitions.toString(),
                    },
                    {
                        id: 'replicas',
                        label: 'Replicas',
                        getValue: (item: any) => item.replicas.toString(),
                    },
                    {
                        id: 'ready',
                        label: 'Ready',
                        render: (item: any) => {
                            const status = item.readyStatus;
                            return (
                                <StatusLabel status={status === 'True' ? 'success' : status === 'False' ? 'error' : 'warning'}>
                                    {status}
                                </StatusLabel>
                            );
                        },
                    },
                    'age',
                    {
                        id: 'actions',
                        label: '',
                        render: (item: any) => <DeleteButton item={item} />,
                    },
                ]}
            />
            <CreateTopicDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onSuccess={() => {
                    setOpenDialog(false);
                    // ResourceListView should pick up changes automatically via websocket/watch
                }}
            />
        </StrimziInstallCheck>
    );
}
