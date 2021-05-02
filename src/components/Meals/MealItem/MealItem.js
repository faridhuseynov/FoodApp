import React, { useContext } from "react"
import CartContext from "../../../store/cart-context";

import classes from "./MealItem.module.css"
import MealItemForm from "./MealItemForm";

const MealItem = props => {
    const price = `$${props.price.toFixed(2)}`;

    const cartCtx = useContext(CartContext);
    const addToCartHandler=(enteredAmount)=>{
        const item={
            id:props.id,
            name:props.name,
            amount:enteredAmount,
            price:props.price
        };

        cartCtx.addItem(item);
    }
    return(
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm addToCart={addToCartHandler}/>
            </div>
        </li>
    )
}

export default MealItem;