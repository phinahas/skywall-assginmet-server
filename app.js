const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
var db = require('./config/connection');
const queries = require('./routes/queriesRoutes')

const server = express();

server.use(cors());
server.use(bodyParser.json());

server.use('/api/V1',queries)


db.connect((err)=>{
    if(err)
    console.log(err);
    else
    console.log("Connection Made");
})



server.listen(8000,()=>{
    console.log("Server Started ");
})


