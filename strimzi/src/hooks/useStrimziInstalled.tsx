import { useEffect, useState } from 'react';
import { isStrimziInstalled as checkStrimziInstallation } from '../isStrimziInstalled';

export function useStrimziInstalled() {
    const [isStrimziInstalled, setIsStrimziInstalled] = useState<boolean | null>(null);

    useEffect(() => {
        async function checkStrimziInstalled() {
            const isInstalled = await checkStrimziInstallation();
            setIsStrimziInstalled(!!isInstalled);
        }
        checkStrimziInstalled();
    }, []);

    return {
        isStrimziInstalled,
        isStrimziCheckLoading: isStrimziInstalled === null,
    };
}
