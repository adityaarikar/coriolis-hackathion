import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { useHistory } from 'react-router-dom';
import SLUGS from 'resources/slugs';
import { convertSlugToUrl } from 'resources/utilities';
import LogoComponent from './LogoComponent';
import Menu from './MenuComponent';
import MenuItem from './MenuItemComponent';
import { MdSubject, MdHome, MdMenuBook } from 'react-icons/md';
import { GoogleLogout } from 'react-google-login';

const useStyles = createUseStyles({
    separator: {
        borderTop: ({ theme }) => `1px solid ${theme.color.lightGrayishBlue}`,
        marginTop: 16,
        marginBottom: 16,
        opacity: 0.06
    }
});

const clientId = '185581884270-21b1ghrhkrlmi96imi5fupspfcbcvmav.apps.googleusercontent.com';

function SidebarComponent() {
    const { push, replace } = useHistory();
    const theme = useTheme();
    const classes = useStyles({ theme });
    const isMobile = window.innerWidth <= 1080;

    function onClick(slug, parameters = {}) {
        push(convertSlugToUrl(slug, parameters));
    }

    const logout = () => {
        console.log('Logout');
        localStorage.clear();
        sessionStorage.clear();
        replace(SLUGS.login);
    };

    return (
        <Menu isMobile={isMobile}>
            <div style={{ paddingTop: 30, paddingBottom: 30 }}>
                <LogoComponent />
            </div>
            <MenuItem
                id={SLUGS.home}
                title='Dashboard'
                icon={MdHome}
                onClick={() => onClick(SLUGS.home)}
            ></MenuItem>
            <div className={classes.separator}></div>
            <MenuItem
                id={SLUGS.categories}
                title='Categories'
                icon={MdSubject}
                onClick={() => onClick(SLUGS.categories)}
            ></MenuItem>
            <div className={classes.separator}></div>
            <MenuItem
                id={SLUGS.inventories}
                title='Inventories'
                icon={MdMenuBook}
                onClick={() => onClick(SLUGS.inventories)}
            ></MenuItem>
            <div className={classes.separator}></div>
            <MenuItem
                id={SLUGS.employees}
                title='Employees'
                icon={MdMenuBook}
                onClick={() => onClick(SLUGS.employees)}
            ></MenuItem>
            <div className={classes.separator}></div>
            <MenuItem
                id={SLUGS.chat}
                title='Chat'
                icon={MdMenuBook}
                onClick={() => onClick(SLUGS.chat)}
            ></MenuItem>
            <div className={classes.separator}></div>
            <GoogleLogout
                clientId={clientId}
                buttonText='Logout'
                onLogoutSuccess={logout}
            ></GoogleLogout>
        </Menu>
    );
}

export default SidebarComponent;
