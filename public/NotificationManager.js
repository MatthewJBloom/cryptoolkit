const Notification = require('./Notify')
const EventEmitter = require('events')

/**
 * Represents a handler/manager for Notifications
 * Start by setting the feedEvents via listen(feedEvents)
 * Then, make a new notification via newNotification(coin_id, price)
 */
class NotificationManager {
  constructor() {
    this.notifications = {}
    this.feedEvents = undefined // Set with this.listen(EventEmitter)
    this.events = new EventEmitter()
  } // constructor()

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
    this.events.emit('change', Object.keys(this.notifications))
    console.log('created notification:', notification.id)
    return notification
  } // newNotification(price)

  /**
   * Remove a notification
   * @param {string} notification_id
   */
  removeNotification(id) {
    delete this.notifications[id]
    this.events.emit('change', Object.keys(this.notifications))
    console.log('removed notification:', id)
  }

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
   * - Get current price from this.feedEvents.once('price')
   * - Notification price is either above or below current price.
   * - Return the opposite, for priceEventHandler
   */
  getNewPosition(price) {
    return new Promise(resolve => {
      let position = ""
      this.feedEvents.once('tick', (current) => {
        // console.log(`current: ${current.price}, alert at ${price}`)
        if (current.price > price) {
          // If the current price is above the notification price, then our
          // condition will be if current price falls below the notification's.
          position = "below"
          resolve(position)
        } else if (current.price < price) {
          // If the current price is below the notification price, then our
          // condition will be if current price rises above the notification's.
          position = "above"
          resolve(position)
        } else {
          // TODO: Handle this somehow...
          console.log('Tried to set price to current price...')
        } // if current > or < price ...
      }) // this.feedEvents.once('price', (current) => {...
    }) // return new Promise(resolve => {...
  } // getNewPosition()

  /**
   * Listen to an event emitter and route it to the handler
   * @param {EventEmitter} feedEvents - emits a float on price
   */
  listen(feedEvents) {
    this.feedEvents = feedEvents
    this.feedEvents.on('tick', this.priceEventHandler.bind(this))
  } // listen(feedEvents)

  /**
   * Handle price changes, checking the current notifications to see if
   *     they should be sent.
   * @param {float} price - e.g. 50000.00 as in USD
   */
  priceEventHandler(tick) {
    let price = tick.price
    // Iterate over current notifications
    for (const notification_id in this.notifications) {
      // If the notification's position is now satisfied...
      if (this.notifications[notification_id].position === "above") {
        if (price >= this.notifications[notification_id].price) {
          // ...then trigger the notification, remove it, & emit the change.
          this.notifications[notification_id].send()
          this.removeNotification(notification_id)
        }
      } else if (this.notifications[notification_id].position === "below") {
        if (price <= this.notifications[notification_id].price) {
          // ...then trigger the notification, remove it, & emit the change.
          this.notifications[notification_id].send()
          this.removeNotification(notification_id)
        }
      }
    } // for (const notification_id in this.notifications)
  } // priceEventHandler(price)

} // NotificationManager

module.exports = NotificationManager
