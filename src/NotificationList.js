import React, { Component } from 'react'
const { ipcRenderer } = window.require('electron')

class NotificationList extends Component {
  constructor(props) {
    super()
    this.state = {value: []}
  }

  // When the component has been rendered to the DOM
  componentDidMount() {
    ipcRenderer.send('NotificationListDidMount')
    ipcRenderer.on('NotificationManager:change', (event, arg) => {
      // console.log('adding new notification:', arg)
      this.setState(state => ({
        value: arg
      }))
    })
  }

  render() {
    let notifications = this.state.value
    let formattedNotifs = notifications.map((notification) =>
      <li key={notification}>{notification}</li>
    )
    return (
      <div>
        <ul>{formattedNotifs}</ul>
      </div>
    )
  }
}

export default NotificationList
