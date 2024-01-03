import Image from 'next/image'
import styles from './MainProducts.module.sass'
import { getMainProducts } from 'app/services/shopify/products'


export const MainProducts = async () => {

    const products = await getMainProducts()

    return (
        <section className={styles.MainProducts}>
            <h3>✨ New Products released!</h3>
            <div className={styles.MainProducts__grid}>
                {products?.map((product: ProductType) =>{
                    const imageSrc = product.image;
                    return (
                        <article>
                            <p>{ product.title }</p>
                            <Image src={imageSrc} fill sizes='500' alt={product.title} loading='eager'/>
                        </article>
                    )
                })}
            </div>
        </section>
    )
}