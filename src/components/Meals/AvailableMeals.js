import React, { useEffect } from "react"
import Card from "../UI/Card/Card"

import classes from "./AvailableMeals.module.css"
import MealItem from "./MealItem/MealItem";


const DUMMY_MEALS = [
    {
        id: 'm1',
        name: 'Sushi',
        description: 'Finest fish and veggies',
        price: 22.99,
    },
    {
        id: 'm2',
        name: 'Schnitzel',
        description: 'A german specialty!',
        price: 16.5,
    },
    {
        id: 'm3',
        name: 'Barbecue Burger',
        description: 'American, raw, meaty',
        price: 12.99,
    },
    {
        id: 'm4',
        name: 'Green Bowl',
        description: 'Healthy...and green...',
        price: 18.99,
    },
];

const AvailableMeals = () => {

    useEffect( async()=>{
        try {
            const response = await fetch({url:"https://foodapp-8cd60-default-rtdb.firebaseio.com/tasks.json",method:'GET'});
            console.log(response);
            
        } catch (error) {
            console.log(error.message);
        }
    },[])

    const mealsList = DUMMY_MEALS.map(meal => <MealItem key={meal.id} name={meal.name} id={meal.id}
        description={meal.description} price={meal.price} />)
    return <section className={classes.meals}>
        <Card>
            <ul>
                {mealsList}
            </ul>
        </Card>
    </section>
}

export default AvailableMeals;