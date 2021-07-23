import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

function Header() {
    return (
        <header className="header-bar py-3 px-4 text-end">
            <AccountCircleIcon className="account-icon" />
            <ArrowDropDownIcon />
        </header>
    )
}

export default Header
