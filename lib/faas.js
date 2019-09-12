const fs = require('fs')

module.exports = {
  secret (name) {
    const envVar = process.env[this.nameToEnvName(name)]
    if (envVar) {
      return envVar
    } else {
      const path = process.env.FAAS_SECRET_PATH || '/var/openfaas/secrets/'
      const file = path + name
      if (fs.existsSync(path)) {
        return fs.readFileSync(path, 'utf8')
      } else {
        throw new Error('SecretNotFound',
          'The following secret was not found: ' + name
        )
      }
    }
  },

  nameToEnvName (name) {
    return name.toUpperCase().replace(/-/g, '_')
  }
}
