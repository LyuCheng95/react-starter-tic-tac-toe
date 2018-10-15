import React from 'react';
import './index.css';
import Board from './Board';
import Stoper from './Stoper';
import StarterButton from './StarterButton';
import StopButton from './StopButton';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      isGameStarted: false,
      displayStep: 0,
    };
  }

  clearHistory() {
    this.setState({ 
      history: [{
        squares: Array(9).fill(null),
      }],
    });
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  jumpTo(stepNumber) {
    this.setState({displayStep: this.state.stepNumber});
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length-1];
    const squares = current.squares.slice();
    if (this.calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext? 'X': 'O';
    this.setState({
                    history: history.concat([{
                      squares: squares,
                    }]),
                    xIsNext: !this.state.xIsNext,
                  });
  }

  toggleIsGameStarted() {
    this.setState({
      isGameStarted: !this.state.isGameStarted }) 
  }

  handleStopButton() {
    this.toggleIsGameStarted();
    this.clearHistory(); 
  }
 
  renderStartButton() {
    return (
      <StarterButton
        onClick = { () => this.toggleIsGameStarted() }
      />
    );
  }

  renderStopButton() {
    return (
      <StopButton
        onClick = { () => this.handleStopButton() }
      />
    );
  }
  renderGame() {
    const history = this.state.history;
    const current = history[history.length-1];
    const squares = current.squares;
    const winner = this.calculateWinner(squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <Stoper
          xIsNext={ this.state.xIsNext }
        />
        <div className="game-board">
          <Board 
            squares = { squares }
            handleClick = { (i) => this.handleClick(i) }
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
        </div>
        <div>
          { this.renderStopButton() }
        </div>
      </div>
    );
  }

  render() {
    console.log(this.state.isGameStarted)
    return (
      <div>
        {this.state.isGameStarted ? this.renderGame() : this.renderStartButton()} 
      </div>
    );
  }
}

export default Game;