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
      clicked: false,
      name: "",
      foto: "",
      email: ""
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

onClick = (event) => {
  let pressedName = event.target.innerText; // get pressed Name
  pressedName = pressedName.split(' ') // split string into characters
  let pressedItem = [];
  for ( let ii = 0; ii < pressedName.length; ii++) {
    pressedItem[ii] = pressedName[ii].trim() //remove all blank spaces
  }
  pressedItem = pressedItem.join('') //join characters to string
  let items = this.state.items; //get API data
  let joinedHelpArr = []; // create help Array to compare names of API with clicked name
  for (let jj = 0; jj < items.length; jj++) {
    joinedHelpArr[jj] = (items[jj].name.title + items[jj].name.first + (items[jj].name.last).split(' ').join(''));
  }
  let kk =  joinedHelpArr.indexOf(pressedItem); // is pressed Name in the API Data?
  if (kk >= 0) {
    this.setState({
      clicked: true,
      name: pressedName,
      foto: items[kk].picture.large,
      email: items[kk].email
    });
  }
  else {
    console.log('Error - Name not found')
  }
}

getBack = (event) => { // go back to list
    event.preventDefault()
    this.setState({
      clicked: false,
      name: "",
      foto: "",
      email: ""
    });
  }

  render() {
    const { error, isLoaded, items, clicked } = this.state;
    if (error) { //check if error occured
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) { //check if loading has finished
      return <div>Loading...</div>;
    } else {
        if (!clicked) { // check if Name was pressed
          return (
            <div>
              <div className="App-header">
                <a href="https://github.com/GiraeffleAeffle/addressbook/tree/master"> address book</a>
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
        } else if (clicked){
            return (
              <div>
                <div className="App-header">
                  <a href="https://github.com/GiraeffleAeffle/addressbook/tree/master"> address book</a>
                  <div className="header-right">
                  </div>
                </div>
                <div className="card">
                  <img src={this.state.foto} alt={this.state.name}/>
                   <div className="container">
                    <h4><b>{this.state.name} &nbsp;</b></h4>
                    <p>{this.state.email}</p>
                     </div>
                    <button onClick={this.getBack}>Back</button>
                </div>
              </div>
            );
          }
      }
  }
}

export default App;
