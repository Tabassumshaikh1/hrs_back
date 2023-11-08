const express = require("express");
const Router = express.Router();
const auth_control = require("../Controller/auth");
Router.post("/regis", auth_control.regis);
Router.post("/login", auth_control.login);
module.exports = Router;
