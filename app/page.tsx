import { Box, Button, Flex } from '@radix-ui/themes'
import Image from 'next/image'
import Link from 'next/link'

export default function Home () {
    return (
        <Flex gap='3' direction='column' justify={'center'} align={'center'} className="w-screen h-screen">
            <Box><Image alt="grantgraph-logo" src="/assets/logos.grantgraph/logo.long.svg" width={300} height={400} /></Box>
            <Link href="/login">
                <Button>Go to Login</Button> 
            </Link>
        </Flex>
    )
}

