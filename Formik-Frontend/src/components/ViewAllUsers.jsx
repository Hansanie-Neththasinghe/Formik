import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/user');
        console.log('API Response:', response.data); 
        if (Array.isArray(response.data.data)) {
          setUsers(response.data.data);
        } else {
          setError('Invalid response format');
        }
      } catch (error) {
        setError('There was an error fetching the users!');
      }
    };

    fetchUsers();
  }, []);

  const handleUpdate = (userId) => {
    navigate(`/user/${userId}`);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/user/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      setError('There was an error deleting the user!');
    }
  };

  return (
    <div style={{padding: 100, paddingTop: 10}}>
      <h1 style={{textAlign: "center"}}>All Users</h1>
    <TableContainer component={Paper}>
      {error && <div>{error}</div>}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.userId}</TableCell>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.mobile}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleUpdate(user._id)}>Update</Button>
                <Button variant="contained" color="secondary" onClick={() => handleDelete(user._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default UserList;
