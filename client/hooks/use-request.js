import axios from 'axios';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

export default ({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        try{
            const response = await axios[method](url, body);
            
            if(onSuccess){
                onSuccess(response.data);
            }
        } catch(err) {
            if(err.response.status===404){
                setErrors(
                    <Alert variant="danger">
                    <h4>Ooops....</h4>
                    <ul>
                        <li>Sorry, looks like we are having trouble connecting to our server</li>
                    </ul>
                    </Alert>
                )
            }
            else{
                setErrors(
                    <Alert variant="danger">
                    <h4>Ooops....</h4>
                    <ul>
                        {err.map(err => <li key={err.message}>{err.message}</li>)}
                    </ul>
                    </Alert>
                )
            }   
        }
    };

    return { doRequest, errors }
}