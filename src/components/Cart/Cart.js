import React, { useContext, useState } from "react"
import CartContext from "../../store/cart-context"
import Modal from "../UI/Modal/Modal"
import CartItem from "./CartItem"

import classes from "./Cart.module.css"
import Checkout from "./Checkout"

const Cart = props => {
    const cartCtx = useContext(CartContext);
    const totalAmountPrice = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
    const [isCheckout, setIsCheckout] = useState(false);
    const cartItemAddHandler = item => {
        const itemToAdd = { ...item, amount: 1 };
        cartCtx.addItem(itemToAdd);
    }

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    }

    const orderClickedHandler=()=>{
        setIsCheckout(true);
    }
    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map(item =>
                <CartItem
                    key={item.id}
                    amount={item.amount}
                    name={item.name}
                    price={item.price}
                    onAdd={cartItemAddHandler.bind(null, item)}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)} />)}
        </ul>
    )
    const modalActions = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        {hasItems && <button className={classes.button} onClick={orderClickedHandler}>Order</button>}
    </div>;
    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmountPrice}</span>
            </div>
            {isCheckout && <Checkout onCancel={props.onClose} />}
            {!isCheckout && modalActions}
        </Modal>
    )
}

export default Cart;