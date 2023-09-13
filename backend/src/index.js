const config = require("./config/config")
const express = require("express");
const mongoose = require("mongoose")
const app = require("./app")

const PORT = config.backend_port;
const db_URI = config.db_url;
// console.log("config", db_URI)

// const app = express();

mongoose.connect(`${db_URI}`,{ 
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=> {
  console.log("connected to db", db_URI);
  })
.catch(()=> console.log("failed to connect to db"))

app.listen(PORT, ()=>{
  console.log("server is live at", PORT)
})