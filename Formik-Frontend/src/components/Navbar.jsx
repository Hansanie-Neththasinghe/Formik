import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          User Management
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Button color="inherit" component={Link} to="/">
            Register User
          </Button>
          <Button color="inherit" component={Link} to="/users">
            View All Users
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
