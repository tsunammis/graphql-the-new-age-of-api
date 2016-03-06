'use strict'

var graphql = require('graphql')
var graphqlHTTP = require('express-graphql')
var express = require('express')
var request = require('superagent')
var colors = require('colors/safe')

express()
  .use(function (req, res, next) {
    console.log(`${colors.blue('graphql ')} ${req.path}`)
    next()
  })
  .use('/graphql', graphqlHTTP({ schema: require('./schema'), pretty: true, graphiql: true }))
  .listen(3000)

express()
  .use(function (req, res, next) {
    console.log(`${colors.green('μ-link')} ${req.path}`)
    next()
  })
  .get('/:videoId', function (req, res) {
    if ('videoId' in req.params && req.params.videoId in LIKES) {
      res.send({
        data: LIKES[req.params.videoId]
      })
    } else {
      res.status(404).end()
    }
  })
  .listen(3001)
