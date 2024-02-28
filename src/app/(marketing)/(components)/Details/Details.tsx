import { AspectRatio, Grid, HStack, VStack } from "@/styled-system/jsx"
import { RocketIcon } from "@radix-ui/react-icons"
import { Button, Heading, Inset, Text } from "@radix-ui/themes"
import Image from "next/image"
import Link from "next/link"



export const Details = () => {
    return (
        <VStack 
            alignItems={'start'} 
            w='full' 
            bg='token(colors.green.dark.2)'
            px={{base: '16px', md: '32px', lg: '100px'}}
            py={{base: '73px', sm: '128px'}}
            gap='50px'
        >
            <VStack w='full'>
                <HStack justify={'space-between'} w='full' pb='20px'>
                    <Heading color='green' >How's it work?</Heading>
                    <Link href='/contact-us'><Button variant="outline"><RocketIcon/>Schedule a Demo!</Button></Link>
                </HStack>
                <Grid
                    w='full'
                    columns={{
                        base: 1,
                        sm: 2
                    }}
                    gridTemplateColumns={{
                        base: 'minmax(0, 1fr)',
                        sm: `minmax(0, 1.5fr) minmax(0, 2fr)`
                    }}
                    gap='50px'
                    py='20px'
                >
                    {/* Step 1 */}
                    <VStack alignItems='start' gap='5px'>
                        <Heading size='3' color='green' highContrast>STEP 1</Heading>
                        <Heading size='3' color='gray'>AUTOMATIC ONBOARDING</Heading>
                        <Heading 
                            size={{
                                initial: '6',
                                sm: '7'
                            }}
                        >Our platform navigates your faculty pages and generates a distinct profile for each member of your research faculty.</Heading>
                    </VStack>
                    <VStack
                        borderRadius={'2xl'}
                        bgGradient={'to-br'}
                        gradientFrom='token(colors.green.dark.10)'
                        gradientTo='token(colors.green.dark.3)'
                        height='500px'
                        w='765px'
                        h='480px'
                        overflow='hidden'
                        pt='25px'
                        pl='25px'
                    >
                        <AspectRatio ratio={1.59} w='full'>
                            <Image
                                src={'/assets/marketing.mockups/macbook.cut.onboard.png'} 
                                alt='graph-background'
                                fill={true}
                            />
                        </AspectRatio>
                    </VStack>
                </Grid>
            </VStack>
            
            {/* Step 2 */}
            <Grid
                w='full'
                columns={{
                    base: 1,
                    sm: 2
                }}
                gridTemplateColumns={{
                    base: 'minmax(0, 1fr)',
                    sm: `minmax(0, 2fr) minmax(0, 1.5fr)`
                }}
                gap='50px'
                py='20px'
            >
                <VStack 
                    gap='5px'
                    alignItems='start' 
                    order={{
                        base: 1,
                        sm: 2
                    }}
                >
                    <Heading size='3' color='green' highContrast>STEP 2</Heading>
                    <Heading size='3' color='gray'>GET MATCHES</Heading>
                    <Heading 
                        size={{
                            initial: '6',
                            sm: '7'
                        }}
                    >Our AI engine recommends teams with complementary skillsets and experience for specific funding opportunities.</Heading>
                </VStack>
                <VStack
                    order={{
                        base: 2,
                        sm: 1
                    }}
                    borderRadius={'2xl'}
                    bgGradient={'to-br'}
                    gradientFrom='token(colors.green.dark.10)'
                    gradientTo='token(colors.green.dark.3)'
                    w={{
                        base: 'full',
                        sm: '765px'
                    }}
                    h={{
                        base: '680px',
                        sm: '500px'
                    }}
                    justifySelf={{
                        base: 'start',
                        sm: 'end'
                    }}
                    overflow='hidden'
                    pt='25px'
                    pl='25px'
                >
                    <AspectRatio ratio={1.356} w='full'
                        display={{
                            base: 'none',
                            md: 'block'
                        }}
                    >
                        <Image
                            src={'/assets/marketing.mockups/macbook.cut.matches.png'} 
                            alt='graph-background'
                            fill={true}
                        />
                    </AspectRatio>
                    <AspectRatio ratio={0.51} 
                        w='full'
                        display={{
                            base: 'flex',
                            md: 'none'
                        }}
                        position='relative'
                        left='-25px'
                    >
                        <Image
                            src={'/assets/marketing.mockups/iphone.matches.png'} 
                            alt='graph-background'
                            fill={true}
                        />
                    </AspectRatio>
                </VStack>
            </Grid>
            {/* Step 3 */}
            <Grid
                w='full'
                columns={{
                    base: 1,
                    sm: 2
                }}
                gridTemplateColumns={{
                    base: 'minmax(0, 1fr)',
                    sm: `minmax(0, 1.5fr) minmax(0, 2fr)`
                }}
                gap='50px'
                py='20px'
            >
                <VStack 
                    gap='5px'
                    alignItems='start' 
                >
                    <Heading size='3' color='green' highContrast>STEP 3</Heading>
                    <Heading size='3' color='gray'>START THE CONVERSATION</Heading>
                    <Heading 
                        size={{
                            initial: '6',
                            sm: '7'
                        }}
                    >The GrantGraph platform gives researchers and universities the tools to manage grant proposal construction right out of the box.</Heading>
                </VStack>
                <VStack
                    borderRadius={'2xl'}
                    bgGradient={'to-br'}
                    gradientFrom='token(colors.green.dark.10)'
                    gradientTo='token(colors.green.dark.3)'
                    height='500px'
                    overflow='hidden'
                    position='relative'
                    pr={{
                        sm: '25px',
                        base: '0'
                    }}
                    pl={{
                        base: '25px',
                        sm: '0'
                    }}
                    pt='25px'
                    w={{
                        base: 'full',
                        sm: '765px'
                    }}
                    h={{
                        base: '680px',
                        sm: '500px'
                    }}
                >
                    <AspectRatio 
                        ratio={1.497} 
                        w='full'
                        position={'relative'}
                        display={{
                            base: 'none',
                            md: 'block'
                        }}
                    >
                        <Image
                            src={'/assets/marketing.mockups/macbook.cut.groups.png'} 
                            alt='graph-background'
                            fill={true}
                        />
                    </AspectRatio>
                    <AspectRatio ratio={0.51} 
                        w='full'
                        display={{
                            base: 'flex',
                            md: 'none'
                        }}
                        position='relative'
                        left='-25px'
                    >
                        <Image
                            src={'/assets/marketing.mockups/iphone.groups.png'} 
                            alt='graph-background'
                            fill={true}
                        />
                    </AspectRatio>
                </VStack>
            </Grid>
        </VStack>
    )
}