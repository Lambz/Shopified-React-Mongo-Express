const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
// Initial setup
const app = express();
const port = process.env.PORT || 3000;

// App usage for CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Connection to MongoDB server and DB
// Connection methods
// const uri = process.env.DB_URI;
const uri = "mongodb+srv://adminUser:adminUser@cluster0.iyhqb.mongodb.net/shopifiedDB?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=> {
  console.log("Connection established with MongoDB server");
}).catch(err => {
  console.log(`Error establishing connection with MongoDB server\n${err}`);
});

const connection = mongoose.connection;
  connection.once('open', () => {
    console.log("MongoDB connected!");
});


// API endpopints
app.get("", (req, res) => {
    res.send("Welcome");
})

// App server initialization
app.listen(port, () => {
    console.log(`Server running at PORT ${port}`);
})