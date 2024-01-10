"use server"

import { GraphQLClientSingleton } from "app/graphql"
import { createUserMutation } from "app/graphql/mutations/createUserMutation"
import { createAccessToken } from "app/utils/auth/createAccessToken"
import { valideteAccessToken } from "app/utils/auth/validateAccessToken"
import { createCartMutation } from "app/graphql/mutations/createCartMutation"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const handleCreateUser = async (formData : FormData) => {
    const formDataObject = Object.fromEntries(formData);
    delete formDataObject["password_confirmation"]; // Lo eliminamos por que ya validamos que sean iguales los passwords
    const graphQLClient = GraphQLClientSingleton.getInstance().getClient();

    const variables = {
        input: {
            ...formDataObject,
            phone: '+52' + formDataObject.phone
        }
    }


    const { customerCreate }: {
        customerCreate: {
            customer: {
                firstName: string,
                email:string
            }
        }
    } = await graphQLClient.request(createUserMutation, variables)

    const { /* customerUserErrors, */ customer } = customerCreate

    /* console.log(data); */
    if(customer?.firstName){
        await createAccessToken(formDataObject.email as string, formDataObject.password as string)
        redirect('/store')
    }

}

export const handleLogin = async (formData: FormData) => {
    const formDataObject = Object.fromEntries(formData);
    
    const accessToken = await createAccessToken(formDataObject.email as string, formDataObject.password as string)

    if(accessToken)
        redirect("/store")
}


export const handleCreateCart = async (items: CartItem[]) => {
    const cookiesStore = cookies()
    const accesToken = cookiesStore.get('accessToken')?.value as string

    if(!accesToken) redirect('/login')

    const graphqlClient = GraphQLClientSingleton.getInstance().getClient()
    const customer = await valideteAccessToken()
    const variables = {
        input: {
            buyerIdentity: {
                customerAccessToken: accesToken,
                email: customer?.email
            },
            lines: items.map(item => ({
                merchandiseId: item.merchandiseId,
                quantity: item.quantity
            }))
        }
    }

    const { cartCreate }: {
        cartCreate?: {
            cart?: {
                checkoutUrl: string
            }
        }
    } = await graphqlClient.request(createCartMutation, variables)

    return cartCreate?.cart?.checkoutUrl
}