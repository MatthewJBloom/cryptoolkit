import React, { Component } from 'react'

class NotificationForm extends Component {
  constructor(props) {
    super()
    this.state = {value: ''}
    this.callback = props.callback

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    // alert(`this was submitted: ${this.state.value}`)
    this.callback(this.state.value)
    event.preventDefault()
  }

  // When the component has been rendered to the DOM
  // componentDidMount() {
  //
  // }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Price Alert<br />
          <input type="text" name="notif-price" value={this.state.value}
    onChange={this.handleChange} /><br />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default NotificationForm
