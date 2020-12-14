const Socket = require('./libs/socket')
const { generateString } = require('./libs/hash')

module.exports = class Client {
  /**
   * Create a client
   * @param {String} token
   * @param {String} language
   * @param {Object} versions
   */
  constructor(token, language, versions = {}) {
    this.credentials = {
      token, language,
      sticker: generateString(15),
      clientKey: generateString(20)
    }
    this.versions = versions
    this.data = {}
    this.socket = new Socket()
  }
}