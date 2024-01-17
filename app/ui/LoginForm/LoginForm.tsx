'use client'
import { Button, Card, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import Image from "next/image";
import { FC } from "react";
import { FormField } from "../FormField";
import * as Form from "@radix-ui/react-form";
import { FormButton } from "../FormButton";
import { signInAction } from "../../libs/auth/signInAction";
import { VStack } from "@/styled-system/jsx";
import {useAction} from 'next-safe-action/hooks'
import { submitExecution, getStringError } from "@/app/libs/safe-action/utlities";
import { LoadingButton } from "../LoadingButton/LoadingButton";
import { LockClosedIcon, LockOpen1Icon } from "@radix-ui/react-icons";

export const LoginForm: FC<{
    admin: boolean
}> = ({
    admin
}) => {
    // Form Actions
    const {
        result: signInResult,
        status: signInStatus,
        execute: executeSignIn
    } = useAction(signInAction)
    return (
        <Card className="w-[392px]">
            <VStack gap='5'>
                <VStack alignItems={'center'} gap='10'>
                    <Image src="/assets/logos.grantgraph/logo.long.svg" alt="grantgraph-logo" width={300} height={120}/>
                    {admin && <Heading>GrantGraph Admin Login</Heading>}
                </VStack>
                <Separator size='4' mb='3'/>
                <Form.Root onSubmit={(event) => submitExecution(event, executeSignIn, {
                    admin
                })} style={{width: '100%'}}>
                    <VStack width='full' gap='3'>
                        <FormField label="Email" type="text" fieldKey="email" required={true}/>
                        <FormField label="Password" type="password" fieldKey="password" required={true}/>
                        {(signInResult.data) 
                            && <Text color='red'>{signInResult.data}</Text>
                        }
                        <LoadingButton isLoading={signInStatus === 'executing'} >Sign In</LoadingButton>
                    </VStack>
                </Form.Root>
                <Flex justify={'center'} align='center' gap='4'>
                    <Separator size='3'/>
                    <Text color='gray'>or</Text>
                    <Separator size='3'/>
                </Flex>
                <Button type='button' size='2' variant='outline' color='gray' style={{borderRadius: '100px', width: '100%'}}><LockClosedIcon/>{`Single Sign-On (SS0)`}</Button>
            </VStack>
        </Card>
    )
}