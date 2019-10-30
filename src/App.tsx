import React from 'react';
import logo from './logo.svg';
import './App.css';

interface IColor {
  red: number
  green: number
  blue: number
}

interface IMyComponentProps{

}

interface IMyComponentState {
  currentColor: IColor;
  colorHistory: IColor[];
  colorFavorites: IColor[];
  repeatColorLoop: boolean;
}

class App extends React.Component<IMyComponentProps, IMyComponentState> {

  state = {
    currentColor: {
      red: 0,
      green: 0,
      blue: 0
    },
    colorHistory: [],
    colorFavorites: [],
    repeatColorLoop: true
  }
  getRandomNum = (): number => {
    return Math.round(Math.random() * 255);
  };

  getRandomColor = (): IColor => {
    const red: number = this.getRandomNum();
    const green: number = this.getRandomNum();
    const blue: number = this.getRandomNum();

    return ({
      red,
      green,
      blue
    });
  }

  changeBgColor = (red: number, green: number, blue: number): void => {
    this.setState({currentColor: {
      red,
      green,
      blue
    }});
  };

  addToHistoryArray = (red: number, green: number, blue: number): void => {
    this.setState((prevState) => ({
      colorHistory: [...prevState.colorHistory, {
        red,
        green,
        blue
      }]
    }))
  }

  //interval Var for setting and clearing loop
  interval: number | undefined = undefined;

  componentDidMount(){
    this.startLoop();
  };

  componentWillUnmount(){
    this.stopLoop();
  };

  startLoop = () => {
    if (this.interval){
      window.clearInterval(this.interval);
    }
    this.colorLoop();
    this.interval = window.setInterval(this.colorLoop, 2000);
  }

  stopLoop = () => {
    if (this.interval){
      window.clearInterval(this.interval)
      this.interval = undefined;
    }
  }

  colorLoop = () => {
    const randomColor = this.getRandomColor();
    this.changeBgColor(randomColor.red, randomColor.green, randomColor.blue);
    this.addToHistoryArray(randomColor.red, randomColor.green, randomColor.blue);
    console.log(this.state.colorHistory);
  };

  startStopHandler = (): void => {
    if (this.state.repeatColorLoop){
      this.stopLoop();
      this.setState({repeatColorLoop: false});
    } else {
      this.startLoop();
      this.setState({repeatColorLoop: true});
    }
  };

  render(){
    return (
      <div className="pageWrapper" style={{
        backgroundColor: `rgb(${this.state.currentColor.red}, ${this.state.currentColor.green}, ${this.state.currentColor.blue})`
      }}>
        <h2>rgb({this.state.currentColor.red}, {this.state.currentColor.green}, {this.state.currentColor.blue})</h2>
        <button onClick={this.startStopHandler}>Start / Stop</button>
      </div>
    );
  };
}

export default App;
