const inquirer = require("inquirer");
const mysql = require("mysql");
const express = require("express");
const app = express();

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 3306,
    database: "company"
});

connection.connect((err) => {
    if(err){
        console.log("Error connecting: " + err.stack);
        return;
    }

    console.log("Connected as id " + connection.threadId);
})