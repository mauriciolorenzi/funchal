import React, { useState, useEffect } from 'react';
import { Button, Table } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export const Home = () => {

    const history = useHistory();

    const handleRoute = (route) => {
        history.push(route);
    }
    const [menus, setMenus] = useState([]);

    const getMenus = () => {
        axios.get('api/menu/get-all').then((response) => {
            setMenus(response.data.object);
        })
    }

    const deleteMenu = (id) => {
        axios.delete(`api/menu`, {
            'params': {
                'id': id
            }
        });
    }

    useEffect(() => {
        getMenus();
        return () => {
            setMenus([]);
        };
    }, []);

    return (
        <React.Fragment>
            <Table striped hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        menus.map((object, index) => (
                            <tr key={index} onClick={() => { handleRoute(`/edit/${object._id}`) }}>
                                <th scope="row">{index + 1}</th>
                                <td>{object.name}</td>
                                <td>{object.description}</td>
                                <td>
                                    <Button close onClick={(event) => {
                                        event.stopPropagation();
                                        deleteMenu(object._id)
                                    }} />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </React.Fragment>
    );
}
