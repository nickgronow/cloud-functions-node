const fs = require('fs')

module.exports = {
  secret (name) {
    const envVar = process.env[this.nameToEnvName(name)]
    if (envVar) {
      return envVar
    } else {
      return fs.readFileSync('/var/openfaas/secrets/' + name, 'utf8')
    }
  },

  nameToEnvName (name) {
    return name.toUpperCase().replace(/-/g, '_')
  }
}
