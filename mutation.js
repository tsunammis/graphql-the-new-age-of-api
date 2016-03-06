'use strict'

var graphql = require('graphql')
var GraphQLString = graphql.GraphQLString
var GraphQLObjectType = graphql.GraphQLObjectType
var GraphQLInt = graphql.GraphQLInt
var GraphQLList = graphql.GraphQLList
var GraphQLInputObjectType = graphql.GraphQLInputObjectType

var query = require('./query')
var USERS = require('./data/users.json')

var UserAttributesInputType = new GraphQLInputObjectType({
  name: 'UserAttributesInputType',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString }
  })
})

var RootMutation = new graphql.GraphQLObjectType({
  name: 'RootMutations',
  fields: () => ({
    createOrUpdateUser: {
      type: query.UserType,
      args: {
        user: { type: UserAttributesInputType }
      },
      resolve: (root, args) => {
        USERS[args.user.id] = {
          "id": args.user.id,
          "name": args.user.name
        }
        return USERS[args.user.id]
      }
    }
  })
})

module.exports = {
  RootMutation: RootMutation,
  UserAttributesInputType: UserAttributesInputType
}
