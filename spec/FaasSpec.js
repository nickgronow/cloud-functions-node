describe("Faas", function () {
  const Faas = require('../lib/faas.js')

  beforeEach(function () {
    this.name = 'a-secret-variable'
  })

  describe('prefix', function() {
    it('should not include a prefix if one is not defined', function() {
      expect(Faas.prefix(this.name)).toBe(this.name)
    })
    it('should include a prefix if one is defined', function() {
      process.env.APP_NAME = 'prefix'
      expect(Faas.prefix(this.name)).toBe('prefix-' + this.name)
      delete process.env.APP_NAME
    })
  })

  describe('nameToEnvName', function () {
    it('should be able to convert to environment names', function () {
      expect(Faas.nameToEnvName(this.name)).toBe('A_SECRET_VARIABLE')
    })
  })

  describe('secret', function () {
    describe('when the environment variable exists', function () {
      beforeEach(function () {
        process.env.A_SECRET_VARIABLE = 'secret in a env var'
      })
      afterEach(function () {
        delete process.env.A_SECRET_VARIABLE
      })

      it('should return the value of this variable', function () {
        expect(Faas.secret(this.name)).toBe('secret in a env var')
      })
    })

    describe('when the environment variable does not exist', function () {
      describe('when a file does not exist', function () {
        describe('when a default value is set', function () {
          it('should return the default value', function () {
            expect(Faas.secret(this.name, 'default')).toBe('default')
          })
        })

        describe('when a default value is not set', function () {
          it('should raise an error', function () {
            expect(function () { Faas.secret(this.name) }).toThrow()
          })
        })
      })

      describe('when a file does exist', function () {
        beforeEach(function () {
          const fs = require('fs')
          process.env.APP_NAME = 'app'
          process.env.FAAS_SECRET_PATH = './'
          fs.writeFileSync('app-' + this.name, 'secret in a file')
        })
        afterEach(function () {
          const fs = require('fs')
          process.env.FAAS_SECRET_PATH = './'
          fs.unlink('app-' + this.name, () => {})
          delete process.env.APP_NAME
        })
        it('should return the contents of that file', function () {
          expect(Faas.secret(this.name)).toBe('secret in a file')
        })
      })
    })
  })
})
