import { Utils } from '@kinvolk/headlamp-plugin/lib';
import { KubeObject } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';
import { SectionBox, SimpleTable } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

// Define Event resource
class Event extends KubeObject {
    static kind = 'Event';
    static apiName = 'events';
    static apiVersion = 'v1';
    static isNamespaced = true;
}

export function EventsTimeline({ resource }: { resource: any }) {
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        if (resource) {
            // @ts-ignore
            Event.apiEndpoint.list(resource.metadata.namespace).then((list: any) => {
                const filtered = list.items.filter((e: any) =>
                    e.involvedObject.name === resource.metadata.name &&
                    e.involvedObject.kind === resource.kind
                );
                // Sort by lastTimestamp desc
                filtered.sort((a: any, b: any) => new Date(b.lastTimestamp).getTime() - new Date(a.lastTimestamp).getTime());
                setEvents(filtered);
            }).catch(console.error);
        }
    }, [resource]);

    if (events.length === 0) {
        return (
            <SectionBox title="Operational Events">
                <Typography>No recent events found.</Typography>
            </SectionBox>
        );
    }

    return (
        <SectionBox title="Operational Events">
            <SimpleTable
                columns={[
                    { label: 'Type', getter: (e: any) => e.type },
                    { label: 'Reason', getter: (e: any) => e.reason },
                    { label: 'Message', getter: (e: any) => e.message },
                    {
                        label: 'Last Seen',
                        getter: (e: any) => Utils.localeDate(e.lastTimestamp || e.eventTime)
                    }
                ]}
                data={events}
            />
        </SectionBox>
    );
}
