'use client'

import { Box, Container, Flex, Text, TextArea, TextField } from "@radix-ui/themes"
import * as Form from "@radix-ui/react-form";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { LoadingButton } from "@/src/interface/LoadingButton/LoadingButton";
import { submitContactForm } from "./action.submitContactForm";

export const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    return (
        <Flex direction={'column'} gap='3' align='center' justify={'start'} width={'100%'}>
            <Container size='1' width='100%'>
                {isSubmitted ? (
                    <Flex direction={'column'} gap='3' align='center' justify={'center'} width={'100%'}>
                        <Text
                            color='green' 
                            size={{
                                initial: '3',
                                md: '5'
                            }}
                            align='center'
                        >
                            Thanks for reaching out! We'll get back to you as soon as possible.
                        </Text>
                    </Flex>
                ): (
                    <Form.Root 
                        onSubmit={async (event) => {
                            event.preventDefault()
                            setIsSubmitting(true)
                            await submitContactForm({
                                email,
                                message
                            })
                            setIsSubmitting(false)
                            setIsSubmitted(true)
                        }}
                    >
                        <Flex direction={'column'} gap='4'>
                            <Form.Field name="email" asChild>
                                <Flex direction={'column'} gap={'2'} 
                                    className="w-[370px]
                                        md:w-[600px]
                                    "
                                >
                                    <Text weight={'medium'}>Email:</Text>
                                    <Form.Control asChild>
                                        <TextField.Input
                                            required
                                            type="email"
                                            placeholder={'kelly.smith@university.edu'}
                                            style={{width: '100%'}}
                                            onChange={(event) => setEmail(event.target.value)}
                                        />
                                    </Form.Control>
                                    <Form.Message match="valueMissing" asChild>
                                        <Text color="crimson">Please enter a valid email.</Text>
                                    </Form.Message>
                                </Flex>
                            </Form.Field>
                            <Form.Field name="message" asChild>
                                <Flex direction={'column'} gap={'2'} width={'100%'}>
                                    <Text weight={'medium'}>What are you interested in?</Text>
                                    <Form.Control asChild>
                                        <TextArea
                                            size='3'
                                            required
                                            placeholder={`I'm looking to leverage intelligent grant search for my organization.`}
                                            style={{width: '100%', height: '150px'}}
                                            onChange={(event) => setMessage(event.target.value)}
                                        />
                                    </Form.Control>
                                    <Form.Message match="valueMissing" asChild>
                                        <Text color="crimson">Please enter a message!</Text>
                                    </Form.Message>
                                </Flex>
                            </Form.Field>
                            <Form.Submit asChild>
                                <LoadingButton
                                    isLoading={isSubmitting}
                                ><PaperPlaneIcon/>{`Send`}
                                </LoadingButton>
                            </Form.Submit>
                        </Flex>
                    </Form.Root>
                )}
            </Container>
        </Flex>
    )
}