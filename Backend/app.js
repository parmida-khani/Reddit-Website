const mongoose = require("mongoose")
const express = require("express")
const app = express()

const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
require("dotenv").config();
const url = 'mongodb://localhost/reddit'

mongoose.connect(url,{useNewUrlParser:true})
const connectDB = mongoose.connection
connectDB.on('open',() => {
  console.log("database connected...")
})


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
// Use parsing middleware
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

// Import the routes
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

// Using routes
app.use('/user', userRoutes);
app.use('/posts',postRoutes);


const port = process.env.PORT || 8000

// Starting a server
app.listen(port, () => {
  console.log(`App is running at ${port}`)
})
