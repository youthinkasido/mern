const express = require("express"); // backend 
const app = express(); // new instance of the backend
const mongoose = require("mongoose"); // ????
const db = require("./config/keys").mongoURI; // creates a db based on the key created in the config.
const bodyParser = require('body-parser'); // tells app what sorts of requests it should respond to
const User = require('./models/User')
const users = require("./routes/api/users") // get the users exported router(?) which contains get/post routes currently
const tweets = require("./routes/api/tweets")

// app.get(/.*fly$/, (req, res) => { returns "hi" for any URI that ends in "fly"
//     res.send('hi')
// })


mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));


app.use(bodyParser.urlencoded({ // tell app we want to respond to Postman requests
        extended: false
}))

app.use(bodyParser.json()) // tell app we want to respond to JSON requests

app.get("/", (req, res) => { //
    const user = new User({
        handle: "jimmyboy22",
        email: 'jim@hotmail.biz',
        password: '123456'
    })
    user.save()
})

    app.use("/api/users", users)// specifies the exact URL needed to be types in to access the `users route`
    app.use("/api/tweets", tweets)


    const port = process.env.PORT || 5000; 
    app.listen(port, () => console.log(`Server is running on port ${port}`))