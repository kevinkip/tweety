import bcrypt from 'bcrypt'
import NextAuth, { AuthOptions} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import prisma from '@/libs/prismadb'

export const authOptions: AuthOptions = ({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials){
                // check if credentials have email or password
                if(!credentials?.email || !credentials?.password){
                    throw new Error('Invalid credentials');
                }

                //confirm user exists
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email //user credential.email to find existing user
                    }
                });

                if (!user || !user?.hashedPassword){
                    throw new Error('Invalid credentials');
                }

                //check if pass is correct

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                )

                if (!isCorrectPassword){
                    throw new Error('Invalid credentials')
                }

                // everything is okay, return user
                return user;
            }
        })
    ],
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET
});

export default NextAuth(authOptions);