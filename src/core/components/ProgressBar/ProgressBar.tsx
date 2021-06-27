import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';

const ProgressBar = () => {
    const router = useRouter();

    let timer: NodeJS.Timeout | null = null

    const routeChangeStart = () => {
        NProgress.set(0.3)
        NProgress.start()
    };

    const routeChangeEnd = () => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            NProgress.done(true)
        }, 200)
    }

    useEffect(() => {
        router.events.on('routeChangeStart', routeChangeStart);
        router.events.on('routeChangeComplete', routeChangeEnd);
        router.events.on('routeChangeError', routeChangeEnd);

        return () => {
            router.events.off('routeChangeStart', routeChangeStart);
            router.events.off('routeChangeComplete', routeChangeEnd);
            router.events.off('routeChangeError', routeChangeEnd);
        };
    });

    return null
};

export default ProgressBar;