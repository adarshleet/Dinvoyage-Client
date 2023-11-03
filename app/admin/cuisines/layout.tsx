import '../../../app/globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import { ReactQueryProvider } from '@/app/ReactQueryProvider'

const inter = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Login',
    description: 'Generated by create next app',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ReactQueryProvider>
            <html lang="en">
                <body className={`${inter.className}`}>{children}</body>
            </html>
        </ReactQueryProvider>
    )
}
