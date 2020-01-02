import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo"; // bind apollo to react or bind  below query to this component

// query for geeting all books
const getBooksQuery = gql`
  {
    books {
      id
      name
      cost
    }
  }
`;

class BookList extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Book List</h1>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);

// bind getBooksQuery to BookList
