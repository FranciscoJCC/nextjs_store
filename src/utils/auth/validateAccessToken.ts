import { cookies } from "next/headers"
import { GraphQLClientSingleton } from "app/graphql";
import { customerName } from "app/graphql/queries/customerName";



export const valideteAccessToken = async () => {
    try {
        const cookiesStore = cookies();
        //Obtenemos accessToken en cookies
        const accessToken = cookiesStore.get('accessToken')?.value;
        const graphQLClient = GraphQLClientSingleton.getInstance().getClient();

        const { customer } = await graphQLClient.request(customerName, {
            customerAccessToken: accessToken
        });

        return customer;
    } catch (error) {
        console.log(error)
    }     
}