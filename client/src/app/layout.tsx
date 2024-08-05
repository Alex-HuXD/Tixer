import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import { getCurrentUser } from '@/utils/api'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const currentUser = await getCurrentUser()
    return (
        <html lang="en">
            <body className={inter.className}>
                <Nav currentUser={currentUser} />
                {children}
            </body>
        </html>
    )
}
