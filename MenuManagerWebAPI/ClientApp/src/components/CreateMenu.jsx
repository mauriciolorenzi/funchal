import React, { useState } from 'react';
import { Button, Form, FormGroup, FormText, Label, Input } from 'reactstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export const CreateMenu = () => {

    const empty = "", [name, setName] = useState(empty),
        [description, setDescription] = useState(empty),
        [file, setFile] = useState(empty),
        history = useHistory();

    const setFormValues = (event) => {
        switch (event.target.name) {
            case 'name':
                setName(event.target.value);
                break;
            case 'description':
                setDescription(event.target.value);
                break;
            case 'file':
                setFile(event.target.files[0]);
                break;
            default:
                break;
        }
    }

    const handleRoute = (route) => {
        history.push(route);
    }

    const createMenu = () => {
        const formData = new FormData();

        formData.append('name', name);
        formData.append('description', description);
        formData.append('file', file);

        axios.post('api/menu', formData, {
            'headers': { 'Content-Type': 'multipart/form-data' },
        }).then((response) => {
            if (response.data.exception) {
                console.log(response.data.exception);
            } else {
                handleRoute(`/`);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <Form>
            <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" id="name" value={name} onChange={(event) => { setFormValues(event); }} />
            </FormGroup>
            <FormGroup>
                <Label for="description">Description</Label>
                <Input type="textarea" name="description" id="description" value={description} onChange={(event) => { setFormValues(event); }} />
            </FormGroup>
            <FormGroup>
                <Label for="file">File</Label>
                <Input type="file" name="file" id="file" onChange={(event) => { setFormValues(event); }} />
                <FormText color="muted">
                    Add your menu file.
                </FormText>
            </FormGroup>
            <Button color="primary" size="lg" onClick={() => { createMenu(); } }>Create</Button>
        </Form>
    );
}
