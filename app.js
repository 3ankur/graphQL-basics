const express = require("express");
const graphHTTP = require("express-graphql");
const schema = require("./schema/schema");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://riya:riya1991@ds155529.mlab.com:55529/gql-ank");
mongoose.connection.once("open",()=>{
    console.log("Connection opnn");
})

app.use("/graphql",graphHTTP({
    schema,
    graphiql:true
}));

app.listen("4000",()=>{
    console.log("App started at 4000");
});