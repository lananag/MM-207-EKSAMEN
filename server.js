const express = require("express");
const server = express();

const PORT = process.env.PORT||8080;
server.set("port",PORT);
//required modules 
const todolists = require("./Modules/todolists");
const users = require ("./Modules/users.js");
const language = require ("./Modules/language.js");
const admin = require ("./Modules/admin.js");

// static public and required modules for server 
server.use(express.static("public"));
server.use(express.json());
server.use(todolists);
server.use(language);
server.use(users);
server.use(admin);

server.use(function(err, req, res, next) {
    res.status(403).json({
        error: "Something went wrong.",
        descr: err
    }).end();
});

//if port running, 
server.listen(PORT,function(){
    console.log("server is running!");
});

