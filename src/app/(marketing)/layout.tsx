import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Theme } from '@radix-ui/themes';
import { Box, VStack } from '@/styled-system/jsx';
import { Header } from '@/src/app/(marketing)/(components)/Header/Header';
import { Footer } from './(components)/Footer/Footer';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Grant Graph',
    description: 'Grant Graph. Get grants faster.',
}

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} antialiased `}>
                <Theme appearance='dark' panelBackground='solid' accentColor="green" radius="small" className="relative">
                    <VStack justify={'top'} alignItems='center' height='full' width='screen' gap='0px'>
                        <Header/>
                        {/* <Box w='full' h='68px'></Box> */}
                        {children}
                        <Footer/>
                    </VStack>
                </Theme>
            </body>
        </html>
    )
}