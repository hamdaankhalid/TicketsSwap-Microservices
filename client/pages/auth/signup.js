import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';

const signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {
            email, password
        },
        onSuccess: () => Router.push('/')
    });

    const submitHandler = async (event) => {
        event.preventDefault();
        await doRequest();
    };

    return (
        <Form onSubmit={submitHandler}>
            <h1>Sign Up</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
            </Form.Group>


            {errors}
            
            
            <Button className="btn btn-primary" type="submit">Sign Up</Button>
        </Form>
    );
};
export default signup;