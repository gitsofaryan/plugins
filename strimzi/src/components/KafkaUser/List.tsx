import { ActionButton, DeleteButton, Link, ResourceListView, StatusLabel } from '@kinvolk/headlamp-plugin/lib/components/common';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import { KafkaUser } from '../../resources/kafkaUser';
import { StrimziInstallCheck } from '../common/CommonComponents';
import { CreateUserDialog } from './CreateDialog';

export function KafkaUserList() {
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <StrimziInstallCheck>
            <ResourceListView
                title="Kafka Users"
                headerProps={{
                    actions: [
                        <Button
                            key="create"
                            color="primary"
                            variant="contained"
                            onClick={() => setOpenDialog(true)}
                        >
                            Create User
                        </Button>
                    ],
                }}
                resourceClass={KafkaUser}
                columns={[
                    {
                        id: 'name',
                        label: 'Name',
                        getValue: (item: KafkaUser) => item.metadata.name,
                        render: (item: KafkaUser) => (
                            <Link
                                routeName="/strimzi/users/:namespace/:name"
                                params={{
                                    namespace: item.metadata.namespace,
                                    name: item.metadata.name,
                                }}
                            >
                                {item.metadata.name}
                            </Link>
                        ),
                    },
                    {
                        id: 'namespace',
                        label: 'Namespace',
                        getValue: (item: KafkaUser) => item.metadata.namespace,
                    },
                    {
                        id: 'auth-type',
                        label: 'Auth Type',
                        getValue: (item: KafkaUser) => item.authType,
                    },
                    {
                        id: 'ready',
                        label: 'Ready',
                        render: (item: KafkaUser) => {
                            const status = item.readyStatus;
                            return (
                                <StatusLabel status={status === 'True' ? 'success' : status === 'False' ? 'error' : 'warning'}>
                                    {status}
                                </StatusLabel>
                            );
                        },
                    },
                    {
                        id: 'age',
                        label: 'Age',
                        getValue: (item: KafkaUser) => item.metadata.creationTimestamp,
                    },
                    {
                        id: 'actions',
                        label: 'Actions',
                        render: (item: KafkaUser) => <DeleteButton item={item} />,
                    },
                ]}
            />
            <CreateUserDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onSuccess={() => {
                    setOpenDialog(false);
                }}
            />
        </StrimziInstallCheck>
    );
}
