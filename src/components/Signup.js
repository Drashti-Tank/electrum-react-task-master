import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { Row, Card } from 'react-bootstrap';

const Signup = () => {
    const [data,setData] = useState('')
    const myNav = useNavigate();
    const initialValues = {
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        userName: Yup.string().required('Username is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const handleSubmit = (values) => {
        setData(values);
        console.log(values);
        setTimeout(()=>{

            myNav('/')
        },2000)
        toast.success('SignUp Sucessfully')
    };
    useEffect(()=>{
        localStorage.setItem('USERDATA', JSON.stringify(data))
    },[data])
    return (
        <div className="container">
            {/* <h1 className='text-center mt-3'>Signup Page</h1> */}
            <Row className='col-lg-12 justify-content-center bg-white mt-4'>
                <Card className='col-lg-6 shadow bg-offwhite p-4 m-5'>
                    <Card.Title className='text-center'>Sign Up Here</Card.Title>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">
                            First Name
                        </label>
                        <Field type="text" name="firstName"  className="form-control" />
                        <ErrorMessage
                            name="firstName"
                            component="div"
                            className="text-danger"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">
                            Last Name
                        </label>
                        <Field type="text" name="lastName" className="form-control" />
                        <ErrorMessage
                            name="lastName"
                            component="div"
                            className="text-danger"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="userName" className="form-label">
                            User Name
                        </label>
                        <Field type="text" name="userName" className="form-control" />
                        <ErrorMessage
                            name="userName"
                            component="div"
                            className="text-danger"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <Field type="text" name="email" className="form-control" />
                        <ErrorMessage
                            name="email"
                            component="div"
                            className="text-danger"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                                <Field type="password" name="password" className="form-control" />
                        <ErrorMessage
                            name="password"
                            component="div"
                            className="text-danger"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">
                            Confirm Password
                        </label>
                                <Field type="password" name="confirmPassword" className="form-control" />
                        <ErrorMessage
                            name="confirmPassword"
                            component="div"
                            className="text-danger"
                        />
                    </div>
                    {/* Repeat the same pattern for other form fields */}
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </Form>
                    </Formik>
                </Card>
                </Row>
        </div>
    );
};

export default Signup;
