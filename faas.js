const fs = require('fs')

module.exports = {
  secret (name) {
    const envVar = process.env[name]
    if (envVar) {
      return envVar
    } else {
      return fs.readFileSync('/var/openfaas/secrets/' + name, 'utf8')
    }
  }
}
