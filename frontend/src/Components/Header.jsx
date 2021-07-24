import React from 'react';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Cookies from 'js-cookie';

function Header(props) {
    const handleDropdown = () => {
        let icon = document.getElementById('dropdown-icon');
        let menu = document.getElementById('dropdown-menu');
        if (icon.style.transform) {
            icon.style.transform = '';
            menu.style.top = '-100px';
        } else {
            icon.style.transform="rotate(180deg)";
            menu.style.top = '60px';
        }
    }
    const handleLogout = () => {
        if (Cookies.get('token')) {
            Cookies.remove('token');
        } else {
            localStorage.removeItem('token');
        }
        props.history.push("/login");
    }

    return (
        <div>
            <header className="header-bar py-3 px-4 text-end">
                <button onClick={handleDropdown} href="#">
                    <AccountCircleIcon className="account-icon" />
                    <ArrowDropDownIcon id="dropdown-icon" />
                </button>
            </header>
            <section id="dropdown-menu" className="dropdown-content">
                <Link to={`${props.match.path}/account`} onClick={() => props.setActive('-1')} style={{ textDecoration: 'none' }}>
                    <h5>Account</h5>
                </Link>
                <hr />
                <Link to={`${props.match.path}/setting`} onClick={() => props.setActive('-1')} style={{ textDecoration: 'none' }}>
                    <h5>Settings</h5>
                </Link>
                <hr />
                <h5 onClick={handleLogout}>Logout</h5>
            </section>
        </div>
    )
}

export default Header
