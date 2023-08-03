import React from 'react';
import { useHistory } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import SLUGS from 'resources/slugs';
import bot from '../../assets/Logo/bot.png';
import { GoogleLogin } from 'react-google-login';

const useStyles = createUseStyles({
    cardsContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh'
    },
    loginCard: {
        width: 300,
        height: 400,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        flexDirection: 'column'
    }
});

const clientId = '185581884270-21b1ghrhkrlmi96imi5fupspfcbcvmav.apps.googleusercontent.com';

const Login = () => {
    const classes = useStyles();
    const history = useHistory();

    const clearStorage = () => {
        sessionStorage.clear();
        localStorage.clear();
        console.log('Done');
    };

    const onSuccess = (res) => {
        const email = res.profileObj.email;
        const domain = email.slice(email.indexOf('@') + 1);
        if (domain === 'coriolis.co.in') {
            localStorage.setItem('user', JSON.stringify(res.profileObj));
            history.replace(SLUGS.home);
        } else {
            console.log('Login Failed');
            clearStorage();
            alert('To login you need coriolis email');
        }
    };

    const onFailure = (res) => {
        alert('Login Failed! Please try again.');
    };

    return (
        <div className={classes.cardsContainer}>
            <div className={classes.loginCard}>
                <img src={bot} alt='Logo' />
                <GoogleLogin
                    clientId={clientId}
                    buttonText='Signin with google 🚀'
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                />
            </div>
        </div>
    );
};

export default Login;
