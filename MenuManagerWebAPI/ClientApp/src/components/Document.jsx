import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

export const Document = () => {

    let { name } = useParams();

    useEffect(() => {

        axios.get('api/menu/document', {
            'params': {
                'name': name
            },
            'responseType': 'blob'
        }).then((response) => {
            if (response.data.exception) {
                console.log(response.data.exception);
            } else {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', response.headers['content-disposition'].split('; ')[1].replace('filename=', ''));
                document.body.appendChild(link);
                link.click();
            }
        }).catch((error) => {
            console.log(error);
        });

    }, [name]);

    return (
        <React.Fragment>
        </React.Fragment>
    );
}