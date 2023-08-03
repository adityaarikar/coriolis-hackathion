import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import constants from '../../constants';
import LoadingComponent from 'components/loading';
import { createUseStyles } from 'react-jss';
import { Table, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const useStyles = createUseStyles({
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const InventoriesById = (props) => {
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState();
    const classes = useStyles();
    const [allotedBy, setAllotedBy] = useState('');
    const [allotedTo, setAllotedTo] = useState('');

    const getInventoryData = () => {
        axios
            .get(`${constants.url}inventories/${props.match.params.id}`)
            .then((res) => {
                setItem(res);
                setLoading(false);
                getEmails(res);
            })
            .catch((error) => {
                console.log('Error', error);
            });
    };

    const getEmails = (res) => {
        axios
            .get(`${res.data.alloted_by}`)
            .then((res) => {
                setAllotedBy(`${res.data.first_name} ${res.data.last_name}`);
            })
            .catch((err) => {
                console.log('error', err);
            });

        axios
            .get(`${res.data.alloted_to}`)
            .then((res) => {
                setAllotedTo(`${res.data.first_name} ${res.data.last_name}`);
            })
            .catch((err) => {
                console.log('error', err);
            });
    };

    useEffect(() => {
        getInventoryData();
    }, []);

    return loading ? (
        <LoadingComponent loading />
    ) : (
        <div className={classes.main}>
            <Table>
                <Tr style={{ width: 500 }}>
                    <Th style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                        Inventory Id
                    </Th>
                    <Td style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                        {item.data.invent_id}
                    </Td>
                </Tr>
                <Tr>
                    <Th style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                        Alloted To
                    </Th>
                    <Td style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                        {allotedTo}
                    </Td>
                </Tr>
                <Tr>
                    <Th style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                        Alloted By
                    </Th>
                    <Td style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                        {allotedBy}
                    </Td>
                </Tr>
                <Tr>
                    <Th style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                        Alloted From
                    </Th>
                    <Td style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                        {item.data.alloted_at}
                    </Td>
                </Tr>
                <Tr>
                    <Th style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                        Alloted Till
                    </Th>
                    <Td style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                        {item.data.alloted_till}
                    </Td>
                </Tr>
                <Tr>
                    <Th style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                        Working Status
                    </Th>
                    <Td style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                        {item.data.working_status}
                    </Td>
                </Tr>
                <Tr>
                    <Th style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                        Location
                    </Th>
                    <Td style={{ padding: 2, fontSize: 16, borderWidth: 1, textAlign: 'center' }}>
                        {item.data.location}
                    </Td>
                </Tr>
            </Table>
        </div>
    );
};

export default InventoriesById;
