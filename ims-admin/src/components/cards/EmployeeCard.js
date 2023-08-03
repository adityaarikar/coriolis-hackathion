import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPen } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import constants from '../../constants';
import { Tr, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const EmployeeCard = (props) => {
    const [email, setEmail] = useState(props.empEmail);
    const [fname, setFname] = useState(props.empFname);
    const [lname, setLname] = useState(props.empLname);
    const [doj, setDOJ] = useState(props.doj);
    const [empID, setEmpID] = useState(props.empId);
    const [showSubject, setShowCategory] = useState(false);

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

    const submitHandler = (event) => {
        event.preventDefault();

        try {
            const res = axios.put(`${constants.url}user/${props.user_id}`, {
                email: email,
                emp_id: empID,
                first_name: fname,
                last_name: lname,
                date_of_joining: doj
            });
            props.setUpdate(!props.update);
            props.updateTostify();
        } catch (error) {
            if (error.responce.status === 404) {
                console.log('Something went wrong...!');
            }
        }

        setShowCategory(false);
        setEmail('');
        setFname('');
        setEmpID('');
        setDOJ('');
        setLname('');
    };

    return (
        <Tr>
            <Td style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                {props.user_id}
            </Td>
            <Td style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                {props.empId}
            </Td>
            <Td style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                {props.empFname}
            </Td>
            <Td style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                {props.empLname}
            </Td>
            <Td style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                {props.empEmail}
            </Td>
            <Td style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                {props.doj}
            </Td>
            <Td style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                <FaPen color='orange' onClick={() => setShowCategory(true)} cursor='pointer' />
            </Td>
            <Td style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                <MdDelete
                    color='red'
                    cursor='pointer'
                    onClick={() => props.handleDeleteCategory(props.user_id)}
                />
            </Td>
        </Tr>
    );
};

export default EmployeeCard;
