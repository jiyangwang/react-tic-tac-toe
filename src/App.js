import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      winner: '',
      winnerWords: '',
    };
    this.gameState = {
      turn: 'X',
      gameLocked: false,
      gameEnded: false,
      board: Array(9).fill(''),
      totalMoves: 0,
    }
  }

  clicked(cell) {
    if (this.gameState.gameEnded || this.gameState.gameLocked) {
      return;
    }
    if (this.gameState.board[cell.dataset.square] === '') {
      this.gameState.board[cell.dataset.square] = this.gameState.turn;
      cell.innerText = this.gameState.turn;
      if (this.gameState.turn === 'X') {
        this.gameState.turn = 'O';
       } else {
        this.gameState.turn = 'X';
      }
      this.gameState.totalMoves++;
    }

    var result = this.checkWinner();

    if (result === 'X') {
      this.gameState.gameEnded = true;
      this.setState({
        winner: 'X',
        winnerWords: 'Match won by X'
      });
    } else if (result === 'O') {
      this.gameState.gameEnded = true;
      this.setState({
        winner: 'O',
        winnerWords: 'Match won by O'
      });
    } else if (result === 'draw') {
      this.gameState.gameEnded = true;
      this.setState({
        winner: 'draw',
        winnerWords: 'Match is drawn'
      })
    }

    if (this.gameState.turn === 'O' && !this.gameState.gameEnded) {
      this.gameState.gameLocked = true;
      setTimeout(() => {
        do {
          var random = Math.floor(Math.random() * 9);
        } while (this.gameState.board[random] !== '');
        this.gameState.gameLocked = false;
        this.clicked(document.querySelectorAll('.square')[random]);
      }, 1000);
    }
  }

  checkWinner() {
    var win = [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    var board = this.gameState.board;
    for (let i = 0; i < win.length; i++) {
      if (board[win[i][0]] === board[win[i][1]] && board[win[i][1]] === board[win[i][2]]) {
        return board[win[i][0]];
      }
    }
    if (this.gameState.totalMoves === 9) {
      return 'draw';
    }
  }

  render() {
    return (
      <div id="game">
        <div id="head">Tic Tac Toe</div>
        <div id="status">{this.state.winnerWords}</div>
        <div id="board" onClick={e => this.clicked(e.target)}>
          <div className="square" data-square="0"></div>
          <div className="square" data-square="1"></div>
          <div className="square" data-square="2"></div>
          <div className="square" data-square="3"></div>
          <div className="square" data-square="4"></div>
          <div className="square" data-square="5"></div>
          <div className="square" data-square="6"></div>
          <div className="square" data-square="7"></div>
          <div className="square" data-square="8"></div>
        </div>
      </div>
    );
  }
}

export default App;
