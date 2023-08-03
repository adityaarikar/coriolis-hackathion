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
import SubjectLoading from 'components/loading/SubjectLoading';
import constants from '../../constants';
import EmployeeCard from 'components/cards/EmployeeCard';
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table';
import LoadingComponent from 'components/loading';

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

const Employees = () => {
    const classes = useStyles();
    const [employee, setEmployee] = useState([]);
    const [update, setUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showAdd, setShowAdd] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [email, setEmail] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [doj, setDOJ] = useState('');
    const [empID, setEmpID] = useState('');

    const changeEmailHandler = (event) => {
        setEmail(event.target.value);
    };

    const changeFnameHandler = (event) => {
        setFname(event.target.value);
    };

    const changeLnameHandler = (event) => {
        setLname(event.target.value);
    };

    const changedojHandler = (event) => {
        setDOJ(event.target.value);
    };

    const changeEmpIdHandler = (event) => {
        setEmpID(event.target.value);
    };

    const updateNotify = () => toast('Employee is updated');

    const deleteNotify = () => toast('Employee is deleted');

    const postData = async () => {
        try {
            await axios.post(`${constants.url}user/`, {
                email: email,
                emp_id: empID,
                first_name: fname,
                last_name: lname,
                date_of_joining: doj
            });
            setUpdate((prev) => !prev);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteCategory = (user_id) => {
        axios.delete(`${constants.url}user/${user_id}/`);
        setUpdate((prev) => !prev);
        deleteNotify();
    };

    const submitHandler = (event) => {
        event.preventDefault();
        postData();
        setEmail('');
        setFname('');
        setEmpID('');
        setDOJ('');
        setLname('');
    };

    const getEmployee = async () => {
        try {
            const response = await axios.get(`${constants.url}user`);

            setEmployee(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getEmployee();
    }, [update]);

    const RenderEmployees = ({ employee, isLoading }) => {
        return isLoading ? (
            <Row
                className={classes.cardsContainer}
                wrap
                flexGrow={1}
                horizontal='space-evenly'
                breakpoints={{ 768: 'column' }}
            >
                {/* <SubjectLoading />
                <SubjectLoading />
                <SubjectLoading />
                <SubjectLoading />
                <SubjectLoading />
                <SubjectLoading /> */}
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
                {employee.length === 0 ? (
                    <>No Employees are added...</>
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
                                    Employee Id
                                </Th>
                                <Th
                                    style={{
                                        padding: 2,
                                        fontSize: 16,
                                        borderWidth: 1,
                                        textAlign: 'center'
                                    }}
                                >
                                    First Name
                                </Th>
                                <Th
                                    style={{
                                        padding: 2,
                                        fontSize: 16,
                                        borderWidth: 1,
                                        textAlign: 'center'
                                    }}
                                >
                                    Last Name
                                </Th>
                                <Th
                                    style={{
                                        padding: 2,
                                        fontSize: 16,
                                        borderWidth: 1,
                                        textAlign: 'center'
                                    }}
                                >
                                    Email
                                </Th>
                                <Th
                                    style={{
                                        padding: 2,
                                        fontSize: 16,
                                        borderWidth: 1,
                                        textAlign: 'center'
                                    }}
                                >
                                    Date Of Joining
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
                            {employee.map((data) => {
                                return (
                                    <EmployeeCard
                                        key={data.user_id}
                                        user_id={data.user_id}
                                        empId={data.emp_id}
                                        empFname={data.first_name}
                                        empLname={data.last_name}
                                        empEmail={data.email}
                                        doj={data.date_of_joining}
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
                <h1>Employees</h1>
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
                    Add New Employee
                </Button>

                <Modal show={showAdd} onHide={() => setShowAdd(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Employee</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='form.name' className='mb-3'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type='text'
                                    value={email}
                                    onChange={changeEmailHandler}
                                    placeholder='Email'
                                    required
                                    autoComplete='off'
                                />
                            </Form.Group>
                            <Form.Group controlId='form.name' className='mb-3'>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    value={fname}
                                    onChange={changeFnameHandler}
                                    placeholder='First Name'
                                    required
                                    autoComplete='off'
                                />
                            </Form.Group>
                            <Form.Group controlId='form.name' className='mb-3'>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    value={lname}
                                    onChange={changeLnameHandler}
                                    placeholder='Last Name'
                                    required
                                    autoComplete='off'
                                />
                            </Form.Group>
                            <Form.Group controlId='form.name' className='mb-3'>
                                <Form.Label>Employee ID</Form.Label>
                                <Form.Control
                                    type='text'
                                    value={empID}
                                    onChange={changeEmpIdHandler}
                                    placeholder='CTE-xxxx'
                                    required
                                    autoComplete='off'
                                />
                            </Form.Group>
                            <Form.Group controlId='form.name' className='mb-3'>
                                <Form.Label>Joining Date</Form.Label>
                                <Form.Control
                                    type='date'
                                    value={doj}
                                    onChange={changedojHandler}
                                    placeholder='Topic....'
                                    required
                                    autoComplete='off'
                                />
                            </Form.Group>
                            <Button variant='primary' type='submit' onSubmit={submitHandler}>
                                Add Employee
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
            <RenderEmployees isLoading={isLoading} employee={employee} />
        </Column>
    );
};

export default Employees;
