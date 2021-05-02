import React, { useRef, useState } from "react"
import CartContext from "../../../store/cart-context";
import Input from "../../UI/Input/Input";

import classes from "./MealItemForm.module.css"




const MealItemForm = props =>{
    const amountInputRef = useRef();
    const [amountIsValid,setAmountIsValid]=useState(true);

    const submitHandler = event =>{
        event.preventDefault();
        const enteredAmount =amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        if(enteredAmount.trim().length<1||enteredAmountNumber<1|enteredAmountNumber>5){
            setAmountIsValid(false);
            return;
        }
        props.addToCart(enteredAmountNumber);
    }


    return(
        <form className={classes.form} onSubmit={submitHandler}>
        <Input
            ref = {amountInputRef}
            label="Amount" input={{
            id:'amount',
            type:'number',
            min:'1',
            max:'5',
            step:'1',
            defaultValue:'1'
        }} />
            <button>+ Add</button>
            {!amountIsValid && <p>Please set proper amount (1-5)</p>}
        </form>
    )
}

export default MealItemForm;