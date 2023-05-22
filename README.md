# EXPRESS

### Setup

1. Use and setup the project with `yarn`.
2. Convert the project to Typescript.
3. Initialize tsconfig.
4. Create .gitignore file to ignore the node_modules
## Problem Description:

Create A basic Express application, that makes a CRUD operation (create, read, update, delete) using SQLite database, document and publish your endpoints using postman.
In this project, you’ll build a basic CRUD (Create, Read, Update, Delete) for an Hospital Report Application.

## Requirements:

IMPLEMENT AUTHORIZATION AND AUTHENTICATION: PROTECT ALL ROUTES. ONLY THE LOGGED-IN DOCTORS CAN PERFORM THE FOLLOWING OPERATIONS
- Browsing through reports
- You can add report.
- You can edit report.
- You can delete report.



## How will I complete this project?

- Your aplication should be able to perform.
  - `GET` Request which returns all the data in your database
  - `POST` Request which adds data to your database
  - `PUT` Request which updates fields of a particular data using the id in database
  - `DELETE` Request which removes a particular data from your database using the id
- Host your application on Heroku.
- Data format example: This show the model for Doctors and the report created by the Doctors

```
[

 {
   DoctorsName: 'john doe',
   email: 'john@example.com', // no duplicates allowed.
   specialization:"Surgeon"
   gender:'m',
   phone:'+2347085647535',
 }
 
   Report:[
   {
  patientId: "databaseID",
  patientName: "String",
  age: 45,
  hospitalName: "String",
  weight: "String",
  height: "String",
  bloodGroup: "String",
  genotype: "String",
  bloodPressure: "String",
  HIV_status: "String",
  hepatitis: "String"
  }
   ......
]
```

## FRONTEND

- Page to display all report from all doctors
- Implement an admin/dashboard area to add, edit and delete ( Dotors can only edit and delete Report created by them)
- In the admin/dashboard implement a page to shows the Doctors information
- Create a Login Page and Sign Up Page

## Test coverage

- Make sure you write test to cover your application using Jest/supertest

### Test

- Test for a GET request
- Test for a POST request
- Test for a PUT request
- Test for a DELETE request
- Test to return proper HTTP status codes
