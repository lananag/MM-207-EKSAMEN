const express = require("express");
const db = require("./db.js");
const protect = require("./auth.js");
const router = express.Router();

// Create a new todolist item.
router.post("/todo", protect, async function(req, res, next) {

    let userid = res.locals.userid;
    let item = req.body.item;
    let dueDate = req.body.duedate;

    try {
        let data = await db.createItem(userid, item, dueDate);

        if (data.rows.length > 0){
            res.status(200).json({message: "Item was created."}).end();
        }

        else {
            throw new Error("Item could not be created.");
        }
    }
    catch(err){
        next(err);
    }
});

// Get all todolist items for one user.
router.get("/todo", protect, async function(req, res, next) {
    
    let userid = res.locals.userid;

    try {
        let data = await db.getItems(userid);

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
    
        let userid = res.locals.userid;
        let id = req.params.id;
        let item = req.body.item;
        let dueDate = req.body.dueDate;


    
        try {
            let data = await db.updateItem(userid, id, item, dueDate);
    
            if (data.rows.length > 0){
                res.status(200).json({message: "Item was updated."}).end();
            }
    
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

    let userid = res.locals.userid;
    let id = req.params.id;
    
    try {
        let data = await db.deleteItem(userid, id);

        if (data.rows.length > 0){
            res.status(200).json({message: "Item was deleted."}).end();
        }

        else {
            throw new Error("Item could not be deleted.");
        }
    }
    catch(err){
        next(err);
    }
});



module.exports = router;

