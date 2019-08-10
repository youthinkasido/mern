const mongoose = require('mongoose');

const db = require('./config/keys').mongoURI;

mongoose
    .connect(db, { useNewUrlParser: true})
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));
    


const express = require("express");
const app = express();// creates a new express server


app.get("/", (req, res) => res.send("Hello World")); // route to render info on page

const port = process.env.PORT || 5000;// tells our app which port to run on
app.listen(port, () => console.log(`Server is running on port ${port}`));
// start a socket and listen for connections on the path