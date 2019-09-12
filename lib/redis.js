const faas = require('./faas')
const redis = require('redis')

module.exports = {
  connect (secretPrefix) {
    const pw = faas.secret('redis-password')
    const prefix = faas.secret(secretPrefix + '-redis-namespace')
    const client = redis.createClient({
      password: pw,
      prefix: prefix
    })
    client.on('error', (error) => {
      console.log(error)
    })
    return client
  }
}
