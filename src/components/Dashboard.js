import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [userData, setUserData] = useState({});
    const [page, setPage] = useState(1);
    const countPerPage = 10;
    const myNav = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('USERDATA')) {
            setUserData(JSON.parse(localStorage.getItem('USERDATA')));
        }
        fetchUsers();
    }, [page]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(
                `https://reqres.in/api/users?page=${page}&per_page=${countPerPage}&delay=1`
            );
            setUsers(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.log('Error fetching users:', error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            const response = await axios.delete(`https://reqres.in/api/users/${id}`);
            console.log(response.data.data);
            toast.success('User deleted successfully');
            fetchUsers(); // Refresh user list after deletion
        } catch (error) {
            console.log('Error deleting user:', error);
        }
    };

    return (
        <div className="container">
            {/* Header */}
            <header className="d-flex justify-content-between align-items-center my-4">
                <h2>Hi, {userData.firstName}</h2>
                <Link
                    to="/signup"
                    className="btn btn-primary"
                    onClick={() => localStorage.removeItem('USERDATA')}
                >
                    Logout
                </Link>
            </header>

            {/* User Listing */}
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>
                                {user.first_name} {user.last_name}
                            </td>
                            <td>{user.email}</td>
                            <td>
                                <div className="dropdown">
                                    <button
                                        className="btn btn-info"
                                        type="button"
                                        onClick={() => {
                                            myNav(`/edituser/${user.id}`);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger ms-1"
                                        type="button"
                                        onClick={() => handleDeleteUser(user.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item">
                        <button
                            className="page-link"
                            onClick={() => setPage((prevPage) => prevPage - 1)}
                            disabled={page === 1}
                        >
                            Previous
                        </button>
                    </li>
                    <li className="page-item" onClick={() => setPage(1)}>
                        <button className="page-link">1</button>
                    </li>
                    <li className="page-item" onClick={() => setPage(2)}>
                        <button className="page-link">2</button>
                    </li>
                    <li className="page-item">
                        <button
                            className="page-link"
                            onClick={() => setPage((prevPage) => prevPage + 1)}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Dashboard;
