import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import {z} from "zod";

export async function Upvote(req : NextRequest) {
    const session = await getServerSession();
    console.log(session);
    const SchemaValidation = z.object({
        streamId : z.number()
    })

    try {
        const user = await prismaClient.user.findFirst({
            where : {
                email : session?.user?.email ?? ""
            }
        })
        
        if(!user) {
            return NextResponse.json({
                msg : "Unauthorized"
            })
        }

        const data = SchemaValidation.parse(await req.json());
        await prismaClient.upvotes.delete({
            where : {
                userId_streamId : {
                    userId : user.id,
                    streamId : data.streamId
                }
            }
        })
        return NextResponse.json({
            msg:  "Downvoted !"
        })
    }
    catch(e) {
        return NextResponse.json({
            msg : "Error pushing upvote to DB"
        })
    }
}