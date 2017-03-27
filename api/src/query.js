'use strict'

import request from 'superagent'
import { GraphQLString, GraphQLObjectType, GraphQLInt, GraphQLList, GraphQLInputObjectType, GraphQLNonNull } from 'graphql'
import USERS_DATA from './data/users.js'
import VIDEOS_DATA from './data/videos.js'
import FOLLOWING_DATA from './data/following.js'

const CHUCK_NORRIS_USERID = "10"

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
        resolve: user => Object
          .keys(VIDEOS_DATA)
          .map(key => VIDEOS_DATA[key])
          .filter(video => video.owner == user.id)
      },
      following: {
        type: new GraphQLList(UserType),
        resolve: user => FOLLOWING_DATA[user.id].map(userId => USERS_DATA[userId])
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
      resolve: video => USERS_DATA[video.owner]
    },
    url: { type: GraphQLString },
    likes: {
      type: GraphQLInt,
      resolve: video => {
        return new Promise((resolve, reject) => {
          request
            .get(`http://localhost:4001/${video.id}`)
            .end((err, res) => err || !res.ok ? reject() : resolve(res.body.data))
        })
      }
    }
  }
})

var SocialNetworkType = new GraphQLObjectType({
  name: 'SocialNetwork',
  fields: () => {
    return {
      twitter: {
        type: GraphQLString,
        resolve: () => "@chucknorris"
      },
      facebook: {
        type: GraphQLString,
        resolve: () => "https://www.facebook.com/officialchucknorrispage/"
      }
    }
  }
})

var MeType = new GraphQLObjectType({
  name: 'Me',
  fields: () => {
    return {
      name: {
        type: GraphQLString,
        resolve: () => "Chuck Norris"
      },
      socialNetwork: {
        type: SocialNetworkType,
        resolve: () => { return {} }
      },
      videos: {
        type: new GraphQLList(VideoType),
        args: {
          first: { type: GraphQLInt }
        },
        resolve: (user, args) => {
          const end = args.first || 10
          return Object
            .keys(VIDEOS_DATA)
            .map(key => VIDEOS_DATA[key])
            .filter(video => video.owner == CHUCK_NORRIS_USERID)
            .slice(0, end)
        }
      },
    }
  }
})

var RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    me: {
      type: MeType,
      resolve: () => { return {} }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: (_, args) => Object
        .keys(USERS_DATA)
        .map((key) => USERS_DATA[key])
        .filter(u => u.id != CHUCK_NORRIS_USERID)
    },
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: (_, args) => USERS_DATA[args.id]
    },
    videos: {
      type: new GraphQLList(VideoType),
      args: {
        first: { type: GraphQLInt }
      },
      resolve: (_, args) => {
        const end = args.first || 10
        return Object
          .keys(VIDEOS_DATA)
          .map(key => VIDEOS_DATA[key])
          .filter(v => v.owner != CHUCK_NORRIS_USERID)
          .slice(0, end)
      }
    },
    video: {
      type: VideoType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: (_, args) => VIDEOS_DATA[args.id]
    }
  }
})

const RootMutation = new GraphQLObjectType({
  name: 'RootMutations',
  fields: () => ({
    updateNameForUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, args) => {
        USERS_DATA[args.id]['name'] = args.name
        return USERS_DATA[args.id]
      }
    },
  })
})

module.exports = {
  query: RootQuery,
  mutation: RootMutation
}
