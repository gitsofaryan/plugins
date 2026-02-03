import { ActionButton, DeleteButton, Link, ResourceListView, StatusLabel } from '@kinvolk/headlamp-plugin/lib/components/common';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { KafkaUser } from '../../resources/kafkaUser';
import { StrimziInstallCheck } from '../common/CommonComponents';
import { CreateUserDialog } from './CreateDialog';

export function KafkaUserList() {
    const history = useHistory();
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

    return (
        <StrimziInstallCheck>
            <ResourceListView
                title="Kafka Users"
                resourceClass={KafkaUser}
                headerProps={{
                    titleSideActions: [
                        <Button
                            key="create"
                            color="primary"
                            variant="contained"
                            onClick={() => setIsCreateDialogOpen(true)}
                        >
                            Create User
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
                                    crd: 'kafkausers.kafka.strimzi.io',
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
                        id: 'auth',
                        label: 'Auth Type',
                        getValue: (item: any) => item.spec?.authentication?.type || 'None',
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
            <CreateUserDialog
                open={isCreateDialogOpen}
                onClose={() => setIsCreateDialogOpen(false)}
                onSuccess={() => setIsCreateDialogOpen(false)}
            />
        </StrimziInstallCheck>
    );
}
