const { GraphQLClient } = require('graphql-request')

const endpoint = process.env.GRAPHQL_URL

const headers = {
  'x-hasura-admin-secret': 'secret',
  'content-type': 'application/json'
}

module.exports = {
  client: new GraphQLClient(endpoint, { headers: headers }),

  getResults: function (name, graphQuery, data) {
    return this.client.request(graphQuery, data)
      .then(result => result.data[name])
      .catch(err => err.message)
  }
}
