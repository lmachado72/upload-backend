require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const mongoose = require('mongoose');
const path = require('path');


const app = express();

// DATABASE SETUP
mongoose.connect(
    process.env.MONGO_URL, 
    {
        useUnifiedTopology: true, // terminal
        useNewUrlParser: true,
    }
);

app.use(express.json()); // express lida com requisições no padrão json
app.use(express.urlencoded({ extended: true })); // express lida com requisições no padrão urlencoded
app.use(morgan('dev')); // lib de log
app.use(
    "/files", 
    express.static(path.resolve(__dirname, "..", "..", "..", "..", "tmp", "uploads"))
);

app.use(require('./routes'));

app.listen(3001);