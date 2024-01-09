"use client"
import { useShoppingCart } from "app/hooks/useShoppingCart"
import { SyntheticEvent, useState } from "react"
import { FaShoppingCart } from "react-icons/fa"
import styles from "./ProductViewItemsOrder.module.sass"


interface ProductViewItemsOrderProps {
    maxQuantity: number,
    product: ProductType
}

export const ProductViewITemsOrder = ({ maxQuantity, product} : ProductViewItemsOrderProps) => {

    //Estado del carrito
    const { addToCart } = useShoppingCart();

    const [counter, setCounter] = useState(1);

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
    }

    const handleSubtract = (event: SyntheticEvent) => {
        event.preventDefault();
        if(counter === 1) return;
        setCounter(counter - 1);
    }

    const handleAdd = (event: SyntheticEvent) => {
        event.preventDefault();
        if( counter === maxQuantity) return;
        setCounter(counter + 1);
    }

    //Funcion para agregar items al carrito
    const handleAddToCart = (event: SyntheticEvent) => {
        event.preventDefault();
        
        addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: counter,
            image: product.image,
            merchandiseId: product.gql_id
        })
    }

    return(
        <div className={styles.ProductViewItemsOrder}>
            <div className={styles.ProductViewItemsOrder__itemsCount}>
                <button onClick={handleSubtract}>-</button>
                <p>{ counter }</p>
                <button onClick={handleAdd}>+</button>
            </div>
            <form
                onSubmit={handleSubmit}
                className={styles.ProductViewItemsOrder__form}
            >
                <button onClick={handleAddToCart} className={styles.ProductViewItemsOrder__submit}>
                    <FaShoppingCart/>
                    <span>Add to cart</span>
                </button>
            </form>
        </div>
    )
}