const { EventEmitter } = require('events')

module.exports = class EventWrapper {
  /**
   * EventWrapper's constructor
   * @param {EventEmitter} emitter
   */
  constructor(emitter) {
    this.emitter = emitter
    this.events = {}
  }

  /**
   * Listen to an event
   * @param {string} eventName Name of the event to listen
   * @param {function} eventListener Callback
   * @returns {EventEmitter}
   */
  on(eventName, eventListener) {
    this.events[eventName] = eventListener
    this.emitter.on(eventName, eventListener)
    return this
  }

  /**
   * Listen to an event one time only
   * @param {String} eventName Name of the event to listen
   * @returns {Promise<object>}
   */
  once(eventName) {
    return new Promise((resolve, reject) => {
      const callback = packet => {
        delete this.events[eventName]
        resolve(packet)
      }
      this.emitter.once(eventName, callback)
    })
  }

  /**
   * Unregister all events
   * @returns {EventWrapper}
   */
  unregisterAll() {
    for (const eventName in this.events) {
      const eventListener = this.events[eventName]
      this.emitter.off(eventName, eventListener)
      delete this.events[eventName]
    }
    return this
  }
}
