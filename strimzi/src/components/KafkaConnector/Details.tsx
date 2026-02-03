import { ActionButton, DetailsGrid, EditButton, SectionBox, SimpleTable, ViewButton } from '@kinvolk/headlamp-plugin/lib/components/common';
import { K8s, registerDetailsViewSection } from '@kinvolk/headlamp-plugin/lib';
import { HeadlampKubeObject } from '../../types/k8s';
import React from 'react';
import { useParams } from 'react-router-dom';
import KafkaConnector from '../../resources/kafkaConnector';
import { StrimziInstallCheck } from '../common/CommonComponents';
import { Button } from '@mui/material';

export function KafkaConnectorDetails() {
    const { namespace, name } = useParams<{ namespace: string; name: string }>();

    const restartConnector = async (item: any) => {
        try {
            await item.patch({
                metadata: {
                    annotations: {
                        'strimzi.io/restart-connector': 'true'
                    }
                }
            });
            alert('Restarting connector...');
        } catch (err) {
            console.error(err);
            alert('Failed to restart connector');
        }
    };

    const restartTask = async (item: any, taskId: number) => {
        try {
            await item.patch({
                metadata: {
                    annotations: {
                        'strimzi.io/restart-task': taskId.toString()
                    }
                }
            });
            alert(`Restarting task ${taskId}...`);
        } catch (err) {
            console.error(err);
            alert(`Failed to restart task ${taskId}`);
        }
    };

    return (
        <StrimziInstallCheck>
            <DetailsGrid
                resourceType={KafkaConnector as any}
                name={name}
                namespace={namespace}
                withEvents
                actions={(item: any) => [
                    {
                        id: 'restart',
                        action: (
                            <Button variant="contained" color="secondary" size="small" onClick={() => restartConnector(item)}>
                                Restart Connector
                            </Button>
                        ),
                    },
                    {
                        id: 'edit',
                        action: <EditButton item={item} />,
                    },
                    {
                        id: 'view',
                        action: <ViewButton item={item} />,
                    },
                ]}
                extraInfo={(item: any) =>
                    item && [
                        {
                            name: 'Class',
                            value: item.spec?.class || 'N/A',
                        },
                        {
                            name: 'Tasks Max',
                            value: (item.spec?.tasksMax || 0).toString(),
                        },
                        {
                            name: 'State',
                            value: item.status?.connectorStatus?.connector?.state || 'Unknown',
                        },
                    ]
                }
                extraSections={(item: any) =>
                    item && [
                        {
                            id: 'strimzi-connector-tasks',
                            section: (
                                <SectionBox title="Tasks">
                                    <SimpleTable
                                        columns={[
                                            { label: 'ID', getter: (t: any) => t.id },
                                            { label: 'State', getter: (t: any) => t.state },
                                            { label: 'Worker', getter: (t: any) => t.worker_id },
                                            {
                                                label: 'Action',
                                                getter: (t: any) => (
                                                    <Button size="small" variant="outlined" onClick={() => restartTask(item, t.id)}>
                                                        Restart Task
                                                    </Button>
                                                )
                                            }
                                        ]}
                                        data={item.status?.connectorStatus?.tasks || []}
                                    />
                                </SectionBox>
                            ),
                        },
                        {
                            id: 'strimzi-connector-config',
                            section: (
                                <SectionBox title="Connector Configuration">
                                    <pre style={{ overflow: 'auto' }}>
                                        {JSON.stringify(item.spec?.config || {}, null, 2)}
                                    </pre>
                                </SectionBox>
                            ),
                        },
                    ]
                }
            />
        </StrimziInstallCheck>
    );
}

export const registerKafkaConnectorDetails = () => {
    registerDetailsViewSection(({ resource }: { resource: HeadlampKubeObject }) => {
        if (resource.kind !== 'KafkaConnector') return null;

        const item = resource as unknown as any; // Cast to any to access patch and custom fields

        const restartConnector = async () => {
            try {
                await item.patch({
                    metadata: {
                        annotations: {
                            'strimzi.io/restart-connector': 'true'
                        }
                    }
                });
                alert('Restarting connector...');
            } catch (err) {
                console.error(err);
                alert('Failed to restart connector');
            }
        };

        const restartTask = async (taskId: number) => {
            try {
                await item.patch({
                    metadata: {
                        annotations: {
                            'strimzi.io/restart-task': taskId.toString()
                        }
                    }
                });
                alert(`Restarting task ${taskId}...`);
            } catch (err) {
                console.error(err);
                alert(`Failed to restart task ${taskId}`);
            }
        };

        return (
            <>
                <SectionBox title="Management">
                    <Button variant="contained" color="secondary" size="small" onClick={restartConnector}>
                        Restart Connector
                    </Button>
                </SectionBox>
                <SectionBox title="Tasks">
                    <SimpleTable
                        columns={[
                            { label: 'ID', getter: (t: any) => t.id },
                            { label: 'State', getter: (t: any) => t.state },
                            { label: 'Worker', getter: (t: any) => t.worker_id },
                            {
                                label: 'Action',
                                getter: (t: any) => (
                                    <Button size="small" variant="outlined" onClick={() => restartTask(t.id)}>
                                        Restart Task
                                    </Button>
                                )
                            }
                        ]}
                        data={item.status?.connectorStatus?.tasks || []}
                    />
                </SectionBox>
                <SectionBox title="Connector Configuration">
                    <pre style={{ overflow: 'auto' }}>
                        {JSON.stringify(item.spec?.config || {}, null, 2)}
                    </pre>
                </SectionBox>
            </>
        );
    });
};
