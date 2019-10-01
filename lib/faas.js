const fs = require('fs')

module.exports = {
  secret (name, defaultValue) {
    // First check for an env variable
    const prefixed = this.prefix(name)
    const envVar = process.env[this.nameToEnvName(prefixed)]
    if (envVar) {
      return envVar

    // Next check for a secret file
    } else {
      const path = process.env.FAAS_SECRET_PATH || '/var/openfaas/secrets/'
      const file = path + prefixed
      if (fs.existsSync(file)) {
        return fs.readFileSync(file, 'utf8')

      // Next check for a default value
      } else if (typeof defaultValue !== 'undefined') {
        return defaultValue

      // Fail at this point!
      } else {
        throw new Error('SecretNotFound',
          'The following secret was not found: ' + name
        )
      }
    }
  },

  prefix (name) {
    const app = process.env.APP_NAME
    return (app ? app + '-' : '') + name
  },

  nameToEnvName (name) {
    return name.toUpperCase().replace(/-/g, '_')
  }
}
