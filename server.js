import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { readFileSync } from 'fs';
import NoIntrospection from 'graphql-disable-introspection';

//set mode to dev
process.env.NODE_ENV = "development"

// Construct a schema, using GraphQL schema language
const buffer = readFileSync("./schema.graphql");
var schema = buildSchema(buffer.toString());

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
  name: () => {
    return 'Wesley Reisz';
  },
  rollDice: (args) => {
    var output = [];
    for (var i = 0; i < args.numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (args.numSides || 6)));
    }
    return output;
  }
};


var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  //validationRules: [NoIntrospection],
  graphiql: process.env.NODE_ENV === 'development', //graphiql: true enables the ui
  rootValue: root
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');