import React, { useContext } from "react"
import CartContext from "../../store/cart-context"
import Modal from "../UI/Modal/Modal"
import CartItem from "./CartItem"

import classes from "./Cart.module.css"

const Cart = props => {
    const cartCtx = useContext(CartContext);
    const totalAmountPrice = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemAddHandler = item => {
        const itemToAdd = {...item,amount:1};
        cartCtx.addItem(itemToAdd);
    }

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map(item =>
                <CartItem
                    key={item.id}
                    amount={item.amount}
                    name={item.name}
                    price={item.price}
                    onAdd = {cartItemAddHandler.bind(null, item)}
                    onRemove = {cartItemRemoveHandler.bind(null,item.id)} />)}
        </ul>
    )
    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmountPrice}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
}

export default Cart;