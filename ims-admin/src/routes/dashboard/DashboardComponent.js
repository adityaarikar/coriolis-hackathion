import React, { useState, useEffect } from 'react';
import { Column, Row } from 'simple-flexbox';
import { createUseStyles } from 'react-jss';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import SLUGS from 'resources/slugs';
import { Link } from 'react-router-dom';
import axios from 'axios';
import constants from '../../constants';
import '../../index.css';

const useStyles = createUseStyles({
    cardsContainer: {
        marginRight: -30,
        marginTop: 30,
        paddingRight: 30
    },
    cardRow: {
        marginTop: 30,
        '@media (max-width: 768px)': {
            marginTop: 0
        }
    }
    // main: {
    //     position: 'relative'
    // },
    // bot: {
    //     position: 'absolute',
    //     backgroundColor: '#0d6efd',
    //     width: 50,
    //     height: 50,
    //     bottom: ,
    //     right: 100
    // }
});

function DashboardComponent() {
    const classes = useStyles();
    const [categories, setCategories] = useState();
    const [inventories, setInventories] = useState();
    const [employees, setEmployees] = useState();

    useEffect(() => {
        axios.get(`${constants.url}category`).then((response) => {
            setCategories(response.data);
        });
        axios.get(`${constants.url}inventories`).then((response) => {
            setInventories(response.data);
        });
        axios.get(`${constants.url}user`).then((response) => {
            setEmployees(response.data);
        });
    }, []);

    return (
        <div className={classes.main}>
            <h1>Home</h1>
            <div className='bot'></div>
            <Row
                className={classes.cardsContainer}
                wrap
                flexGrow={1}
                horizontal='space-between'
                breakpoints={{ 768: 'column' }}
            >
                <Card style={{ width: '20rem', marginBottom: '30px ', textAlign: 'center' }}>
                    <Card.Header>Categories</Card.Header>
                    <Card.Body>
                        <Card.Title>
                            Total :{' '}
                            {categories === undefined ? null : Object.keys(categories).length}
                        </Card.Title>
                        <Link to={SLUGS.categories}>
                            <Button variant='primary'>Go To Categories</Button>
                        </Link>
                    </Card.Body>
                </Card>
                <Card style={{ width: '20rem', marginBottom: '30px ', textAlign: 'center' }}>
                    <Card.Header>Inventories</Card.Header>
                    <Card.Body>
                        <Card.Title>
                            Total :{' '}
                            {inventories === undefined ? null : Object.keys(inventories).length}
                        </Card.Title>
                        {/* <Card.Text>10</Card.Text> */}
                        <Link to={SLUGS.inventories}>
                            <Button variant='primary'>Go To Inventories</Button>
                        </Link>
                    </Card.Body>
                </Card>
                <Card style={{ width: '20rem', marginBottom: '30px ', textAlign: 'center' }}>
                    <Card.Header>Employees</Card.Header>
                    <Card.Body>
                        <Card.Title>
                            Total : {employees === undefined ? null : Object.keys(employees).length}
                        </Card.Title>
                        {/* <Card.Text>10</Card.Text> */}
                        <Link to={SLUGS.employees}>
                            <Button variant='primary'>Go To Employees</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </Row>
        </div>
    );
}

export default DashboardComponent;
