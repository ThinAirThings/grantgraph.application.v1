import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Theme } from '@radix-ui/themes';
import { Box, VStack } from '@/styled-system/jsx';
import { Header } from '@/src/app/(marketing)/(components)/Header/Header';
import { Footer } from './(components)/Footer/Footer';
import Script from 'next/script';
import { FixedFeedback } from './(components)/FixedFeedback/FixedFeedback';


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
            {/* Microsoft Clarity */}
            {process.env.NODE_ENV === "production" && <Script>{`(function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "l6darse1vu");`}
            </Script>}
            {/* Google Tag Manager */}
            {process.env.NODE_ENV === "production" && <>
                <Script>{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-KFWQ9T3V');
                `}</Script>
            </>}
            <body className={`${inter.className} antialiased `}>
                {process.env.NODE_ENV === "production" &&<>
                    <noscript>
                        <iframe 
                            src="https://www.googletagmanager.com/ns.html?id=GTM-KFWQ9T3V"
                            height="0" width="0" style={{display:'none', visibility:'hidden'}}
                        />
                    </noscript>
                </>}
                <Theme appearance='dark' panelBackground='solid' accentColor="green" radius="small" className="relative">
                    <VStack justify={'top'} alignItems='center' height='full' width='screen' gap='0px' position='relative'>
                        <Header/>
                        {/* <Box w='full' h='68px'></Box> */}
                        {children}
                        <Footer/>
                        <FixedFeedback/>
                    </VStack>
                </Theme>
            </body>
        </html>
    )
}