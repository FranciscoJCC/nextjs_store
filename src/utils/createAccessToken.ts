import { GraphQLClientSingleton } from 'app/graphql';
import { customerAccessTokenCreaeMutation } from 'app/graphql/mutations/customerAccessTokenCreate';
import { cookies } from 'next/headers'

export const createAccessToken = async (email: string, password: string) => {
    const cookiesStore = cookies();
    const graphdqlClient = GraphQLClientSingleton.getInstance().getClient()

    const {customerAccessTokenCreate } = await graphdqlClient.request(customerAccessTokenCreaeMutation,{
        "email": email,
        "password": password,
    })

    const { accessToken, expiresAt } = customerAccessTokenCreate?.customerAccessToken;

    if(accessToken){
        cookiesStore.set("accessToken", accessToken, {
            path: "/",
            expires: new Date(expiresAt),
            httpOnly: true,
            sameSite: "strict"    
        })
    }
}