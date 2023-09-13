const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const compression = require("compression")
const routes = require("./routes/v1")
const {errorHandler} = require("./middlewares/error")

const app = express();

app.use(helmet())
 
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(compression())

app.use(cors())
app.options("*", cors())

app.use(errorHandler)

app.use("/v1", routes)

module.exports = app;