const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const JWT_SECRET = "random123";

const app = express();
app.use(express.json());

function auth(req, res, next) {}

app.post("/signup", function (req, res) {});

app.post("/login", function (req, res) {});

app.post("/purchase", function (req, res) {});

app.get("/seecourse", function (req, res) {});

app.listen(3000);
