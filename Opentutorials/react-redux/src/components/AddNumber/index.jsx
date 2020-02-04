import React, { Component } from 'react';
import store from '../../store';

export default class AddNumber extends Component {
  state = { size: 1 }

  ChangeHandler = (e) => {
    this.setState({
      size: Number(e.target.value)
    });
  }
  PushClick = () => {
    store.dispatch({type: 'INCREMENT', size: this.state.size})
  }
  render() {
    return (
      <div>
        <h1>Add Number</h1>
        <input type="button" value="+" onClick={this.PushClick} />
        <input type="text" value={this.state.size} onChange={this.ChangeHandler} />
      </div>
    )
  }
};
