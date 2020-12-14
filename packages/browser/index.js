const signale = require('signale')
const puppeteer = require('puppeteer')

module.exports = class Browser {
  constructor() {
    this.process = null
    this.page = null
  }

  get isRunning() {
    return this.process && this.page
  }

  async open() {
    signale.info('Opening headless process instance')
    this.process = await puppeteer.launch({ headless: false })
    this.page = await this.process.newPage()
    return this.page.setRequestInterception(true)
  }

  /**
   * Send request through Puppeteer
   * @param {import('puppeteer').Overrides} payload 
   */
  async request(payload) {
    if (!this.isRunning) throw new Error('Browser must be opened before requesting')
    signale.info('Requesting through the headless process instance')
    const interceptor = interceptedRequest => interceptedRequest.continue(payload)
    this.page.once('request', interceptor)
    const response = await this.page.goto(payload.url)
    return response.json()
  }

  async close() {
    signale.info('Closing the headless process instance')
    await this.process.close()
    this.page = null
    this.process = null
  }
}