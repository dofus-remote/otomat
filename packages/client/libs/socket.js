const { EventEmitter } = require('events')
const EventWrapper = require('./event-wrapper')
const { Signale } = require('signale')
const { createSocket } = require('primus')

const AuthServer = 'https://proxyconnection.touch.dofus.com'
const GameServer = 'https://oshimogameproxy.touch.dofus.com'
const GameSocket = createSocket({ transformer: 'engine.io' })

const ServerTypeEnum = {
  NONE: '',
  LOGIN: 'Login',
  GAME: 'Game'
}

const signale = new Signale({
  types: {
    packet: {
      badge: '📦',
      color: 'blueBright',
      label: 'packet',
      logLevel: 'info'
    }
  }
})

class Socket {
  constructor() {
    this.serverType = ''
    this.dispatcher = new EventEmitter()
    this.client = null
  }

  /**
   * Make and maintain connection to the `serverType` corresponding server address
   * @param {string} phase Phase
   * @returns {Socket}
   */
  connect(serverType, sticker) {
    if (this.client !== null) {
      throw new Error('A connection has already in progress.')
    }

    const serverAddress =
      (serverType === ServerTypeEnum.LOGIN ? AuthServer : GameServer) +
      '?STICKER=' +
      sticker

    this.serverType = serverType
    this.client = new GameSocket(serverAddress, {
      manual: true,
      reconnect: {
        max: 5000,
        min: 500,
        retries: 0
      },
      strategy: 'disconnect, timeout'
    })
    
    this.client
      .on('open', this._OnSocketOpened.bind(this))
      .on('data', this._OnSocketDataReceived.bind(this))
      .on('reconnect', this._OnSocketReconnecting.bind(this))
      .on('error', this._OnSocketError.bind(this))
      .on('close', this._OnSocketClosed.bind(this))
      .on('end', this._OnSocketEnded.bind(this))
      .open()

    return this
  }

  _OnSocketOpened() {
    signale.info('Connection opened')
    this.dispatcher.emit('SocketConnected')
  }

  _OnSocketDataReceived(packet) {
    signale.packet(`RCV ${packet._messageType}`)
    this.dispatcher.emit(packet._messageType, packet)
  }

  _OnSocketReconnecting() {
    signale.warn('Trying to reconnect')
    this.dispatcher.emit('SocketReconnecting')
  }

  /**
   * 
   * @param {Error} e 
   */
  _OnSocketError(e) {
    signale.error('An error occured')
    signale.error(e)
    this.dispatcher.emit('SocketError')
  }

  _OnSocketClosed() {
    signale.info('<Socket> Connection closed')
    this.dispatcher.emit('SocketClosed')
  }

  _OnSocketEnded() {
    signale.info('<Socket> Connection ended')
    if (!this.client) return
    this.client.destroy()
    this.client = null
    this.dispatcher.emit('SocketEnded')
  }

  /**
   * Log out from the game server
   * @param {string} reason Reason to log-out the user
   * @returns {Socket}
   * @todo Investigate for an existing reason that we can use
   */
  disconnect(reason = 'NO_REASON') {
    this.send('disconnecting', reason)
    this.client.destroy()
    this.client = null
    return this
  }

  /**
   * Send something to the server
   * @param {string} call Name of the packet to send
   * @param {object} data JSON data to send
   * @returns {Socket}
   */
  send(call, data) {
    if (!this.client) {
      throw new Error('Trying to send data to an unavailable connection.')
    }

    signale.packet('SNT ' + (data && data.type ? data.type : call))
    this.client.write({ call, data })
    return this
  }

  /**
   * Send a packet to the server
   * @param {string} type Name of the packet to send
   * @param {object} data JSON data to send
   * @returns {Socket}
   */
  sendMessage(type, data) {
    return this.send('sendMessage', { type, data })
  }

  /**
   * Wrap socket events
   * @returns {EventWrapper}
   */
  createWrapper() {
    return new EventWrapper(this.dispatcher)
  }
}

module.exports = Socket