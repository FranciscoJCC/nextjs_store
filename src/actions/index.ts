"use server"

import { GraphQLClientSingleton } from "app/graphql"
import { createUserMutation } from "app/graphql/mutations/createUserMutation"

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


    const data = await graphQLClient.request(createUserMutation, variables)
    console.log(data);
}