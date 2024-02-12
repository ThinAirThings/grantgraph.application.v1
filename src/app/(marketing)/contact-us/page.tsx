import { VStack } from "@/styled-system/jsx";
import { Flex, Heading, Text } from "@radix-ui/themes";
import { ContactForm } from "./client.ContactForm";




export default function () {
    return (
        <VStack justify={'center'} gap='30px' pt='10px' w='full' p='24px'>
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
                    GrantGraph is swiftly onboarding new users. We look forward to collaborating with you to enhance our product according to your requirements.
                </Text>
            </Flex>

            <Flex direction={'column'} align='center' justify={'center'} gap='3' pb='9' width='100%'>
                <ContactForm/>
            </Flex>
        </VStack>
    )
}