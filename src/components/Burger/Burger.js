import React from 'react'

import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';

const Burger = (props) => {
    const transformedIngredients = Object.keys(props.ingredients).map((igKey)=>{
        return [...Array(props.ingredients[igKey])].map((_,i)=>{
            return <BurgerIngredient key ={igKey + i} type = {igKey} />
        })
    }).reduce((arr,el)=>{
        return arr.concat(el);
    },[])
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
                {transformedIngredients.length !== 0 ? transformedIngredients : <p>Please start adding ingredients !</p>}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default Burger;