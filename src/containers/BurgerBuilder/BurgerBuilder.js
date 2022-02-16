import React , {Component} from 'react'
import {connect} from 'react-redux'

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-orders.js'

import Aux from '../../hoc/auxi'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../Store/actions/actionTypes';
import * as actions from '../../Store/actions/index'
 
export class BurgerBuilder extends Component {

    state = {
        purchasing:false,
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(igkey => {
            return ingredients[igkey];
        }).reduce((sum,el)=> {
            return sum +el;
        },0);

        return sum>0;
    }

    purchaseHandler=()=>{
        if (this.props.isAuthenticated) {
        this.setState({purchasing:true})
        }else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false})
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
        this.props.onInitPurchase();
    }

    render() {
       

        const disabledInfo = {
            ...this.props.ings
        }

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients cannot be loaded</p> :<Spinner/>

        if (this.props.ings){
            burger = (
                <Aux>
                        <Burger ingredients={this.props.ings}/>
                        <BuildControls price={this.props.price} addIngredient={this.props.onIngredientAdded} removeIngredient={this.props.onIngredientRemoved} disable={disabledInfo}
                         purchaseable = {this.updatePurchaseState(this.props.ings)}
                         ordered={this.purchaseHandler}
                         isAuth = {this.props.isAuthenticated}/>
                </Aux>
            );
            orderSummary = <OrderSummary ingredients={this.props.ings}
                                totalPrice={this.props.price}
                                onCancel={this.purchaseCancelHandler}
                                onContinue={this.purchaseContinueHandler}>
                            </OrderSummary>
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
                <Aux>
                    <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> {orderSummary} </Modal>
                    {burger}
                </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated : state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded : (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved : (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients : () => dispatch(actions.initIngredients()),
        onInitPurchase : () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath : (path) => dispatch(actions.setAuthRedirectPath(path))
    };
}

export default  connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder , axios));