import React from "react";
import ApolloClient from "apollo-boost"; // setup apollo client
import { ApolloProvider } from "react-apollo"; // binding react to apollo,its help react to undrstand apollo
import BookList from "./componenets/BookList";

//Apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql" // end point for making request to graphQL server(Handle all our quries)
});
function App() {
  return (
    // ApolloProvider wrapp our entire which enables to taking data from the apollo which received from a server and provideing to App.

    <ApolloProvider client={client}>
      <div className="container">
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
