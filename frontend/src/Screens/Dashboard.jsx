import React, { useState, useEffect, Fragment } from 'react';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Home from '../Components/Home';
import User from '../Components/User';
import UserForm from '../Components/UserForm';
import Product from '../Components/Product';
import ProductForm from '../Components/ProductForm';
import Category from '../Components/Category';
import CategoryForm from '../Components/CategoryForm';
import Transaction from '../Components/Transaction';
import Report from '../Components/Report';
import Setting from '../Components/Setting';
import Account from '../Components/Account';
import { Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';
import './dashboard.css';

function Dashboard(props) {
    const [active, setActive] = useState('1');

    useEffect(() => {
        async function checkJWT() {
            if (!Cookies.get('token') && !localStorage.getItem('token')) {
                props.history.push("/login");
            }
        }
        checkJWT();
    }, [props.history]);

    return (
        <Fragment>
            <div className="dashboard">
                <div className="side-wrap side-wrap-hold"></div>
                <div className="side-wrap side-bar">
                    <Sidebar id={active} setActive={setActive} {...props} />
                </div>
                <div className="content">
                    <Header className="header-bar" setActive={setActive} {...props} />
                    <div className="header-hold"></div>
                    <div className="main-area">
                        <Switch>
                            <Route exact path={`${props.match.path}`} component={Home} />
                            <Route exact path={`${props.match.path}/user`} component={User} />
                            <Route exact path={`${props.match.path}/user/create`} component={UserForm} />
                            <Route exact path={`${props.match.path}/user/update/:id`} component={UserForm} />
                            <Route exact path={`${props.match.path}/category`} component={Category} />
                            <Route exact path={`${props.match.path}/category/create`} component={CategoryForm} />
                            <Route exact path={`${props.match.path}/category/update/:id`} component={CategoryForm} />
                            <Route exact path={`${props.match.path}/product`} component={Product} />
                            <Route exact path={`${props.match.path}/product/create`} component={ProductForm} />
                            <Route exact path={`${props.match.path}/product/update/:id`} component={ProductForm} />
                            <Route exact path={`${props.match.path}/transaction`} component={Transaction} />
                            <Route exact path={`${props.match.path}/report`} component={Report} />
                            <Route exact path={`${props.match.path}/setting`} component={Setting} />
                            <Route exact path={`${props.match.path}/account`} component={Account} />
                        </Switch>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Dashboard;
