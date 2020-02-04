import React, { Component } from 'react';
import './App.css';
import AddNumberRoot from './components/AddNumberRoot'
import DisplayNumberRoot from './components/DisplayNumberRoot';

class App extends Component {
  state = {number: 0}
  constructor(props) {
    super(props);
  }
  PushClick = (size) => {
    this.setState({number: this.state.number + size});
  }
  render() {
    return (
      <div className="App">
        <h1>Root</h1>
        <AddNumberRoot onClick={this.PushClick}/>
        <DisplayNumberRoot number={this.state.number} />
      </div>
    )
  }
}

export default App;
