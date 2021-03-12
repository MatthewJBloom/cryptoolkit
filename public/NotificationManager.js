const Notification = require('./Notify')
const EventEmitter = require('events')

/**
 * Represents a handler/manager for Notifications
 * Start by setting the priceEvents via listen(priceEvents)
 * Then, make a new notification via newNotification(coin_id, price)
 */
class NotificationManager {
  constructor() {
    this.notifications = {}
    this.priceEvents = undefined
    this.notificationEventEmitter = new EventEmitter()
  } // constructor()

  /**
   * Property notificationEvents, an EventEmitter
   * on new notification, emit ('newNotification', notifications list)
   * on sending notif, emit ('removeNotification', notifications list)
   * @returns {EventEmitter}
   */
  get notificationEvents() {
    return this.notificationEventEmitter
  }

  /**
   * Create a new notification and add it to the notifications dict.
   * @param {string} coin_id - The name of the coin, e.g. "BTC"
   * @param {float} price - The price to notify on, e.g. 50000.00
   * @returns {Promise} notification - The notification
   */
  async newNotification(coin_id, price) {
    let position = await this.getNewPosition(price)
    let notification_id = this.getNewID(coin_id, position, price)
    let notification = new Notification(notification_id, coin_id, price, position)
    this.notifications[notification_id] = notification
    this.notificationEventEmitter.emit('newNotification', Object.keys(this.notifications))
    return notification
  } // newNotification(price)

  /**
   * Get a new id for a new this.notifications key
   * @param {string} coin_id
   * @param {float} price
   */
  getNewID(coin_id, position, price) {
    return `${coin_id} ${position} ${price}`
  } // getNewID()

  /**
   * Get a promise resolving to either "above" or "below"
   * @param {float} price
   * - Get current price from this.priceEvents.once('price')
   * - Notification price is either above or below current price.
   * - Return the opposite, for priceEventHandler
   */
  getNewPosition(price) {
    return new Promise(resolve => {
      let position = ""
      this.priceEvents.once('price', (current) => {
        //console.log(current)
        if (current > price) {
          position = "below"
          resolve(position)
        } else if (current < price) {
          position = "above"
          resolve(position)
        } else {
          console.log('Tried to set price to current price...')
        } // if current > or < price ...
      }) // this.priceEvents.once('price', (current) => {...
    }) // return new Promise(resolve => {...
  } // getNewPosition()

  /**
   * Listen to an event emitter and route it to the handler
   * @param {EventEmitter} priceEvents - emits a float on price
   */
  listen(priceEvents) {
    this.priceEvents = priceEvents
    this.priceEvents.on('price', this.priceEventHandler.bind(this))
  } // listen(priceEvents)

  /**
   * Handle price changes, checking the current notifications to see if
   *     they should be sent.
   * @param {float} price - e.g. 50000.00 as in USD
   */
  priceEventHandler(price) {
    for (const notification_id in this.notifications) {
      //console.log(`${notification_id}: ${JSON.stringify(this.notifications[notification_id])}`)
      if (this.notifications[notification_id].position === "above") {
        if (price >= this.notifications[notification_id].price) {
          this.notifications[notification_id].send()
          //TODO: actually delete the notification not just the dict val
          delete this.notifications[notification_id]
          this.notificationEventEmitter.emit('removeNotification', Object.keys(this.notifications))
        }
      } else if (this.notifications[notification_id].position === "below") {
        if (price <= this.notifications[notification_id].price) {
          this.notifications[notification_id].send()
          //TODO: actually delete the notification not just the dict val
          delete this.notifications[notification_id]
          this.notificationEventEmitter.emit('removeNotification', Object.keys(this.notifications))
        }
      }
    } // for (const notification_id in this.notifications)
  } // priceEventHandler(price)

} // NotificationManager

module.exports = NotificationManager
