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
    try {
        // finding all the items in the database
        const items = await itemModel.find();
        // sending the list of items to the client that requested this endpoint
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// HTTP POST Endpoint on /items route
app.post("/items/", async(req, res) => {
    try {
        // uses ItemModel to create a new item in the database
        const newItem = new itemModel(req.body);
        // this line saves the new item in the database
        const savedItem = await newItem.save();
        // sending the savedItem to client in the response if there are no errors
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// HTTP PUT Endpoint on /items/:id route
app.put("/items/:id", async(req, res) => {
    try {
        // this itemId variable retrieved the dynamic id from the URL parameters
        const itemId = req.params.id;
        // this line will attempt to find an item by its id and update it in the database
        const updatedItem = await itemModel.findByIdAndUpdate(itemId, req.body, { new: true });
        // If the item is not found, this block of code will execute a 404 error with a not found message
        if (!updatedItem){
            return res.status(404).json({ error: "Item not found" });
        }
        // If there are no errors, then we can return the updated item to the client
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// HTTP DELETE Endpoint on /items/:id route
app.delete("/items/:id", async(req, res) => {
    try {
        // itemId variable retrieves the dynamic id from the URL parameters
        const itemId = req.params.id;
        // this line will attempt to find an item by its id and delete it from the database
        const deletedItem = await itemModel.findByIdAndDelete(itemId);
        // checks if an item was removed from the database, if it was NOT, then we will execute a 404 not found error
        if (!deletedItem){
            return res.status(404).json({ error: "Item not found" });
        }
        // If there are no errors, we let the client know that the item was deleted
        res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});
