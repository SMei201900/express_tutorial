// This line of code below will load your configuration from .env as long as it exists
require("dotenv").config();

// express package is used to set up express web APIS
const express = require("express")
const mongoose = require("mongoose"); 
const itemModel = require("./models/items"); 
// cors package is used to handle cross origin requests to the API server
const cors = require("cors");
// You need to set up a port that your express application will run on
const PORT = process.env.PORT || 3500;
const dbURL = process.env.dbURL; 

mongoose.connect(dbURL)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error(err.message))

const app = express();

// Express middleware
// using the cors middleware
app.use(cors());
// need to use express.json() to be able to parse incoming HTTP requests
app.use(express.json());
// the express.urlencoded middleware allows your API to handle working with complex data such as arrays and objects
app.use(express.urlencoded({ extended: true }));

// HTTP GET Endpoint on index route
app.get("/", (req, res) => {
    res.status(200).json({ "message": "Welcome to your first Express API for Path2Tech" });
});

// HTTP GET Endpoint on /items route
app.get("/items/", async(req, res) => {});

// HTTP POST Endpoint on /items route
app.post("/items/", async(req, res) => {});

// HTTP PUT Endpoint on /items/:id route
app.put("/items/:id", async(req, res) => {});

// HTTP DELETE Endpoint on /items/:id route
app.delete("/items/:id", async(req, res) => {});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});
