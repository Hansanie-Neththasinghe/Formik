import React from "react";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import UserFormFormik from "../src/components/UserFormFormik";
import ViewAllUsers from "../src/components/ViewAllUsers";
import User from '../src/components/User';
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      
      
      <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path="/" Component={UserFormFormik} />
          <Route path="/users" Component={ViewAllUsers} />
          <Route path="/user/:id" Component={User} />
        
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
