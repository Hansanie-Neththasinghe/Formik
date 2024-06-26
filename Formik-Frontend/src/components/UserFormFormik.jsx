import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  TextField,
  MenuItem,
  Button,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Box,
  Typography,
} from "@mui/material";

const UserFormFormik = () => {
  const initialValues = {
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    role: "student",
  };

  const validationSchema = Yup.object({
    userId: Yup.string().required("Required"),
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    mobile: Yup.number().required("Required"),
    role: Yup.string()
      .oneOf(["admin", "instructor", "student"])
      .required("Required"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user",
        values
      );
      console.log("Form data submitted successfully", response.data);

      resetForm();
    } catch (error) {
      console.error("Error submitting the form", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div style={{ padding: 100, paddingTop: 0 }}>
        <Typography variant="h4" component="h1" style={{textAlign: "center"}}>
          Register User
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
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
                      type="number"
                      variant="outlined"
                      fullWidth
                      error={touched.mobile && Boolean(errors.mobile)}
                      helperText={touched.mobile && errors.mobile}
                    />
                  )}
                </Field>
              </Box>
              <Box mb={3}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  error={touched.role && Boolean(errors.role)}
                >
                  <InputLabel>Role</InputLabel>
                  <Field name="role" as={Select} label="Role">
                    <MenuItem value="student">Student</MenuItem>
                    <MenuItem value="instructor">Instructor</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Field>
                  <FormHelperText>{touched.role && errors.role}</FormHelperText>
                </FormControl>
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default UserFormFormik;