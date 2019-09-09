const { query } = require('graphqurl')

export default {
  endpoint: 'http://localhost:8081/v1/graphql',

  headers: {
    'x-hasura-admin-secret': 'secret',
    'content-type': 'application/json'
  },

  query,

  getResults: (name, graphQuery, data) => {
    return query({
      query: graphQuery,
      endpoint: this.endpoint,
      headers: this.headers,
      variables: data
    })
      .then(result => result.data[name])
      .catch(err => err.message)
  }
}
