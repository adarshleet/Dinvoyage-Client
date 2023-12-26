'use client';
import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from './components/loadingPages/spinner';

const LoginProtectAdmin = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const adminInfo = localStorage.getItem('adminInfo');
        if (!adminInfo) {
            router.push('/admin');
        } else {
            setLoading(false);
        }
    }, [router]);

    return loading ? <Spinner /> : <>{children}</>;
};

export default LoginProtectAdmin;
