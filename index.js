'use strict'

const faas = require('./faas')
const auth = require('./auth')
const http = require('./http')
const redis = require('./redis')
const graph = require('./graph')

module.exports = {
  faas,
  auth,
  redis,
  http,
  graph
}
