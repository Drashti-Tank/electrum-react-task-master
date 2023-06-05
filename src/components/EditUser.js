import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
export default function EditUser() {
    const [editUser, setEditUser] = useState();
    const { id } = useParams();
    const myNav = useNavigate();
    const editUsers = async () => {
        try {
            const response = await axios.get(`https://reqres.in/api/users/${id}`);
            setEditUser(response.data.data);
        } catch (error) {
            console.log('Error fetching users:', error);
        }
    };
    useEffect(() => {
        editUsers();
    }, [])
    const initialValues = {
        id: editUser?.id,
        first_name: editUser?.first_name,
        last_name: editUser?.last_name,
        email: editUser?.email,

    };

    const validationSchema = Yup.object().shape({
        first_name: Yup.string().required('First Name is required'),
        last_name: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),

    });

    const handleSubmit = async (values) => {
        console.log(values);
        try {
            const response = await axios.patch(`https://reqres.in/api/users/${id}`);
            console.log(response.data.data);
            toast.success('Update SucessFully');
            myNav('/dashboard')

        } catch (error) {
            console.log('Error fetching users:', error);
        }

    };
    return (
        <div className="container mt-2">
            <h1 className='text-center mt-3'>Edit User</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div className="mb-3">
                        <label htmlFor="id" className="form-label">
                            Id
                        </label>
                        <Field type="text" name="id" className="form-control" disabled values={editUser?.id} />
                        <ErrorMessage
                            name="id"
                            component="div"
                            className="text-danger"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="first_name" className="form-label">
                            First Name
                        </label>
                        <Field type="text" name="first_name" className="form-control" values={editUser?.first_name} />
                        <ErrorMessage
                            name="first_name"
                            component="div"
                            className="text-danger"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="last_name" className="form-label">
                            Last Name
                        </label>
                        <Field type="text" name="last_name" className="form-control" values={editUser?.last_name} />
                        <ErrorMessage
                            name="last_name"
                            component="div"
                            className="text-danger"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <Field type="text" name="email" className="form-control" values={editUser?.email} />
                        <ErrorMessage
                            name="email"
                            component="div"
                            className="text-danger"
                        />
                    </div>

                    {/* Repeat the same pattern for other form fields */}
                    <button type="submit" className="btn btn-primary">
                        Update
                    </button>
                </Form>
            </Formik>
        </div>
    )
}
