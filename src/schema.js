'use strict'

var GraphQLSchema = require('graphql').GraphQLSchema

module.exports = new GraphQLSchema({
  query: require('./query').RootQuery,
  mutation: require('./mutation').RootMutation
})
