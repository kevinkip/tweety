import { authOptions } from './../pages/api/auth/[...nextauth]';
import { NextApiResponse, NextApiRequest } from 'next';
import { getServerSession } from 'next-auth';

import prisma from '../libs/prismadb'

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
    //get session with nextauth
    const session = await getServerSession(req, res, authOptions );

    // check if we have logged in user
    if (!session?.user?.email) {
        throw new Error('Not signed in');
    }

    // if we are signed in, find current user with email
    const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    });

    // if can't find any user with email
    if(!currentUser){
        throw new Error('Not signed in');
    }

    return { currentUser };
}

export default serverAuth