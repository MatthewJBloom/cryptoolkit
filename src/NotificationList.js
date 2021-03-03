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
      console.log(arg)
      let tempValue = this.state.value
      tempValue.push(arg)
      this.setState(state => ({
        value: tempValue
      }))
    })
  }

  render() {
    return (
      <div>
        {this.state.value}
      </div>
    )
  }
}

export default NotificationList
