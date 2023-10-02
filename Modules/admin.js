const express = require("express");
const db = require("./db.js");
const protect = require("./auth.js");
const router = express.Router();


// List all users exept admin.
router.get("/admin", protect, async function(req, res, next) {

    let userId = res.locals.userid; //get id of the request making user.

    try{

        let data = await db.getUsers(userId); //ask db.js for list of users
        if (data.rowCount == 0) {
            res.status(403).json({
                error: "Users not found."
            }).end();
        }
        else {
            res.status(200).json(data.rows).end(); //return them if found.

            }
        }
        catch (err) {
            next(err);
        }
    }
);


// Delete a user.

router.delete("/admin/:id", protect, async function(req, res, next) {

    let userId = res.locals.userid; //get id of the request making user.
    let id = req.params.id; //get id of the user to be deleted.


    try{

        let data = await db.deleteUser(userId, id); //send both ids to db.js

        if (data.rowCount == 0) {
            res.status(403).json({
                error: "User not found."
            }).end();
        }
        else {
            res.status(200).json({message: "User deleted."}).end(); //send to client if found.

            }
        }
        catch (err) {
            next(err);
        }
    }
);


module.exports = router;

