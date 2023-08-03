import React, { useEffect, useState } from 'react';
import { Column, Row } from 'simple-flexbox';
import { createUseStyles } from 'react-jss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import constants from '../../constants';
import LoadingComponent from 'components/loading';
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import CategoryCard from 'components/cards/CategoryCard';

const useStyles = createUseStyles({
    cardsContainer: {
        marginTop: 30
    },
    mainHeader: {
        '@media (min-width: 768px)': {
            marginTop: 20
        }
    },
    cardRow: {
        marginTop: 30,
        '@media (max-width: 768px)': {
            marginTop: 0
        }
    }
});

const Categories = () => {
    const classes = useStyles();
    const [categories, setCategories] = useState([]);
    const [update, setUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showAdd, setShowAdd] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [enteredName, setEnteredName] = useState('');
    const [employee, setEmployees] = useState([]);

    const changeNameHandler = (event) => {
        setEnteredName(event.target.value);
    };

    const updateNotify = () => toast('Category is updated');

    const deleteNotify = () => toast('Category is deleted');

    const postData = async () => {
        const localUser = JSON.parse(localStorage.getItem('user'));
        const currentUser = employee.filter((item) => item.email === localUser.email);
        try {
            await axios.post(`${constants.url}category/`, {
                name: enteredName,
                created_by: currentUser[0].url
            });
            setUpdate((prev) => !prev);
        } catch (error) {
            console.error(error);
        }
    };

    const submitHandler = (event) => {
        event.preventDefault();
        postData();
        setEnteredName('');
        setShowAdd(false);
    };

    const getSubjects = async () => {
        try {
            const response = await axios.get(`${constants.url}category`);

            setCategories(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteCategory = (catId) => {
        axios.delete(`${constants.url}category/${catId}/`);
        setUpdate((prev) => !prev);
        deleteNotify();
    };

    const getUser = async () => {
        try {
            const response = await axios.get(`${constants.url}user`);
            setEmployees(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getSubjects();
        getUser();
    }, [update]);

    const RenderCategory = ({ isLoading, categories }) => {
        return isLoading ? (
            <Row
                className={classes.cardsContainer}
                wrap
                flexGrow={1}
                horizontal='space-evenly'
                breakpoints={{ 768: 'column' }}
            >
                <LoadingComponent isLoading />
            </Row>
        ) : (
            <Row
                className={classes.cardsContainer}
                wrap
                flexGrow={1}
                horizontal='space-evenly'
                breakpoints={{ 768: 'column' }}
            >
                {categories.length === 0 ? (
                    <h1>No categories added yet</h1>
                ) : (
                    <Table>
                        <Thead>
                            <Tr>
                                <Th
                                    style={{
                                        padding: 2,
                                        fontSize: 16,
                                        borderWidth: 1,
                                        textAlign: 'center'
                                    }}
                                >
                                    ID
                                </Th>
                                <Th
                                    style={{
                                        padding: 2,
                                        fontSize: 16,
                                        borderWidth: 1,
                                        textAlign: 'center'
                                    }}
                                >
                                    Category
                                </Th>
                                <Th
                                    style={{
                                        padding: 2,
                                        fontSize: 16,
                                        borderWidth: 1,
                                        textAlign: 'center'
                                    }}
                                >
                                    Created By
                                </Th>
                                <Th
                                    style={{
                                        padding: 2,
                                        fontSize: 16,
                                        borderWidth: 1,
                                        textAlign: 'center'
                                    }}
                                >
                                    Created At
                                </Th>
                                <Th
                                    style={{
                                        padding: 2,
                                        fontSize: 16,
                                        borderWidth: 1,
                                        textAlign: 'center'
                                    }}
                                >
                                    Edit
                                </Th>
                                <Th
                                    style={{
                                        padding: 2,
                                        fontSize: 16,
                                        borderWidth: 1,
                                        textAlign: 'center'
                                    }}
                                >
                                    delete
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {categories.map((item) => {
                                return (
                                    <CategoryCard
                                        catName={item.name}
                                        catId={item.cat_id}
                                        created_at={item.created_at}
                                        created_by={item.created_by}
                                        employee={employee}
                                        setShowAlert={setShowAlert}
                                        update={update}
                                        setUpdate={setUpdate}
                                        updateTostify={updateNotify}
                                        deleteTostify={deleteNotify}
                                        handleDeleteCategory={handleDeleteCategory}
                                    />
                                );
                            })}
                        </Tbody>
                    </Table>
                )}
            </Row>
        );
    };

    return (
        <Column>
            <Row
                className={classes.mainHeader}
                wrap
                flexGrow={1}
                horizontal='space-between'
                breakpoints={{ 768: 'column' }}
            >
                <h1>Categories</h1>
                <ToastContainer
                    position='top-right'
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <Button className='mb-md-3' variant='primary' onClick={() => setShowAdd(true)}>
                    Add New Category
                </Button>

                <Modal show={showAdd} onHide={() => setShowAdd(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Categories</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='form.name' className='mb-3'>
                                <Form.Label>Category Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    value={enteredName}
                                    onChange={changeNameHandler}
                                    placeholder='Category Name'
                                    required
                                />
                            </Form.Group>
                            <Button variant='primary' type='submit' onSubmit={submitHandler}>
                                Add Category
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Row>
            <Row wrap flexGrow={1} horizontal='space-between' breakpoints={{ 768: 'column' }}>
                <Alert show={showAlert} variant='danger'>
                    <Alert.Heading>Are you sure you want to delete it?</Alert.Heading>
                    <hr />
                    <div className='d-flex justify-content-end'>
                        <Button onClick={() => setShowAlert(true)} variant='outline-success'>
                            Yes I'm Sure
                        </Button>
                    </div>
                </Alert>
            </Row>
            <RenderCategory isLoading={isLoading} categories={categories} />
        </Column>
    );
};

export default Categories;
