import React, { useState } from 'react';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Home from '../Components/Home';
import User from '../Components/User';
import Product from '../Components/Product';
import Category from '../Components/Category';
import Transaction from '../Components/Transaction';
import Report from '../Components/Report';
import { Route, Switch } from 'react-router-dom';
import './dashboard.css';

function Dashboard(props) {
    const [active, setActive] = useState('1');

    return (
        <div className="dashboard">
            <div className="side-wrap">
                <Sidebar id={active} setActive={setActive} {...props} />
            </div>
            <div className="content">
                <Header className="header-bar" />
                <div className="main-area">
                    <Switch>
                        <Route exact path={`${props.match.path}`} component={Home} />
                        <Route exact path={`${props.match.path}/user`} component={User} />
                        <Route exact path={`${props.match.path}/category`} component={Category} />
                        <Route exact path={`${props.match.path}/product`} component={Product} />
                        <Route exact path={`${props.match.path}/transaction`} component={Transaction} />
                        <Route exact path={`${props.match.path}/report`} component={Report} />
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
