import React, { Component } from "react";
import CrystalPics from "./components/CrystalPictures";
import Scores from "./components/Scores";
import Header from "./components/Header"
import crystals from "./crystals.json";
import Data from "./components/HistoricData"
import Wrapper from "./components/Wrapper"
import './App.css';
class App extends Component {

  state= {
    crystals,
    target: 0, 
    score: 0, 
    wins: 0, 
    losses: 0, 
    values: [0,0,0,0],
  }

  componentDidMount = () => {
    this.update();
  }

  update = () => {
    let newTarget = Math.floor(Math.random() * (120-20+1))+20;
    let newValue = this.state.values.map(num => (num = Math.floor(Math.random() * 12)+1));
    this.setState({ target: newTarget, values: newValue });
  }

  handleClick = (id, value) =>{
    console.log(`in handleClick id:${id} value:${value}`);
  //add to your score
  let newScore = this.state.score + value;
  
  //check if you win or lose 
  if (newScore === this.state.target){
    let newWins = this.state.wins + 1;
    this.setState({ score:0, wins: newWins})
    this.update();
  } else if (newScore > this.state.target){
    let newLoss = this.state.losses +1;
    this.setState({ score: 0, losses: newLoss}); 
    this.update();
  } else{
  this.setState({ score: newScore});
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Scores target={this.state.target} yScore={this.state.score}/>
        <Wrapper>
          {/* Map over crystals from the crystals.json -> this.state.crystals */}
          {this.state.crystals.map(crystal => (
            <CrystalPics
              className="image"
              image={crystal.picture}
              name= {crystal.name}
              id={crystal.id}
              key={crystal.id}
              value={this.state.values[crystal.id]}
              score= {this.handleClick}
              />
          ))}        
        </Wrapper>
        <Data wins={this.state.wins} losses={this.state.losses}/>
      </div>
    );
  }
}
export default App;
