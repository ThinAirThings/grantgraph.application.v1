'use client'
import { VStack } from "@/styled-system/jsx";
import { Heading } from "@radix-ui/themes";
import { BallTriangle } from "react-loader-spinner";



export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <VStack 
        w='full' 
        h='full' 
        alignItems={'center'} 
        justify='center'
        gap='3'
    >
        <BallTriangle />
        <Heading>Loading...</Heading>
    </VStack>
}