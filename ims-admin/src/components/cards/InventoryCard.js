import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPen } from 'react-icons/fa';
import { MdDelete, MdQrCodeScanner } from 'react-icons/md';
import axios from 'axios';
import constants from '../../constants';
import { Tr, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const InventoryCard = (props) => {
    const [name, setName] = useState(props.chapterName);
    const [showSubject, setShowChapter] = useState(false);
    const [allottedBy, setAllottedBy] = useState();
    const [allottedTo, setAllottedTo] = useState();
    const [catId, setCatId] = useState();

    const changeNameHandler = (event) => {
        setName(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        try {
            axios.put(`${constants.url}chapter?chapter_id=${props.cId}`, {
                chapterName: name
            });

            props.setUpdate(!props.update);
            props.updateTostify();
        } catch (error) {
            if (error.responce.status === 404) {
                console.log('Something went wrong...!');
            }
        }

        setName('');
        setShowChapter(false);
    };

    const onDownloadQR = async () => {
        axios
            .get(`${constants.url}generateQR`, {
                params: {
                    invent_id: props.invent_id
                },
                responseType: 'blob' // Tell Axios to expect a binary response (file)
            })
            .then((response) => {
                // Create a URL for the file data received from the response
                const fileUrl = window.URL.createObjectURL(new Blob([response.data]));

                // Create a temporary anchor element to trigger the download
                const link = document.createElement('a');
                link.href = fileUrl;
                link.setAttribute('download', `${props.invent_id}.png`); // Set the desired filename for the downloaded file
                document.body.appendChild(link);

                // Trigger the download by simulating a click on the anchor element
                link.click();

                // Remove the temporary anchor element
                document.body.removeChild(link);
            })
            .catch((error) => {
                // Handle any error that occurs during the API request
                console.error('Error while downloading the file:', error);
            });
    };

    useEffect(() => {
        axios.get(`${props.allotedTO}`).then((response) => {
            setAllottedTo(response.data);
        });
        axios.get(`${props.allotedBy}`).then((response) => {
            setAllottedBy(response.data);
        });
        axios.get(`${props.catId}`).then((response) => {
            setCatId(response.data);
        });
    }, []);

    return (
        <Tr>
            <Td style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                {props.invent_id}
            </Td>
            <Td style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                {catId ? catId.name : null}
            </Td>
            <Td style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                {props.location}
            </Td>
            <Td style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                {props.workingStatus}
            </Td>
            <Td style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                {allottedTo ? `${allottedTo.first_name} ${allottedTo.last_name}` : null}
            </Td>
            <Td style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                {allottedBy ? `${allottedBy.first_name} ${allottedBy.last_name}` : null}
            </Td>
            <Td style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                {props.allotedAt}
            </Td>
            <Td style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                {props.allotedTill}
            </Td>
            <Td style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                <FaPen color='orange' onClick={() => setShowChapter(true)} cursor='pointer' />
            </Td>
            <Td style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                <MdDelete
                    color='red'
                    cursor='pointer'
                    onClick={() => props.onDeleteInventory(props.invent_id)}
                />
            </Td>
            <Td style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                <MdQrCodeScanner color='Blue' cursor='pointer' onClick={onDownloadQR} />
            </Td>
        </Tr>
    );
};

export default InventoryCard;
