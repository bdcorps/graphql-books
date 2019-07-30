const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema.1");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

mongoose.connect(
  "mongodb://user:pass@ds343127.mlab.com:43127/graphql-books",
  { useNewUrlParser: true }
);
mongoose.connection.once("open", () => {
  console.log("MLab connected.");
});
app.use(cors());
app.use("/graphql", graphqlHTTP({ schema: schema, graphiql: true }));

app.listen(4000, () => {
  console.log("Running on 4000");
});
