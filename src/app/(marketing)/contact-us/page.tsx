import { VStack } from "@/styled-system/jsx";
import { Flex, Heading, Text } from "@radix-ui/themes";
import { ContactForm } from "./client.ContactForm";




export default function () {
    return (
        <VStack justify={'center'} gap='30px' pt='150px' w='full'
            px={{
                base: '16px',
                sm: '68px',
                md: '122px',
                lg: '400px'
            }}
        >
            <Flex direction={'column'} align='center' justify={'center'} gap='3' style={{width: '100%'}}>
                <Heading size={{
                    initial: '5',
                    md: '7'
                }} color='green'>Contact Us</Heading>
                <Heading 
                    size={{
                        initial: '7',
                        md: '9'
                    }} 
                    align='center'
                >
                    Let's get you setup.
                </Heading>
                <Text
                    color='gray' 
                    size={{
                        initial: '3',
                        md: '5'
                    }}

                    align='center'
                >
                    GrantGraph is welcoming new users aboard! We're rapidly iterating on the product and excited to build the features you need.
                </Text>
            </Flex>

            <Flex direction={'column'} align='center' justify={'center'} gap='3' pb='9' width='100%'>
                <ContactForm/>
            </Flex>
        </VStack>
    )
}