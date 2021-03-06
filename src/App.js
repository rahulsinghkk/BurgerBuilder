import React , {Component} from 'react'
import {connect} from 'react-redux'
import asyncComponent from './hoc/asyncComponent/asyncComponent'

import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Route , Switch , withRouter ,Redirect} from 'react-router-dom'
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './Store/actions/index'

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
})
const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
})
const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
})

class App extends Component{

  componentDidMount(){
    this.props.onTryAutoSignUp();
  }

  render(){

    let routes = (
      <Switch> 
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/"/>
      </Switch>  
    )


    if (this.props.isAutenticated){
      routes = (
        <Switch>
        <Route path="/checkout" component={asyncCheckout}/>
        <Route path="/orders" exact component={asyncOrders} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/"/>
      </Switch>
      )
    }

    return (
      <div >
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
  }

const mapStateToProps = state => {
  return {
    isAutenticated : state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp : () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
