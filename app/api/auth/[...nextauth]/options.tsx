import { NextAuthOptions } from 'next-auth';
import bcrypt from 'bcryptjs';

// providers
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

// usermodel
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/lib/Models/User';

// type
import { User } from 'next-auth';
import { getUserByEmail } from '@/lib/ApiFunctions/User';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                identifier: { label: 'Username or Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials): Promise<User | null> {

                if (credentials) {

                    await dbConnect();

                    try {
                        const user = await UserModel.findOne({
                            $or: [
                                { email: credentials.identifier },
                                { username: credentials.identifier },
                            ],
                        });

                        if (!user) {
                            console.error('No user found with this email or username');
                            return null;
                        }

                        const isPasswordCorrect = await bcrypt.compare(
                            credentials.password,
                            user.password as string
                        );

                        if (isPasswordCorrect) {
                            return user;

                        } else {
                            console.error('Incorrect password');
                            return null;
                        }

                    } catch (error) {
                        console.error(error);
                        return null;
                    }
                } else {
                    return null;
                }

            },
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {

            if (account?.provider !== "credentials") {
                if (user) {
                    const res = await getUserByEmail(user.email)
                    if (res) {
                        return true
                    } else {
                        await dbConnect();
                        try {
                            const newUser = new UserModel({
                                username: user.name,
                                email: user.email,
                                image: user.image,
                                password: null,
                                verifyCode: null,
                                isVerified: true,
                            })
                            const res = await newUser.save()

                            if (!res) {
                                console.log("Something went wrong while saving the user.")
                                return false
                            }

                            return true

                        } catch (error) {
                            console.log("callback Error at Login :", error)
                            return false
                        }
                    }
                }

            }

            return true
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id?.toString();
                token.name = user.username;
                token.type = user.type;
                token.wishlist = user.wishlist;
            } else {
                const res = await getUserByEmail(token.email);
                if (res) {
                    token.id = res.id
                    token.name = res.username
                }
                return token
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.type = token.type;
                session.user.wishlist = token.wishlist;
            }
            return session;
        },
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
        error: '/error',
    },
};