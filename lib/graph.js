const faas = require('./faas')
const { GraphQLClient } = require('graphql-request')

const endpoint = faas.secret('graphql-url', 'http://localhost:8081/v1/graphql')
const secret = faas.secret('graphsql-secret', 'secret')

const headers = {
  'x-hasura-admin-secret': secret,
  'content-type': 'application/json'
}

const client = new GraphQLClient(endpoint, { headers: headers })

module.exports = {
  client,

  getResults: function (name, query, data) {
    return this.client.request(query, data)
      .then(result => result[name] || result)
      .catch(error => {
        console.log('Error running query:', query, 'with data:', data, 'retrieving key:', name)
        console.log('Error:', error)
      })
  }
}
