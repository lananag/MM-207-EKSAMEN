# MM-207-EKSAMEN

 To-Do List Application by Lana
-----------------------------
 Introduction
- This is an overview of my To-do list app and the work that is involved in creating it.
- The application allows users to create and manage their to-do lists, and it runs by using Asynchronous communication, Node.js, Express with a PostgreSQL database.

----------------------------------------------------------

 Main Features

-  User Registration and Login:
    - Users can choose their preferred language, register, and log in to access their to-do lists.

- To-Do List Management:
    -  Each user can create, edit, and delete tasks in their to-do list. These tasks can include due dates for better organization.

- HTTP Communication:
    -  The application uses HTTP requests (GET, POST, DELETE) to get and send information between the client and the server.

- Security:
    -  Passwords are securely hashed and salted before being stored in the database for security necccesity.

- Admin Access to Delete Users:
  -  In this application, admin is granted for certain users, allowing them to manage other user accounts.
  -  Admins have the capability to delete registered users,to make sure you take care of account management and keep the server safe and working properly.

  
----------------------------------------------------------

 How it Works

 - The application works by making HTTP requests to interact with the server, then the server interacts with the database to do things.
 - The server responds according to, provides messages or loading content based on the user's actions.
