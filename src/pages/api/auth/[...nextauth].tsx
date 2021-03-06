
import { NextApiResponse } from 'next';
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { NextApiRequest } from 'next-auth/_utils';

const options ={
  providers: [ 

      Providers.GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
  ],


}


export default (req: NextApiRequest, res:NextApiResponse): Promise<any> => 
    NextAuth(req, res, options);  