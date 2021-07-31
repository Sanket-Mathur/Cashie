import React, { useState, useEffect, Fragment } from 'react';
import { sidebarLinksAdmin, sidebarLinksCashier } from '../sidebarLinks';
import logo from '../Images/logo.png';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

function Sidebar(props) {
    const [role, setRole] = useState(null);

    useEffect(() => {
        if (Cookies.get('user')) {
            setRole(JSON.parse(Cookies.get('user')).role);
        } else if (localStorage.getItem('user')) {
            setRole(JSON.parse(localStorage.getItem('user')).role);
        }
    }, []);

    return (
        <Fragment>
            <img src={logo} alt="Company logo" className="sidebar-logo" />
            { role ==='admin' ? sidebarLinksAdmin.map(link => (
                <Link to={`${props.match.path}/${link.page}`} onClick={() => props.setActive(link.id)} style={{ textDecoration: 'none' }} key={link.id}>
                    <div className={`sidebar-links mb-3 ${props.id === link.id ? 'active' : ''}`}>
                        <h4 className="sidebar-icons">{link.icon}</h4>
                        <h6 className="sidebar-label">{link.label}</h6>
                    </div>
                </Link>
            )) : sidebarLinksCashier.map(link => (
                <Link to={`${props.match.path}/${link.page}`} onClick={() => props.setActive(link.id)} style={{ textDecoration: 'none' }} key={link.id}>
                    <div className={`sidebar-links mb-3 ${props.id === link.id ? 'active' : ''}`}>
                        <h4 className="sidebar-icons">{link.icon}</h4>
                        <h6 className="sidebar-label">{link.label}</h6>
                    </div>
                </Link>
            ))}
        </Fragment>
    );
}

export default Sidebar;