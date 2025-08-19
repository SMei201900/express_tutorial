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
    const messageQuery = req.query.message;
    const message = `Welcome to your first Express API for Path2Tech, query: ${messageQuery}`;
    res.status(200).json({ "message": message });
});

// HTTP GET Endpoint on /items route
app.get("/items/", async(req, res) => {
    const message = ["Sponge", "Fries", "Cool Whip"];
    res.status(200).json({ "message": message });
});

// HTTP POST Endpoint on /items route
app.post("/items/", async(req, res) => {
    res.status(201).json({ message: "Item created successfully", item: req.body });
});

// HTTP PUT Endpoint on /items/:id route
app.put("/items/:id", async(req, res) => {
    const itemId = req.params.id;
    const newItem = req.body;
    res.status(200).json({ message: "Item updated successfully", itemId, "item": newItem });
});

// HTTP DELETE Endpoint on /items/:id route
app.delete("/items/:id", async(req, res) => {
    res.status(200).json({ message: "Item deleted successfully", itemId: req.params.id });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});
