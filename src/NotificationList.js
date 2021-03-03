import React, { Component } from 'react'
const { ipcRenderer } = window.require('electron')

class NotificationList extends Component {
  constructor(props) {
    super()
    this.state = {value: []}
  }

  // When the component has been rendered to the DOM
  componentDidMount() {
    ipcRenderer.send('NotificationListMounted')
    ipcRenderer.on('newNotification', (event, arg) => {
      // console.log('adding new notification:', arg)
      this.setState(state => ({
        value: arg
      }))
    })
    ipcRenderer.on('removeNotification', (event, arg) => {
      // console.log('removing notification:', arg)
      this.setState(state => ({
        value: arg
      }))
    })
  }

  render() {
    let notifications = this.state.value
    let formattedNotifs = notifications.map((notification) =>
      <li>{notification}</li>
    )
    return (
      <div>
        <ul>{formattedNotifs}</ul>
      </div>
    )
  }
}

export default NotificationList
