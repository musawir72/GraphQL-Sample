const express = require("express"); //for   setup express app
const graphqlHTTP = require("express-graphql"); //allows express to interact and understand graphQL
const app = express(); //invoke the function to create our app
const schema = require("./schema/schema");
const mongoose = require("mongoose");

//connect to mongoose
mongoose.connect(
  "mongodb+srv://musawir:12345@cluster0-lfexz.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

mongoose.connection.once("open", () => {
  console.log("connected to the database");
});

//graphql entry point or end point (graphQL middleware)
app.use(
  "/graphql",

  // graphqlHTTP() function is fire whenever request comes in (Handle the request)
  graphqlHTTP({
    schema,
    graphiql: true
  })
);
// listen app on this port
app.listen(4000, () => {
  console.log("Listening on port 4000");
});
