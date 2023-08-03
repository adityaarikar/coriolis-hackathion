import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPen } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import constants from '../../constants';
import { Tr, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const CategoryCard = (props) => {
    const [name, setName] = useState(props.catName);
    const [showSubject, setShowCategory] = useState(false);

    const changeNameHandler = (event) => {
        setName(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        console.log('Before update', props.update);

        try {
            const res = axios.put(`${constants.url}subject?subject_id=${props.sId}`, {
                name: name
            });
            props.setUpdate(!props.update);
            props.updateTostify();
        } catch (error) {
            if (error.responce.status === 404) {
                console.log('Something went wrong...!');
            }
        }

        setShowCategory(false);
        setName('');
    };

    const createdByData = props.employee.filter((item) => item.url === props.created_by);
    console.log('Crested By', createdByData);

    return (
        <Tr>
            <Td style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                {props.catId}
            </Td>
            <Td style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                {props.catName}
            </Td>
            <Td style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                {createdByData[0].first_name + ' ' + createdByData[0].last_name}
            </Td>
            <Td style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                {props.created_at}
            </Td>
            <Td style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                <FaPen color='orange' onClick={() => setShowCategory(true)} cursor='pointer' />
            </Td>
            <Td style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                <MdDelete
                    color='red'
                    cursor='pointer'
                    onClick={() => props.handleDeleteCategory(props.catId)}
                />
            </Td>
        </Tr>
    );
};

export default CategoryCard;
