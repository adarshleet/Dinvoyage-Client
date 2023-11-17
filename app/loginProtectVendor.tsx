'use client';
import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from './components/loadingPages/spinner';

const LoginProtect = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const vendorInfo = localStorage.getItem('vendorInfo');
        if (!vendorInfo) {
            router.push('/vendor');
        } else {
            setLoading(false);
        }
    }, []);

    return loading ? <Spinner /> : <>{children}</>;
};

export default LoginProtect;
