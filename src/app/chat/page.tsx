import { Chat } from "app/components/chat/chat"
import { getProducts } from "app/services/shopify/products"
import { createAgent } from "app/utils/openai/createAgent"

export default async function ChatPage() {

    const products = await getProducts()
    const productTiles = products.map((product: {title: string}) => product.title)
    const flatProductTitles = productTiles.join("\n");

    const agent = createAgent(flatProductTitles);


    console.log(flatProductTitles);


    return (
        <>
            <h1>Chatbot</h1>
            <Chat agent={agent}/>
        </>
    )
}