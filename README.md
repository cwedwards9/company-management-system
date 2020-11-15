# Company Management System
[![License](https://img.shields.io/badge/license-The%20MIT%20License-success.svg)](https://shields.io/)


## Description
This is a command line application that manages a company's departments, roles, and employees. It allows a user to create, read, and update company data. The user is first prompted with a main menu containing the main functions that the user can execute.     
Based off of the selected choice, the user may be shown the specific company data in a table or may be prompted with more questions to answer for creating or updating new data. If the user is all done, they can select the "I am finished" option and close out the application.

* Demo:
* For a better view: [Link to video](https://drive.google.com/file/d/1BU9_LclsRT8CQ1J9YBv5TJ4d8kzAKQkl/view)

![Demo](system-demo.gif)


## Installation
* This application uses:
    * [Node.js](https://nodejs.org/en)
    * MySQL
   
* Install the packages: `npm i`   
* Packages are listed under [Technologies](#technologies) or just look in the package.json


## Usage
* Use the `schema.sql` for creating the tables and database
    * The application will not work unless you create the database schema in MySQL
* Once your database is created, run the command: `node app`
* Answer the prompts depending on your company need:
    * View company data (employees, roles, departments)
    * Add data
    * Update data
   
* To cancel any action at any time, type the command: `ctrl + c`
   
* Use the `seeds.sql` file with 'dummy data' for testing out the database

* If you plan to use your own data and not what's in the `seed.sql` then you must create the data in the following order:
    * Department
    * Role
    * Employee

* Make sure that you have all of the correct configurations in your `config/connection.js` file
    * You may need to change the host/user/password/port

* IMPORTANT: Once you create a new piece of data, you must restart the server to be able to use that data when creating new data in other tables:
    * Type `ctrl + c`
    * Then `node app` again


## Technologies
* Node.js   
* Packages:
    * MySQL
    * [Inquirer](https://www.npmjs.com/package/inquirer)
    * [Console.table](https://www.npmjs.com/package/console.table)


## Tests
Unit tests are written in [Jest](https://jestjs.io/)


## Contributing
Feel free to submit pull requests.


## License
Copyright (c) 2020 Chase Edwards    
License Under the [MIT License](License)