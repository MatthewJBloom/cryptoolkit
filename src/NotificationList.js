import React, { Component } from 'react'
const { ipcRenderer } = window.require('electron')

class NotificationList extends Component {
  constructor(props) {
    super()
    this.state = {value: []}
  }

  // When the component has been rendered to the DOM
  componentDidMount() {
    ipcRenderer.send('NotificationList:didMount')
    ipcRenderer.on('NotificationManager:change', (event, arg) => {
      // console.log('adding new notification:', arg)
      this.setState(state => ({
        value: arg
      }))
    })
  }

  removeNotification(notification) {
    ipcRenderer.send('NotificationList:removeNotification', notification)
  }

  render() {
    let notifications = this.state.value
    let formattedNotifs = notifications.map((notification) =>
      <li key={notification}>{notification}<button onClick={this.removeNotification.bind(this,notification)}>x</button></li>
    )
    return (
      <div>
        <ul>{formattedNotifs}</ul>
      </div>
    )
  }
}

export default NotificationList
