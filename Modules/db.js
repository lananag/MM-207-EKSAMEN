const pg = require("pg");
require("dotenv").config();
const connstring = process.env.DATABASE_URL;
const pool = new pg.Pool({connectionString: connstring, ssl: {rejectUnauthorized: false}});

let dbMethods = {};

// Users

dbMethods.getUser = function(username) {
    let sql = "SELECT * FROM users WHERE username = $1"; //get user info from databse by username.
    let values = [username];
    return pool.query(sql, values);
};

dbMethods.createUser = function(username, password, salt) {
    let sql = "INSERT INTO users (id, username, password, salt) VALUES (DEFAULT, $1, $2, $3) RETURNING *"; //create new user in database with the following information added.
    let values = [username, password, salt];
    return pool.query(sql, values);
};


// List

dbMethods.createItem = function(userid, text, dueDate) {
    let sql = "INSERT INTO listitems (userid, text, duedate) VALUES ($1, $2, $3) RETURNING *"; //create new item in database with the follow
    let values = [userid, text, dueDate];

    return pool.query(sql, values);
};

dbMethods.getItems = function(userid) {
    let sql = "SELECT * FROM listitems WHERE userid = $1"; //get all items from database by userid.
    let values = [userid];
    return pool.query(sql, values);
};

dbMethods.updateItem = function(userid, id, text, dueDate) {
    let sql = "UPDATE listitems SET text = $1, duedate = $2 WHERE userid = $3 AND id = $4 RETURNING *"; //update item in database by userid and id.
    let values = [text, dueDate, userid, id];
    return pool.query(sql, values);
};

dbMethods.deleteItem = function(userid, id) {
    let sql = "DELETE FROM listitems WHERE userid = $1 AND id = $2 RETURNING *"; //delete item from database by userid and id.
    let values = [userid, id];
    return pool.query(sql, values);
};


// Admin


//get all users except admins.
dbMethods.getUsers = function(userid) {
    let sql = "SELECT id, username FROM users WHERE id != $1 AND isadmin = false";
    let values = [userid];
    return pool.query(sql, values);
};

//check if user is admin, give result to deleteUser function.
dbMethods.checkAdmin = function(userid) {
    let sql = "SELECT isadmin FROM users WHERE id = $1";
    let values = [userid];
    return pool.query(sql, values);
};

dbMethods.deleteUser = function(userid, id) {
    this.checkAdmin(userid).then(function(data) {
        if (data.rows[0].isadmin == true) {
            let sql = "DELETE FROM users WHERE id = $1 RETURNING *"; //delete user from database by id.
            let values = [id];
            return pool.query(sql, values);
        }
    });
};










module.exports = dbMethods;