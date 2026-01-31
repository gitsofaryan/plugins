import { ActionButton, DeleteButton, ResourceListView, StatusLabel } from '@kinvolk/headlamp-plugin/lib/components/common';
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
                    'name',
                    'namespace',
                    {
                        id: 'auth-type',
                        label: 'Auth Type',
                        getValue: (item: any) => item.authType,
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
