/*******  In this file we define our Schema  ***********/
/******* Remember  ***********/

/* Our Schema define

    the data on this type of graph,which describes the 
    object types (such as book and authors) and 
    the relation between those object types and
    its describe how we can reach to the graph to interact with the data whether that be

     Query (to retreive the data),
     mutation(to changes the data(add,update,delete))
*/
const graphql = require("graphql"); // main package of the graphql to use multiple function of graphQL
const _ = require("lodash"); // allows us a lot of tricks to find data and change data
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLID,
  GraphQLList
} = graphql;

//dummy data

var books = [
  { name: "HTML", cost: "$50", id: "1", authorId: "1" },
  { name: "CSS", cost: "$52", id: "2", authorId: "1" },
  { name: "JS", cost: "$53", id: "3", authorId: "2" },
  { name: "REACT", cost: "$54", id: "4", authorId: "3" },
  { name: "NODE", cost: "$55", id: "5", authorId: "3" }
];

var authors = [
  { name: "Musawir", age: 25, id: "1" },
  { name: "Hussain", age: 26, id: "2" },
  { name: "Turi", age: 27, id: "3" }
];

//Define the data type (BookType)  on Graph
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    cost: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId });
      }
    }
  })
});

//Define the data type (AuthorType)  on Graph
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    book: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id });
      }
    }
  })
});

//Query of the Schema
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",

  fields: {
    //query for a particular book
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } }, //expected argument from user  (id)

      //this resolve () function where we wite code to get whichever data we need from our database or some other source
      resolve(parent, args) {
        return _.find(books, { id: args.id });
      }
    },

    //query for a particular author
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },

      //this resolve () function where we wite code to get whichever data we need from our database or some other source
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    },

    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
