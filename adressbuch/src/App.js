import React, { Component } from 'react';
import './App.css';
const url = "https://randomuser.me/api/?results=20"; //API

class App extends Component {
  constructor(props) { // Constructor for state variables
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [], // Save API Data
    };
  }

  componentDidMount() {
  fetch(url) // Fetch data from API
    .then(res => res.json()) // convert to JSON
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result.results, // Save data in array
          clicked: false
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
}

  render() {
    const { error, isLoaded, items, clicked } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
        return (
          <div>
            <div className="App-header">
              <a> address book</a>
            </div>
            <ul>
            {items.map(item => (
              <li key={item.email}>
                <button value={this.state.items} onClick={this.onClick}>
                {item.name.title}  &nbsp;
                {item.name.first}  &nbsp;
                {item.name.last}</button>
              </li>
            ))}
          </ul>
          </div>
        );
      }
  }
}

export default App;
