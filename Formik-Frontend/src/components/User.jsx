import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, MenuItem, Button, Select, InputLabel, FormControl, FormHelperText, Box, Typography } from '@mui/material';

const User = () => {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    role: 'student',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/user/${id}`);
        setInitialValues(response.data.data);
      } catch (error) {
        setError('There was an error fetching the user data!');
      }
    };

    fetchUser();
  }, [id]);

  const validationSchema = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    mobile: Yup.string().required('Required'),
    role: Yup.string().oneOf(['admin', 'instructor', 'student']).required('Required'),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.put(`http://localhost:3000/api/v1/user/${id}`, values);
      alert('User updated successfully');
    } catch (error) {
      if (error.response) {
        
        console.error('Server responded with an error:', error.response.data);
        setError(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        
        console.error('No response received:', error.request);
        setError('No response from the server.');
      } else {
        
        console.error('Error in setting up the request:', error.message);
        setError(`Error: ${error.message}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{padding: 100, paddingTop: 0}}>
      <Typography variant="h4" component="h2">Edit User</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Box mb={3}>
              <Field name="userId">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="User ID"
                    variant="outlined"
                    fullWidth
                    disabled
                    error={touched.userId && Boolean(errors.userId)}
                    helperText={touched.userId && errors.userId}
                  />
                )}
              </Field>
            </Box>
            <Box mb={3}>
              <Field name="firstName">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                )}
              </Field>
            </Box>
            <Box mb={3}>
              <Field name="lastName">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                )}
              </Field>
            </Box>
            <Box mb={3}>
              <Field name="email">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                )}
              </Field>
            </Box>
            <Box mb={3}>
              <Field name="mobile">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Mobile"
                    variant="outlined"
                    fullWidth
                    error={touched.mobile && Boolean(errors.mobile)}
                    helperText={touched.mobile && errors.mobile}
                  />
                )}
              </Field>
            </Box>
            <Box mb={3}>
              <FormControl fullWidth variant="outlined" error={touched.role && Boolean(errors.role)}>
                <InputLabel>Role</InputLabel>
                <Field name="role" as={Select} label="Role">
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="instructor">Instructor</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Field>
                <FormHelperText>{touched.role && errors.role}</FormHelperText>
              </FormControl>
            </Box>
            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
              Update
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default User;
