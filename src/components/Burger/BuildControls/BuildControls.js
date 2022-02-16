import React from 'react'
import BuildControl from './BuildControl/BuildControl'

import classes from './BuildControls.css'

const controls = [
    {label : 'Salad',type : 'salad'},
    {label : 'Bacon',type : 'bacon'},
    {label : 'Cheese',type : 'cheese'},
    {label : 'Meat',type : 'meat'},
];

const BuildControls = (props) => (        
        <div className={classes.BuildControls}>
            <div>Current Price : <strong>{props.price.toFixed(2)}</strong></div>
            {controls.map(ctrl => (
                <BuildControl key={ctrl.label} label={ctrl.type}
                 addIngredient={props.addIngredient}
                  removeIngredient={props.removeIngredient} 
                  disable={props.disable[ctrl.type]}/>
            ))}
            <button className={classes.OrderButton} disabled={!props.purchaseable} onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
        </div>
    )

export default BuildControls;