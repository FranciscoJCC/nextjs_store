"use server"

import { GraphQLClientSingleton } from "app/graphql"
import { createUserMutation } from "app/graphql/mutations/createUserMutation"
import { createAccessToken } from "app/utils/createAccessToken"
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


    const { customerCreate } = await graphQLClient.request(createUserMutation, variables)
    const { customerUserErrors, customer } = customerCreate

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