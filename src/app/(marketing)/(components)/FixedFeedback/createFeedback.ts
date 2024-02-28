'use server'

import FeedbackEmail from "@/email/emails/gg-feedback-email"
import { resend } from "@/src/libs/resend/client.resend"
import { safeAction } from "@/src/libs/safe-action/utlities"
import {z} from 'zod'

export const createFeedback = safeAction(z.object({
    feedback: z.string(),
    referrer: z.string()
}), async ({
    feedback,
    referrer
}) => {
    console.log(feedback)
    const data = await resend.emails.send({
        from: 'GrantGraph Feedback <websitefeedback@e.grantgraph.com>',
        to: [
            'dan.lannan@grantgraph.com',
            'garrett.faino@grantgraph.com',
            'sam.colombo@grantgraph.com',
            'cam.mahoney@grantgraph.com',
            'jon.montag@grantgraph.com',
            'matt.madden@grantgraph.com',
            'shamar.samuels@grantgraph.com',
            'jonathan.koppelman@grantgraph.com'
        ],
        subject: 'Website Feedback Submitted',
        react: FeedbackEmail({feedback, referrer})
    })
})


