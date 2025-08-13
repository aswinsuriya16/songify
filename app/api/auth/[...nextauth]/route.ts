import { prismaClient } from "@/app/lib/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers : [
        GoogleProvider({
            clientId : process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret : process.env.GOOGLE_CLIENT_SECRET ?? ""
        })
    ],
    callbacks : {
        async signIn({user}) {
            if(!user) { 
                return false;
            }
            await prismaClient.user.upsert({
                where : {
                    email : user.email ?? ""
                },
                update : {},
                create : {
                    email : user.email ?? ""
                }
            })
            return true;
        },
    }
})

export {handler as GET , handler as POST}
