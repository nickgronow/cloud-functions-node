const fetch = require('node-fetch')

module.exports = {
  post (url, body) {
    return fetch(url, {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .catch(err => err.message)
  }
}
