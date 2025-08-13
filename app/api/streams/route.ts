import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import {prismaClient} from "../../lib/db"

export async function POST(req : NextRequest) {
    const YT_REGEX = /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})(?:&t=\d+s?)?$/
    const SchemaValidation = z.object({
        creatorId : z.number(),
        url : z.string(),
    })

    try {
        const data = SchemaValidation.parse(await req.json());
        const urlCheck = YT_REGEX.test(data.url)
        if(!urlCheck) {
            return NextResponse.json({
                msg : "Incorrect URL format"
            })
        }
        await prismaClient.streams.create({
            data : {
                userId : data.creatorId,
                url : data.url,
                extractedId : data.url.split("?v=")[1],
            }
        })

        return NextResponse.json({
            msg : "Stream created successfully"
        })
    }
    catch(e) {
        return NextResponse.json({
            msg : "Error pushing to DB"
        })
    }

}