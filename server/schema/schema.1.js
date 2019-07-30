const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;
const _ = require("lodash");
const Book = require("../models/book");

var persons = [
  {
    name: "A",
    link: "/a",
    id: "1",
    age: "12",
    likes:["2"]
  },
  {
    name: "B",
    link: "/b",
    id: "2",
    age: "14",
    likes:["3"]
  },
  {
    name: "C",
    link: "/c",
    id: "3",
    age: "16",
    likes:["1","2"]
  }
];

const PersonType = new GraphQLObjectType({
  name: "Person",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    link: { type: GraphQLString },
    age: { type: GraphQLInt }
    
    // likedBy: {
    //   type: AuthorType,
    //   resolve(parent, args) {
    //     return _.find(persons , { id: parent.id });
    //     // return Author.findById(parent.authorID);
    //   }
    // }
  })
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addBook: {
      type: PersonType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorID: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorID: args.authorID
        });
        return book.save();
      }
    }
  }
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    person: {
      type: PersonType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(persons, { id: args.id });
        // return persons.findById(args.id);
      }
    },
    persons: {
      type: new GraphQLList(PersonType),
      resolve(parent, args) {
        return persons;
        // return Book.find({});
      }
    },
    likes:{
      type: new GraphQLList(GraphQLString),
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(persons, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
