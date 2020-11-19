const helper = require('./helper')

/**
 * To avoid .flush() and more
 * @todo register datas in clients when adding a plugin
 * @todo removing datas from clients when removing a plugin
 * @todo same as 1st but when we plug a new client
 */

module.exports = class PluginLoader {
  constructor(kernel) {
    this.kernel = kernel
    this.plugins = new Map()
  }

  add(plugin) {
    const { key } = plugin.describe()
    if (this.plugins.has(key)) return null
    this.plugins.set(key, plugin)
    helper.fillApi(this.kernel, plugin)
    return this
  }

  remove(plugin) {
    const { key } = plugin.describe()
    this.plugins.delete(key)
    delete this.kernel.api[key]
    return this
  }

  flush() {
    for (const client of this.kernel.clients) {
      for (const [ key, plugin ] of this.plugins) {
        if (!client.data.hasOwnProperty('_pluginLoader'))
          client.data._pluginLoader = { wrappers: {} }

        helper.fillData(client, plugin)
        helper.subscribeEvents(client, plugin)

        if ('mounted' in plugin) {
          const scope = helper.getScope(client, plugin)
          const context = helper.getContext(client)
          plugin.mounted.call(scope, context)
        }
      }
    }

    return this
  }
}