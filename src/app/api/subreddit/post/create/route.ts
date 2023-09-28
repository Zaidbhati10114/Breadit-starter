import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { PostValidator } from "@/lib/validators/post";
import { z } from "zod";


export async function POST(req: Request) {
    try {
        const session = await getAuthSession();
        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 })
        }

        const body = await req.json();
        const { subredditId, title, content } = PostValidator.parse(body)

        const subscriptionExists = await db.subscription.findFirst({
            where: {
                subredditId,
                userId: session.user.id,
            },
        })

        if (!subscriptionExists) {
            return new Response('Subcribe to Post', { status: 403 })
        }

        // create post

        await db.post.create({
            data: {
                title,
                content,
                authorId: session.user.id,
                subredditId,
            }
        })

        return new Response('OK')



    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response('Invalid request data passed', { status: 400 })
        }

        return new Response('Could not create post', { status: 500 })

    }
}