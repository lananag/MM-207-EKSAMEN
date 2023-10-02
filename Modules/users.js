const express = require("express");
const db = require("./db.js");
const authUtils = require("./auth_utils.js");
const router = express.Router();


// CREATE USER.
router.post("/register", async function(req, res, next) {
    let credString = req.headers.authorization; // receive credentials
    let cred = authUtils.decodeCred(credString); // decode credentials


    let hash = authUtils.createHash(cred.password); // create hash and salt

    try{
        let data = await db.createUser(cred.username, hash.value, hash.salt); // send username, hash, and salt to db.js


        if (data.rows.length > 0){ // if user was created, send success.
            res.status(200).json({message: "User was created."}).end();
        }

        else { // if user was not created, whine.
            throw new Error("User could not be created.");
        }

    }
    catch(err){
        next(err);
    }
});


// LOGIN.
router.post("/login", async function(req, res, next) {

    let credString = req.headers.authorization; // receive credentials
    let cred = authUtils.decodeCred(credString); // decode credentials

    try{
        let data = await db.getUser(cred.username); // ask db.js function for information, send username

        let dbUserId = data.rows[0].id;
        let dbUsername = data.rows[0].username;
        let dbHash = data.rows[0].password;
        let dbSalt = data.rows[0].salt;
        let inputPassword = cred.password;
        let admin = data.rows[0].isadmin;

        if (data.rows.length == 0){
            throw new Error ("User does not exist.");
        }

        if (authUtils.verifyPassword(inputPassword, dbHash, dbSalt)){ // if input hash matches db hash, create token and send it to user.

            if (admin == true){
                let token = authUtils.createToken(dbUsername, dbUserId, admin);
                res.status(200).json({
                    token: token,
                    message: "Admin logged in."
                }).end();
            } else {
                let token = authUtils.createToken(dbUsername, dbUserId);
                res.status(200).json({
                    token: token,
                    message: "User logged in."
                }).end();
                }
            }
        else{
            throw new Error ("Password is incorrect.");
        }


    }
    catch(err){
        next(err);
    }
});




module.exports = router; // export router to server.js