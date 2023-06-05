import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { Row, Card } from 'react-bootstrap';

const Login = () => {
    const [userData,setUserData]=useState();
    useEffect(()=>{
        if(localStorage.length > 0){
            setUserData(JSON.parse(localStorage.getItem('USERDATA')))
          }
    },[])
    
    const myNav = useNavigate();    
    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const handleSubmit = (values) => {
        if (values.email === userData.userName || values.email === userData.email && userData.password === values.password) {
          toast.success("Sucessfully Login");
            myNav('/dashboard');
        } 
      
        else{
            toast.error("Data Not Found");

        }
    };
   
    return (
        <div className="container">
            {/* <h1>Login Page</h1> */}
            <Row className="justify-content-lg-center mt-5">
                <Card className='col-6 justify-content-center shadow bg-offwhite p-4 m-5'>
                    <Card.Title className='text-center'>Login Here</Card.Title>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email or Username
                        </label>
                        <Field type="text" name="email" className="form-control" />
                        <ErrorMessage name="email" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <Field type="password" name="password" className="form-control" />
                        <ErrorMessage name="password" component="div" className="text-danger" />
                    </div>
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

export default Login;
