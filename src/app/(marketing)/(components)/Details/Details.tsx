import { Grid, VStack } from "@/styled-system/jsx"
import { Heading, Text } from "@radix-ui/themes"
import Image from "next/image"



export const Details = () => {
    return (
        <Grid
            w='full'
            py={{
                base: '16px',
                sm: '32px',
            }}
            px={{
                base: '32px',
                sm: '256px',
            }}
            alignItems={{
                base: 'start'
            }}
            columns={{
                base: 1,
                sm: 2,
            }}
            bg='token(colors.green.2)'
        >
            <VStack alignItems={'start'}>
                <Heading as='h3' color='green'>Ai Powered Grant Search</Heading>
                <Heading as='h3' size={{
                    initial: '8'
                }}>Find grants tailored to specific researchers and teams.</Heading>
                <Text size='4' color='gray'>Take the pain out of identifying relevant grant opportunities. Use GrantGraph to find opportunities which fit your organizations areas of research and eligibility requirements.</Text>
            </VStack>
            <VStack w={{
                base: 'full',
            }}>
                <Image
                    src="/assets/marketing.mockups/macbook.png"
                    alt="Picture of a macbook"
                    width={403}
                    height={399}
                />
            </VStack>
        </Grid>
    )
}