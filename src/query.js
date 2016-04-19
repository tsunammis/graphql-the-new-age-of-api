'use strict'

var request           = require('superagent')
var graphql           = require('graphql')
var GraphQLString     = graphql.GraphQLString
var GraphQLObjectType = graphql.GraphQLObjectType
var GraphQLInt        = graphql.GraphQLInt
var GraphQLList       = graphql.GraphQLList
var USERS             = require('./data/users.json')
var VIDEOS            = require('./data/videos.json')
var FOLLOWING         = require('./data/following.json')

var UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => {
    return {
      id: { type: GraphQLString },
      name: { type: GraphQLString },
      fullname: {
        type: GraphQLString,
        deprecationReason: "Please use name instead",
        resolve: user => user.name
      },
      videos: {
        type: new GraphQLList(VideoType),
        resolve: user => Object.keys(VIDEOS).map(key => VIDEOS[key]).filter(video => video.owner == user.id)
      },
      following: {
        type: new GraphQLList(UserType),
        resolve: user => FOLLOWING[user.id].map(userId => USERS[userId])
      }
    }
  }
})

var VideoType = new GraphQLObjectType({
  name: 'Video',
  fields: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    owner: {
      type: UserType,
      resolve: video => USERS[video.owner]
    },
    url: { type: GraphQLString },
    likes: {
      type: GraphQLInt,
      resolve: video => {
        return new Promise((resolve, reject) => {
          request
            .get(`http://localhost:3001/${video.id}`)
            .end((err, res) => err || !res.ok ? reject() : resolve(res.body.data))
        })
      }
    }
  }
})

var RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: (_, args) => Object.keys(USERS).map((key) => USERS[key])
    },
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: (_, args) => USERS[args.id]
    },
    videos: {
      type: new GraphQLList(VideoType),
      resolve: (_, args) => Object.keys(VIDEOS).map(key => VIDEOS[key])
    },
    video: {
      type: VideoType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: (_, args) => VIDEOS[args.id]
    }
  }
})

module.exports = {
  UserType: UserType,
  VideoType: VideoType,
  RootQuery: RootQuery
}
