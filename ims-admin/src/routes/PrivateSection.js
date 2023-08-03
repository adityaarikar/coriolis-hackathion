import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminRoute from './AdminRoute';
import UserRoute from './UserRoute';
import AdminSection from './AdminSection';
import LoadingComponent from 'components/loading';

function PrivateSection() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const currentUser = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/v1/user/')
            .then((res) => {
                const userData = res.data;
                const currentUserData = userData.filter((item) => item.email === currentUser.email);

                if (currentUserData[0].is_admin) {
                    setIsAdmin(true);
                    setLoading(false)
                }
            })
            .catch((res) => {
                console.log('error', res);
            });
    });
    return loading ? <LoadingComponent loading/> : (isAdmin ? <AdminSection /> : <UserRoute />)
}

export default PrivateSection;
