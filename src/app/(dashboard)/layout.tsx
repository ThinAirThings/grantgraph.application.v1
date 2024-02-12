import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Theme } from '@radix-ui/themes';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Grant Graph',
    description: 'Grant Graph. Get grants faster.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} antialiased `}>
                <Theme appearance='light' panelBackground='solid' accentColor="green" radius="small" className="relative">
                    {children}
                </Theme>
            </body>
        </html>
    )
}