import { LabeledField } from "@/src/interface/LabeledField/client.LabeledField";
import { Box, HStack, VStack } from "@/styled-system/jsx";
import { Badge, Button, Heading, Strong, Text } from "@radix-ui/themes";
import { ProfileExtraction } from "./client.ProfileExtraction";





export default function () {
    return (
        <VStack 
            justify={'center'} 
            gap='30px' 
            pt='10px' 
            w='full' 
            px={{
                base: '24px',
                sm: '256px',
            }}
        >
            <HStack w='full'>
                <Heading size='7'>Let's get started!</Heading>
            </HStack>
            <HStack w='full' alignItems={'start'}>
                <Badge size={{
                    initial: '1',
                    xs: '2'
                }} color='green'>Step 1</Badge>
                <Text 
                    size={{
                        initial: '3',
                        md: '5'
                    }}
                >
                Add a link to a profile of yours with information about your area of study.</Text>
            </HStack>
            <ProfileExtraction/>
        </VStack>
    )
}