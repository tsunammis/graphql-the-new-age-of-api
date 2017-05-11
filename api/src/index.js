import express from 'express'
import graphqlHTTP from 'express-graphql'
import cors from 'cors'
import colors from 'colors/safe'
import LIKES_DATA from './data/likes.js'

const GRAPHQL_PORT = 5002
const ULIKE_PORT = 5003

const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

var schema = new GraphQLSchema({
  query: require('./query').query,
  mutation: require('./query').mutation,
})


const app = express()
  .use(cors())
  .use((req, res, next) => {
    console.log(`${colors.blue('graphql')} ${req.path}`)
    next()
  })
  .use('/graphql', graphqlHTTP({
    schema: schema,
    pretty: true,
    graphiql: true,
    context: {
      'like-service-url': `http://localhost:${ULIKE_PORT}`
    }
  }))
  .listen(GRAPHQL_PORT, () => {
    console.log(colors.blue(`graphql listen on localhost:${GRAPHQL_PORT}`))
  })


express()
  .use(cors())
  .use((req, res, next) => {
    console.log(`${colors.green('μ-likes')} ${req.path}`)
    next()
  })
  .get('/:videoId', (req, res) => {
    if ('videoId' in req.params && req.params.videoId in LIKES_DATA) {
      return res.send({
        data: LIKES_DATA[req.params.videoId]
      })
    }

    res.status(404).end()
  })
  .listen(ULIKE_PORT, () => {
    console.log(colors.green(`μ-likes listen on localhost:${ULIKE_PORT}`))
  })
