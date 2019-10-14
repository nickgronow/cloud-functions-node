describe("Graph", function () {
  const Graph = require('../lib/graph.js')

  beforeEach(function () {
    this.endpoint = 'http://test.com'
    this.secret = 'secret'
    const fs = require('fs')
    process.env.APP_NAME = 'app'
    process.env.FAAS_SECRET_PATH = './'
    fs.writeFileSync('app-graphql-url', this.endpoint)
  })

  afterEach(function () {
    const fs = require('fs')
    fs.unlink('app-graphql-url', () => {})
    delete process.env.APP_NAME
    delete process.env.FAAS_SECRET_PATH
  })

  describe('headers', function () {
    it('generate headers with the secret', function () {
      expect(Graph.headers['x-hasura-admin-secret']).toBe(this.secret)
    })
  })
})
