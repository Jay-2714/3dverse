import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "sqlite",
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // 1 day
    },
    socialProviders: {
        google: {
            enabled: true,
            prompt: "select_account",
            clientId: process.env.GOOGLE_CLIENT_ID as string,     
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
        github: {
            enabled: true,
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
        twitter: {
            enabled: true,
            clientId: process.env.TWITTER_CLIENT_ID as string,
            clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
        }
    },
    plugins: [nextCookies()],
});
