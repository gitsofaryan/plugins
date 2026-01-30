import { Box, CircularProgress, Grid, Link as MuiLink, Typography } from '@mui/material';
import React from 'react';
import { useStrimziInstalled } from '../../hooks/useStrimziInstalled';

interface NotInstalledBannerProps {
    isLoading?: boolean;
}

export function NotInstalledBanner({ isLoading = false }: NotInstalledBannerProps) {
    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" p={2} minHeight="200px">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" p={2} minHeight="200px">
            <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center">
                <Grid item>
                    <Typography variant="h5">
                        Strimzi was not detected on your cluster. If you haven't already, please install it.
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography>
                        Learn how to{' '}
                        <MuiLink
                            href="https://strimzi.io/docs/operators/latest/deploying.html"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            install
                        </MuiLink>{' '}
                        Strimzi
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}

interface StrimziInstallCheckProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export function StrimziInstallCheck({ children, fallback }: StrimziInstallCheckProps) {
    const { isStrimziInstalled, isStrimziCheckLoading } = useStrimziInstalled();

    if (!isStrimziInstalled) {
        return fallback || <NotInstalledBanner isLoading={isStrimziCheckLoading} />;
    }

    return <>{children}</>;
}
