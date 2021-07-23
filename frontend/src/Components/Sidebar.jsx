import React, { Fragment } from 'react';
import sidebarLinks from './sidebarLinks';
import logo from '../Images/logo.png';
import { Link } from 'react-router-dom';

function Sidebar(props) {
    return (
        <Fragment>
            <img src={logo} alt="Company logo" className="sidebar-logo" />
            { sidebarLinks.map(link => (
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