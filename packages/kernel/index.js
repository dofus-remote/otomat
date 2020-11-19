const ClientLoader = require('./client/loader')
const PluginLoader = require('./plugin/loader')

module.exports = class Kernel {
  constructor(versions) {
    this.versions = versions
    this.plugins = new PluginLoader(this)
    this.clients = new ClientLoader(this)
    this.api = {}
  }
}