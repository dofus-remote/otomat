module.exports = class PluginHelper {
  static getContext(client) {
    const context = {}
    Object.defineProperty(context, 'socket', { get: () => client.socket })
    Object.defineProperty(context, 'rootData', { get: () => client.data })
    Object.defineProperty(context, 'credentials', { get: () => client.credentials })
    Object.defineProperty(context, 'versions', { get: () => client.versions })
    return context
  }

  static getScope(client, plugin) {
    const { key } = plugin.describe()
    const _wrapper = client.data._pluginLoader.wrappers[key]
    const scope = Object.assign(client.data[key], plugin.methods, { _wrapper })
    return scope
  }

  static fillData(client, plugin) {
    const { key } = plugin.describe()
    if (key in client.data) return
    client.data[key] = plugin.data()
  }

  static fillApi(kernel, plugin) {
    const { key } = plugin.describe()
    if (key in kernel.api) return

    kernel.api[key] = {}
    for (const methodName in plugin.methods) {
      const method = plugin.methods[methodName]
      kernel.api[key][methodName] = (client, ...args) => {
        const scope = this.getScope(client, plugin)
        const context = this.getContext(client)
        return method.call(scope, context, ...args)
      }
    }
  }

  static subscribeEvents(client, plugin) {
    const { key } = plugin.describe()
    if (key in client.data._pluginLoader.wrappers) return

    const scope = this.getScope(client, plugin)
    const context = this.getContext(client)
    const wrapper = client.socket.createWrapper()

    for (const subscriberName in plugin.subscribers) {
      const subscriber = plugin.subscribers[subscriberName]
      wrapper.on(subscriberName, (...args) => {
        subscriber.call(scope, context, ...args)
      })
    }

    client.data._pluginLoader.wrappers[key] = wrapper
  }
}