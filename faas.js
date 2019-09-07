const fs = require('fs')

module.exports = {
  secret (name) {
    return fs.readFileSync('/var/openfaas/secrets/' + name, 'utf8')
  }
}
