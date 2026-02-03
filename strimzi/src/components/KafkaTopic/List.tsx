import { ActionButton, DeleteButton, Link, ResourceListView, StatusLabel } from '@kinvolk/headlamp-plugin/lib/components/common';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { KafkaTopic } from '../../resources/kafkaTopic';
import { StrimziInstallCheck } from '../common/CommonComponents';
import { CreateTopicDialog } from './CreateDialog';

export function KafkaTopicList() {
    const history = useHistory();
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

    return (
        <StrimziInstallCheck>
            <ResourceListView
                title="Kafka Topics"
                resourceClass={KafkaTopic}
                headerProps={{
                    titleSideActions: [
                        <Button
                            key="create"
                            color="primary"
                            variant="contained"
                            onClick={() => setIsCreateDialogOpen(true)}
                        >
                            Create Topic
                        </Button>,
                    ],
                }}
                columns={[
                    {
                        id: 'name',
                        label: 'Name',
                        getValue: (item: any) => item.metadata.name,
                        render: (item: any) => (
                            <Link
                                routeName="customresource"
                                params={{
                                    crd: 'kafkatopics.kafka.strimzi.io',
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
                ] as any}
            />
            <CreateTopicDialog
                open={isCreateDialogOpen}
                onClose={() => setIsCreateDialogOpen(false)}
                onSuccess={() => setIsCreateDialogOpen(false)}
            />
        </StrimziInstallCheck>
    );
}
