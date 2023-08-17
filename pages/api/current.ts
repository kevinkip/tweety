import serverAuth from '@/libs/serverAuth';
import { NextApiRequest, NextApiResponse } from 'next';
//used to fetch our current user


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method !== 'GET'){
        return res.status(405).end();
    }

    try {
        //extract current user from library created in serverAuth.ts
        const { currentUser } = await serverAuth(req, res);

        // going to use serverAuth, to get current session we're getting.
        // check if we're logged in
        // find user with email
        // return user to use however we want.

        return res.status(200).json(currentUser);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}