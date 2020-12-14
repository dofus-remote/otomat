const { request } = require('https')

function getJson(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = request(url, options, res => {
      let data = ''
      res.on('data', chunk => (data += chunk))
      res.on('end', () => resolve(JSON.parse(data)))
    })

    req.on('error', err => reject(err))
    req.write(options.data || '')
    req.end()
  })
}

/**
 * @param {Object} ctx 
 * @param {Number} ctx.game
 * @param {String} key
 */
module.exports =
  ({ game }, key) => getJson('https://haapi.ankama.com/json/Ankama/v2/Account/CreateToken?game=' + game, { headers: { apiKey: key } })