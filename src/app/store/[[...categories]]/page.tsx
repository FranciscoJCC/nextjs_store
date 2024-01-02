import { ProductsWrapper } from "app/components/store/ProductsWrapper"
import { getCollections, getCollectionsProducts } from "app/services/shopify/collections"
import { getProducts } from "app/services/shopify/products"

interface CategoryProps {
    params: {
        categories: string[],
    }
    searchParams? : string
}

export default async function Category(props: CategoryProps) {
    //parametros de ruta
    const { categories } = props.params

    let products = []
    const collections = await getCollections()

    if(categories?.length > 0){
        const selectedCollectionId = collections.find((collection : any) => collection.handle === categories[0]).id
        products = await getCollectionsProducts(selectedCollectionId)
    }else{
        products = await getProducts()
    }
    
    return(
        <ProductsWrapper products={products}/>
    )
}