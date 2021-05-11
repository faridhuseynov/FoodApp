import React, { useContext, useState } from "react"
import CartContext from "../../store/cart-context"
import Modal from "../UI/Modal/Modal"
import CartItem from "./CartItem"

import classes from "./Cart.module.css"
import Checkout from "./Checkout"

const Cart = props => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);
    const totalAmountPrice = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
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

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://foodapp-8cd60-default-rtdb.firebaseio.com/orders.json', {
          method: 'POST',
          body: JSON.stringify({
            user: userData,
            orderedItems: cartCtx.items,
          }),
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
      };

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
    
    const cartModalContent = (
        <React.Fragment>
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmountPrice}</span>
          </div>
          {isCheckout && (
            <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
          )}
          {!isCheckout && modalActions}
        </React.Fragment>
      );
    
      const isSubmittingModalContent = <p>Sending order data...</p>;
    
      const didSubmitModalContent = (
        <React.Fragment>
          <p>Successfully sent the order!</p>
          <div className={classes.actions}>
          <button className={classes.button} onClick={props.onClose}>
            Close
          </button>
        </div>
        </React.Fragment>
      );

    return (
        <Modal onClose={props.onClose}>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubmittingModalContent}
        {!isSubmitting && didSubmit && didSubmitModalContent}
      </Modal>
    )
}

export default Cart;