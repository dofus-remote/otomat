module.exports = class ClientLoader {
  constructor(kernel) {
    this.kernel = kernel
    this.clients = new Map()
  }

  [Symbol.iterator]() {
    return this.clients.values()
  }

  /**
   * @param {import('@dofus-remote/client')} client 
   */
  add(client) {
    if (this.clients.has(client.credentials.login)) return null
    client.versions = this.kernel.versions
    this.clients.set(client.credentials.login, client)
    return client
  }

  /**
   * @param {String} login 
   */
  remove(login) {
    this.clients.remove(login)
    return null
  }
}