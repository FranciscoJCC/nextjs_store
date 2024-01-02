import { shopifyUrls } from "./urls"
import { env } from "app/config/env"

export const getProducts = async (id?: string): Promise<ProductType[]> => {
    
    try {

        //Verificamos si viene con searchparams
        const apiUrl = id ? `${shopifyUrls.products.all}?ids=${id}` : shopifyUrls.products.all

        const response = await fetch(apiUrl,{
            headers: new Headers({
                'X-Shopify-Access-Token': env.SHOPIFY_TOKEN
            })
        })

        const { products } = await response.json()

        
        //Transformamos la data para definir la estructura de los datos
        const transformedProducts = products.map((product: any)=> {
            return {
                id: product.id,
                gql_id: product.variants[0].id,
                title: product.title,
                description: product.body_html,
                price: product.variants[0].price,
                image: product.images[0].src,
                quantity: product.variants[0].inventory_quantity,
                handle: product.handle,
                tags: product.tags 
            }
        })

        return transformedProducts
    } catch (error) {
       console.log(error) 
    }   
}

//Consulta productos de una colección en especifico
export const getMainProducts = async () => {
    const response = await fetch(shopifyUrls.products.mainProducts, {
        headers: new Headers({
            'X-Shopify-Access-Token': env.SHOPIFY_TOKEN
        }),
        next: {
            revalidate: 60
        }
    })

    /* 
    
        cache: force-cache - Solo forzando a limpiar cache se reflejan cambios
        cache: no- cache - No tiene caché
        next: revalidate - Cada cierto tiempo pide actualizar la caché, en segundos

    */

    const { products } = await response.json()

    return products
}