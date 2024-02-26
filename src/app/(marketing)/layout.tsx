import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Theme } from '@radix-ui/themes';
import { Box, VStack } from '@/styled-system/jsx';
import { Header } from '@/src/app/(marketing)/(components)/Header/Header';
import { Footer } from './(components)/Footer/Footer';
import Script from 'next/script';


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
            {process.env.NODE_ENV === "production" && <Script>{`(function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "l6darse1vu");`}
            </Script>}
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