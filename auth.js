const faas = require('./faas')
const redis = require('./redis')
const http = require('./http')
const jwt = require('jsonwebtoken')
const jwks = require('jwks-rsa')

module.exports = {
  auth0Subdomain: null,
  secretPrefix: null,
  audience: null,

  async getToken (auth0Subdomain, secretPrefix, audience) {
    this.auth0Subdomain = auth0Subdomain
    this.secretPrefix = secretPrefix
    this.audience = audience
    const existingToken = await this.getExistingAuthToken()
    if (existingToken) {
      const decoded = this.decodeToken(existingToken)
      if (decoded) {
        return existingToken
      }
    }
    const newToken = await this.getNewAuthToken()
    await this.saveAuthToken(newToken)
    return newToken
  },

  url () {
    return 'https://' + this.auth0Subdomain + '.auth0.com/oauth/token'
  },

  clientId () {
    return faas.secret(this.prefix + '-auth-client-id')
  },

  clientSecret () {
    return faas.secret(this.prefix + '-auth-client-secret')
  },

  decodeToken (token) {
    return jwt.verify(token, this.getJwksKey)
  },

  getJwksKey (header, callback) {
    const client = jwks({
      jwksUri: 'https://' + this.auth0Subdomain + '.auth0.com/.well-known/jwks.json'
    })
    client.getSigningKey(header.kid, (err, key) => {
      if (err) {
        console.log('Error getting signing key: ' + err.message)
      } else {
        const signingKey = key.publicKey || key.rsaPublicKey
        callback(null, signingKey)
      }
    })
  },

  getNewAuthToken () {
    const body = {
      client_id: this.clientId(),
      client_secret: this.clientSecret(),
      audience: this.audience,
      grant_type: 'client_credentials'
    }
    return http.post(this.url(), body)
  },

  getExistingAuthToken () {
    return redis.connect(this.secretPrefix).getAsync('jwt-token')
  },

  saveAuthToken (token) {
    return redis.connect(this.secretPrefix).setAsync('jwt-token', token)
  }
}
