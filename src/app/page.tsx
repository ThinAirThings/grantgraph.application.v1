import { VStack } from '@/styled-system/jsx'
import { Button} from '@radix-ui/themes'
import Image from 'next/image'
import Link from 'next/link'

export default function Home () {
    return (
        <VStack justify={'center'} alignItems='center' height='screen' width='screen'>
            <Image alt="grantgraph-logo" src="/assets/logos.grantgraph/logo.long.svg" width={300} height={400} />
            <Link href="/login">
                <Button>Go to Login</Button> 
            </Link>
        </VStack>
    )
}

