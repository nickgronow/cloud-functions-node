'use strict'

const faas = require('./faas')
const auth = require('./auth')
const http = require('./http')
const redis = require('./redis')

module.exports = {
  faas,
  auth,
  redis,
  http
}
