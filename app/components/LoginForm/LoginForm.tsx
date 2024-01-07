'use client'
import { Card, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import Image from "next/image";
import { FC } from "react";
import { FormField } from "../FormField";
import * as Form from "@radix-ui/react-form";
import { FormButton } from "../FormButton";
import { useFormState } from "react-dom";
import { signInAction } from "./actions/signInAction";

export const LoginForm: FC<{
    admin: boolean
}> = ({
    admin
}) => {
    // Form Actions
    const [errorMessage, signInFormAction] = useFormState(
        signInAction, 
        undefined
    )
    return (
        <Card className="w-[392px]">
            <Flex direction={'column'} gap='3'>
                <Flex direction={'column'} align={'center'} gap='5'>
                    <Image src="/assets/logos.grantgraph/logo.long.svg" alt="grantgraph-logo" width={300} height={120}/>
                    {admin && <Heading>GrantGraph Admin Login</Heading>}
                </Flex>
                <Separator size='4' mb='3'/>
                <Form.Root action={signInFormAction} style={{width: '100%'}}>
                    {admin && <input type="hidden" name="_admin" value={admin.toString()}/>}
                    <Flex direction={'column'} gap='3'>
                        <FormField label="Email" type="text" fieldKey="email" required={true}/>
                        <FormField label="Password" type="password" fieldKey="password" required={true}/>
                        {errorMessage && <Text color='red'>{errorMessage}</Text>}
                        <FormButton mt='5'>Sign In</FormButton>
                    </Flex>
                </Form.Root>
            </Flex>
        </Card>
    )
}