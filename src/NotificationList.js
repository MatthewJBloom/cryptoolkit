import React, { Component } from 'react'

class NotificationList extends Component {
  constructor(props) {
    super()
    this.state = {value: ''}
    // this.notifications = props.notifications.notifications()
  }

  // When the component has been rendered to the DOM
  // componentDidMount() {
  //   this.
  // }

  render() {
    return (
      <div>
        {this.state.value}
      </div>
    )
  }
}

export default NotificationList
