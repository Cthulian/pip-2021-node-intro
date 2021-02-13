const express = require("express");
const fs = require("fs");
const port = 3000;
const Chance = require("chance");
// Create an app handle to configure our server
const app = express();

//Middleware
app.use(express.static("css"));
// app.use(express.static("img")); // You can serve several static directories
app.use(express.urlencoded({ extended: true})); // Lets you read form contents easily

// Setup variables
let visitCount = 0;
let activeName = undefined;
let myChance = new Chance();

// Add a handler for the ./templates/index.html path
app.get("/", function (request, response) { 

    visitCount = visitCount + 1;

    const fileContents = fs.readFileSync("./templates/index.html", "utf8");
    const formFileContents = fs.readFileSync("./templates/nameform.html", "utf8");

    let updatedPage = fileContents.replace("%%%VISIT%%%", visitCount);
    if (activeName === undefined) {
    updatedPage = updatedPage.replace("%%%NAMEFORM%%%", formFileContents);
    } else {
        updatedPage = updatedPage.replace("%%%NAMEFORM%%%", "<p>Welcome " + activeName + "</p>");
    }
    response.send(updatedPage);
});

app.get("/random", function (req, res) {
    const fileContents = fs.readFileSync("./templates/random.html","utf-8");
    const newName = myChance.name();
    const finalPage = fileContents.replace("%%%NAME%%%", newName);
    res.send(finalPage);

})

app.post("/name", function (req, res) {
    const name = req.body.name;
    activeName = name;

    res.redirect("/");
});
// Start Listening
app.listen(port, function() {
    console.log("App listening on port " + port);
});