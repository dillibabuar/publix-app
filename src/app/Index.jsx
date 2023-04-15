import React, { useState, useEffect } from 'react';

import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Role } from '@/_helpers';
import { history } from './../_helpers';
import { accountService } from '@/_services';
import { Nav, PrivateRoute, Alert } from '@/_components';
import { Home } from './../pages/home';
import { Products } from './../pages/products';
import { Login } from './../pages/login';
import { Checkout } from './../pages/checkout';
import { Address } from './../pages/address';
import { Profile } from '@/profile';
import { Admin } from '@/admin';
import { Account } from '@/account';
import './../assets/css/bootstrap.css';
import '../assets/js/bootstrap.min.js';
import './../assets/css/style.css';
import '../assets/js/jquery-1.11.1.min.js';

class App extends React.Component {
    constructor(props) {
        super(props);

       /*  history.listen((location, action) => {
           this.props.clearAlerts();
        });  */
    }

    render() {
        const { alert } = this.props;
        return (
            <div>
                <div>
                    <div>
                       {/*  {alert.message && 
                            <div className={`alert ${alert.type}`}>{alert.message}</div> Checkout
                        } */}
                        <Router history={history}>
						<Switch>
							{/* <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} /> */}
							<Route exact path="/" component={Home} />
                            <Route exact path="/products" component={Products} />
                            <Route exact path="/checkout" component={Checkout} />
                            <Route exact path="/address" component={Address} />
							{/* <Route path="/profile" component={Profile} />
							<Route path="/admin" roles={[Role.Admin]} component={Admin} /> */}
							<Route path="/login" component={Login} />
							<Redirect from="*" to="/" />
						</Switch>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
   // clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };