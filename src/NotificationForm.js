import React, { Component } from 'react'
const { ipcRenderer } = window.require('electron')

class NotificationForm extends Component {
  constructor(props) {
    super()
    this.state = {value: ''}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    // alert(`this was submitted: ${this.state.value}`)
    ipcRenderer.send('NewNotification', this.state.value)
    event.preventDefault()
  }

  // When the component has been rendered to the DOM
  componentDidMount() {
    ipcRenderer.send('NotificationFormMounted')
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          New Price Alert<br />
          <input type="number" name="notif-price" value={this.state.value}
    onChange={this.handleChange} /><br />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default NotificationForm
