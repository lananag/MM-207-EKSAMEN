const express = require("express");
const db = require("./db.js");
const protect = require("./auth.js");
const router = express.Router();

// create a new todolist item.
router.post("/todo", protect, async function(req, res, next) {
    // getting user id from todo protect
    let userid = res.locals.userid;
    // getting item and duedate from request body
    let item = req.body.item;
    let dueDate = req.body.duedate;

    try {
            // creating new item by requesting database function 
        let data = await db.createItem(userid, item, dueDate);
            // checking if item was created
        if (data.rows.length > 0){
            res.status(200).json({message: "Item was created."}).end();
        }
            // if not, error message.
        else {
            throw new Error("Item could not be created.");
        }
    }
    catch(err){
        next(err);
    }
});

// get all todolist items for one user.
router.get("/todo", protect, async function(req, res, next) {

      // getting user id from todo protect
    let userid = res.locals.userid;
  
    try {
            //getting items from database   
        let data = await db.getItems(userid);
        // checking if user has item on the list
        if (data.rowCount == 0) {
            res.status(403).json({
                error: "You have no list items. Try making one!"
            }).end();
        } else if (data.rowCount > 0) {
            res.status(200).json(data.rows).end();
        } else {
            throw new Error("List could not be retrieved.");
        }
    }
    catch(err){
        next(err);
    }
});



// Update a todolist item.
router.put("/todo/:id", protect, async function(req, res, next) {
        // getting user id from todo protect
        let userid = res.locals.userid;
            // id req from parameters
        let id = req.params.id;
            // getting updated item and duedate from req body 
        let item = req.body.item;
        let dueDate = req.body.dueDate;


        // getting items from database
        try {
            let data = await db.updateItem(userid, id, item, dueDate);
            // if the request is successful, item updates
            if (data.rows.length > 0){
                res.status(200).json({message: "Item was updated."}).end();
            }
            // error message
            else {
                throw new Error("Item could not be updated.");
            }
        }
        catch(err){
            next(err);
        }
    }
);

// Delete a todolist item.
router.delete("/todo/:id", protect, async function(req, res, next) {
    // getting user id from todo procect
    let userid = res.locals.userid;
        // id req from parameters
    let id = req.params.id;
        //getting items from database
    try {
        let data = await db.deleteItem(userid, id);
        // if the item delete is successful, item deleted.
        if (data.rows.length > 0){
            res.status(200).json({message: "Item was deleted."}).end();
        }
        // error message
        else {
            throw new Error("Item could not be deleted.");
        }
    }
    catch(err){
        next(err);
    }
});



module.exports = router;

