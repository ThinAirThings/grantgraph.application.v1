'use client'

import { css } from "@/styled-system/css"
import { Button, Heading, Popover, TextArea } from "@radix-ui/themes"
import {BeakerIcon} from '@heroicons/react/20/solid'
import { VStack } from "@/styled-system/jsx"
import { useState } from "react"
import { createFeedback } from "./createFeedback"

export const FixedFeedback = () => {
    const [feedback, setFeedback] = useState('')
    const [submitted, setSubmitted] = useState(false)
    return (
        <Popover.Root>
            <Popover.Trigger className={css({position: 'fixed', top: '80px', right: '20px', zIndex: '5'})}>
                <Button 
                    color='orange'
                    size={{
                        initial: '2',
                        md: '4'
                    }}
                ><BeakerIcon width='20px' height='20px'/>We'd love some feedback!</Button>
            </Popover.Trigger>
            <Popover.Content className={css({
                w: {
                    base: `calc(100vw - 40px)`,
                    md: '350px'
                }
            })}>
                {!submitted 
                    ? <VStack  alignItems={'start'}>
                        <Heading size='3'>What do you think of the site?</Heading>
                        <form 
                            className={css({w: 'full'})}
                            onSubmit={async (e) => {
                                e.preventDefault()
                                setSubmitted(true)
                                // Get querystring params
                                const urlParams = new URLSearchParams(window.location.search)
                                await createFeedback({
                                    feedback,
                                    referrer: urlParams.get('referrer') ?? 'Direct'
                                })
                            }}
                        >
                            <VStack alignItems='start'>
                                <TextArea 
                                    className={css({w: 'full'})}
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    placeholder={`I thought step 1 of the How's it Work section was confusing because...`}
                                />
                                <Button>Submit</Button>
                            </VStack>

                        </form>
                    </VStack>
                    : <VStack>
                        <Heading size='3'>Thanks for the feedback!</Heading>
                        <Button 
                            onClick={() => {
                                setSubmitted(false)
                                setFeedback('')
                            }}
                        >Submit more feedback</Button>
                    </VStack>
            }
            </Popover.Content>
        </Popover.Root>
    )
}