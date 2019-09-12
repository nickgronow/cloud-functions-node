const { GraphQLClient } = require('graphql-request')

const endpoint = process.env.GRAPHQL_URL || 'http://localhost:8081/v1/graphql'
const secret = process.env.GRAPHQL_SECRET || 'secret'

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
      .catch(err => err.message)
  }
}
