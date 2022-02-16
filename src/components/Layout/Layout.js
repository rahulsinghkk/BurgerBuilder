import React, { Component } from 'react'
import {connect} from 'react-redux'

import Aux from '../../hoc/auxi'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.css'

class Layout extends Component
    {
        state = {
            showSideDrawer : false
        }

        sideDrawerClosedHandler = () => {
            this.setState({
                showSideDrawer:false
            });
        }

        sideDrawerShowHandler = () => {
            this.setState((prevState)=>{
                return {showSideDrawer: !prevState.showSideDrawer};
            });
        }

        render() {
            return (  
            <Aux>
                <Toolbar isAuth={this.props.isAuthenticated}
                clicked={this.sideDrawerShowHandler}></Toolbar>
                <SideDrawer isAuth={this.props.isAuthenticated}
                closed={this.sideDrawerClosedHandler} open={this.state.showSideDrawer}></SideDrawer>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>);
        }
    };

const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);