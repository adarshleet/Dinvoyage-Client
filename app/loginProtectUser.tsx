'use client';
import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from './components/loadingPages/spinner';

const LoginProtectUser = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) {
            router.push('/login');
        } else {
            setLoading(false);
        }
    }, [router]);

    return loading ? <Spinner /> : <>{children}</>;
};

export default LoginProtectUser;
