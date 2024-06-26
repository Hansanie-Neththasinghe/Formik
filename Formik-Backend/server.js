const http = require("http");
const express = require("express");
require("dotenv").config();
const app = require("./src/app");


require('./src/config/dbConnect');

const PORT = process.env.PORT || 3000;

//server
const server = http.createServer(app);
server.listen(PORT, console.log(`Server is running on port ${PORT}`));