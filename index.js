'use strict'

var graphql     = require('graphql')
var graphqlHTTP = require('express-graphql')
var express     = require('express')
var request     = require('superagent')
var colors      = require('colors/safe')
var LIKES       = require('./src/data/likes.json')

express()
  .use((req, res, next) => {
    console.log(`${colors.blue('graphql ')} ${req.path}`)
    next()
  })
  .use('/graphql', graphqlHTTP({
    schema: require('./src/schema'),
    pretty: true,
    graphiql: true
  }))
  .listen(3000, () => {
    console.log(colors.blue('graphql listen on localhost:3000'))
  })

express()
  .use((req, res, next) => {
    console.log(`${colors.green('μ-likes')} ${req.path}`)
    next()
  })
  .get('/:videoId', (req, res) => {
    if ('videoId' in req.params && req.params.videoId in LIKES) {
      return res.send({
        data: LIKES[req.params.videoId]
      })
    }

    res.status(404).end()
  })
  .listen(3001, () => {
    console.log(colors.green('μ-likes listen on localhost:3001'))
  })
