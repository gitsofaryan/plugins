import { MainInfoSection, SectionBox, SimpleTable } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { useParams } from 'react-router-dom';
import KafkaMirrorMaker2 from '../../resources/kafkaMirrorMaker2';
import { useEffect, useState } from 'react';
import { Typography, Grid } from '@mui/material';

export function KafkaMirrorMaker2Details() {
    const { name, namespace } = useParams<{ name: string; namespace: string }>();
    const [item, setItem] = useState<any>(null);

    useEffect(() => {
        if (name && namespace) {
            // @ts-ignore
            KafkaMirrorMaker2.apiEndpoint.get(namespace, name).then(setItem).catch(console.error);
        }
    }, [name, namespace]);

    if (!item) {
        return <Typography>Loading...</Typography>;
    }

    const clusters = item.spec?.clusters || [];

    return (
        <>
            <Typography variant="h4" gutterBottom>
                MirrorMaker 2: {item.metadata.name}
            </Typography>
            <MainInfoSection resource={item} />
            <SectionBox title="Clusters">
                <SimpleTable
                    columns={[
                        { label: 'Alias', getter: (c: any) => c.alias },
                        { label: 'Bootstrap Servers', getter: (c: any) => c.bootstrapServers }
                    ]}
                    data={clusters}
                />
            </SectionBox>
            <SectionBox title="Status">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">Ready Replicas</Typography>
                        <Typography>{item.status?.replicas || 0}</Typography>
                    </Grid>
                </Grid>
            </SectionBox>
        </>
    );
}
