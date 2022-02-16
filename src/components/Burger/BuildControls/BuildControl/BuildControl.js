import React from 'react'
import classes from './BuildControl.css'

const BuildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less} onClick={()=>props.removeIngredient(props.label)} disabled={props.disable}>-</button>
        <button className={classes.More} onClick={()=>props.addIngredient(props.label)}>+</button>
    </div>
)

export default BuildControl;
