const Tokens = require('@dofus-remote/tokens')
const Socket = require('./libs/socket')
const { generateString } = require('./libs/hash')
const { Signale } = require('signale')

module.exports = class Client {
  /**
   * 
   * @param {String} login
   * @param {String} password
   * @param {String} language
   * @param {Object} versions
   */
  constructor(login, password, language, versions = {}) {
    this.credentials = { login, password, language }
    this.versions = versions
    this.data = {}
    this.socket = new Socket()
  }

  async connect() {
    const logger = new Signale({ interactive: true })
    logger.await('[1/3] - Retrieving API key')
    const { key } = await Tokens.createApiKey(this.credentials.login, this.credentials.password, false)
    delete this.credentials.password
    logger.await('[2/3] - Retrieving account token')
    const { token } = await Tokens.createToken({ game: 18 }, key)
    this.credentials.sticker = generateString(15)
    this.credentials.clientKey = generateString(20)
    this.credentials.token = token
    logger.success('[3/3] - Authenticated')
  }
}