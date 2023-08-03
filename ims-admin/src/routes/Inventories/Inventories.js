import React, { useEffect, useState } from 'react';
import { Column, Row } from 'simple-flexbox';
import { createUseStyles } from 'react-jss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import InventoryCard from 'components/cards/InventoryCard';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChapterLoading from 'components/loading/ChapterLoading';
import constants from '../../constants';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
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

const Inventories = () => {
    const classes = useStyles();
    const [inventory, setInventories] = useState([]);
    const [category, setCategory] = useState([]);
    const [employee, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [update, setUpdate] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState();
    const [selectedEmployee, setSelectedEmployee] = useState();
    const [selectedAllotedFrom, setSelectedAllotedFrom] = useState();
    const [selectedAllotedTill, setSelectedAllotedTill] = useState();
    const [workingStatus, setWorkingStatus] = useState(false);
    const [location, setLocation] = useState();

    const changeSelectedCategory = (event) => {
        setSelectedCategory(event.target.value);
    };

    const changeSelectedEmployee = (event) => {
        setSelectedEmployee(event.target.value);
    };

    const changeAllotedFromHandler = (event) => {
        setSelectedAllotedFrom(event.target.value);
    };

    const changeAllotedTillHandler = (event) => {
        setSelectedAllotedTill(event.target.value);
    };

    const changeWorkingStatusHandler = (event) => {
        setWorkingStatus(!event.target.value);
    };
    const changeLocationHandler = (event) => {
        setLocation(event.target.value);
    };

    const updateNotify = () => toast('Inventory is updated');

    const deleteNotify = () => toast('Inventory is deleted');

    const postData = async () => {
        const localUser = JSON.parse(localStorage.getItem('user'));
        const currentUser = employee.filter((item) => item.email === localUser.email);
        try {
            await axios
                .post(`${constants.url}inventories/`, {
                    alloted_at: selectedAllotedFrom,
                    alloted_till: selectedAllotedTill,
                    working_status: workingStatus,
                    location: location,
                    cat_id: selectedCategory,
                    alloted_to: selectedEmployee,
                    alloted_by: currentUser[0].url
                })
                .then((res) => {
                    console.log('Responce', res);
                });
            setUpdate(!update);
        } catch (error) {
            console.error(error);
        }
    };

    const submitHandler = (event) => {
        event.preventDefault();
        postData();
        setShowAdd(false);
    };

    const onDeleteInventory = (invent_id) => {
        axios.delete(`${constants.url}inventories/${invent_id}/`);
        setUpdate((prev) => !prev);
        deleteNotify();
    };

    const getInventories = async () => {
        try {
            const response = await axios.get(`${constants.url}inventories/`);

            setInventories(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const getCategory = async () => {
        try {
            const responce = await axios.get(`${constants.url}category`);
            setCategory(responce.data);
        } catch (error) {
            console.error(error);
        }
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
        getInventories();
        getUser();
        getCategory();
    }, [update]);

    const RenderInventory = ({ inventory, isLoading }) => {
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
                {inventory.length === 0 ? (
                    <>No Inventories are added...</>
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
                                    Location
                                </Th>
                                <Th
                                    style={{
                                        padding: 2,
                                        fontSize: 16,
                                        borderWidth: 1,
                                        textAlign: 'center'
                                    }}
                                >
                                    Working Status
                                </Th>
                                <Th
                                    style={{
                                        padding: 2,
                                        fontSize: 16,
                                        borderWidth: 1,
                                        textAlign: 'center'
                                    }}
                                >
                                    Alloted To
                                </Th>
                                <Th
                                    style={{
                                        padding: 2,
                                        fontSize: 16,
                                        borderWidth: 1,
                                        textAlign: 'center'
                                    }}
                                >
                                    Allotted By
                                </Th>
                                <Th
                                    style={{
                                        padding: 2,
                                        fontSize: 16,
                                        borderWidth: 1,
                                        textAlign: 'center'
                                    }}
                                >
                                    Allotted At
                                </Th>
                                <Th
                                    style={{
                                        padding: 2,
                                        fontSize: 16,
                                        borderWidth: 1,
                                        textAlign: 'center'
                                    }}
                                >
                                    Allotted Till
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
                                <Th
                                    style={{
                                        padding: 2,
                                        fontSize: 16,
                                        borderWidth: 1,
                                        textAlign: 'center'
                                    }}
                                >
                                    Download QR
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {inventory.map((data) => {
                                return (
                                    <InventoryCard
                                        key={data.invent_id}
                                        invent_id={data.invent_id}
                                        allotedTO={data.alloted_to}
                                        allotedBy={data.alloted_by}
                                        allotedAt={data.alloted_at}
                                        allotedTill={data.alloted_till}
                                        catId={data.cat_id}
                                        location={data.location}
                                        workingStatus={data.working_status}
                                        update={update}
                                        setUpdate={setUpdate}
                                        updateTostify={updateNotify}
                                        deleteTostify={deleteNotify}
                                        onDeleteInventory={onDeleteInventory}
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
                <h1>Inventories</h1>
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
                    Add New Inventory
                </Button>

                <Modal show={showAdd} onHide={() => setShowAdd(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Inventory</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='form.subject' className='mb-3'>
                                <Form.Label>Alloted To</Form.Label>
                                <Form.Select
                                    aria-label='Default select example'
                                    onChange={changeSelectedEmployee}
                                    required
                                >
                                    <option value=''>Select Employee</option>
                                    {employee.map((data) => {
                                        return (
                                            <option key={data.user_id} value={data.url}>
                                                {data.first_name + ' ' + data.last_name}
                                            </option>
                                        );
                                    })}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId='form.subject' className='mb-3'>
                                <Form.Label>Category</Form.Label>
                                <Form.Select
                                    aria-label='Default select example'
                                    onChange={changeSelectedCategory}
                                    required
                                >
                                    <option value=''>Select Category</option>
                                    {category.map((data) => {
                                        return (
                                            <option key={data.cat_id} value={data.url}>
                                                {data.name}
                                            </option>
                                        );
                                    })}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId='form.name' className='mb-3'>
                                <Form.Label>Alloted At</Form.Label>
                                <Form.Control
                                    type='date'
                                    value={selectedAllotedFrom}
                                    onChange={changeAllotedFromHandler}
                                    placeholder='Topic....'
                                    required
                                    autoComplete='off'
                                />
                            </Form.Group>
                            <Form.Group controlId='form.name' className='mb-3'>
                                <Form.Label>Alloted Till</Form.Label>
                                <Form.Control
                                    type='date'
                                    value={selectedAllotedTill}
                                    onChange={changeAllotedTillHandler}
                                    placeholder='Topic....'
                                    required
                                    autoComplete='off'
                                />
                            </Form.Group>
                            <Form.Group controlId='form.name' className='mb-3'>
                                <Form.Label>Location</Form.Label>
                                <Form.Control
                                    type='text'
                                    value={location}
                                    onChange={changeLocationHandler}
                                    placeholder='Floor 3 or 6'
                                    required
                                    autoComplete='off'
                                />
                            </Form.Group>
                            <Form.Group controlId='form.name' className='mb-3'>
                                <Form.Label>Working Status</Form.Label>
                                <Form.Check
                                    type='checkbox'
                                    value={workingStatus}
                                    onChange={changeWorkingStatusHandler}
                                />
                            </Form.Group>
                            <Button variant='primary' type='submit' onSubmit={submitHandler}>
                                Add Inventory
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Row>
            {/* <RenderChapters isLoading={isLoading} chapters={inventory} /> */}
            <RenderInventory isLoading={isLoading} inventory={inventory} />
        </Column>
    );
};

export default Inventories;
