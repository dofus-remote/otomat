const got = require('got')
const baseURL = 'https://proxyconnection.touch.dofus.com'
const urls = {
    config: baseURL + '/config.json',
    build: baseURL + '/build/script.js',
    assets: baseURL + '/assetsVersions.json',
    app: (country, lang) => `https://itunes.apple.com/lookup?country=${country}&id=1041406978&lang=${lang}&limit=1&t=${Date.now()}`
}

module.exports = class Version {
  static async getApp(country, lang) {
    const url = urls.app(country, lang)
    const data = await got(url).json()
    return data.results[0].version
  }

  static async getBuild() {
    const data = await got(urls.build)
    return /.*buildVersion=("|')([0-9]*\.[0-9]*\.[0-9]*)("|')/g.exec(data.body.substring(1, 10000))[2]
  }

  static async getAssets() {
    const { assetsVersion, staticDataVersion } = await got(urls.assets).json()
    return { assetsVersion, staticDataVersion }
  }

  static async getConfig() {
    const data = await got(url.config).json()
    return JSON.parse(data)
  }

  static async get(country, lang) {
    const [ appVersion, buildVersion, assets ] = await Promise.all([
        this.getApp(country, lang),
        this.getBuild(),
        this.getAssets()
    ])
    return Object.assign({ appVersion, buildVersion }, assets)
  }
}

