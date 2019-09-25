import React from 'react';
import './styles/App.css';
import * as calcs from './scripts/generator';

interface Props {}

interface State {
  problem: string;
  answer: number;
  guess: string;
  score: number;
  gameStarted: boolean;
  gameEnded: boolean;
  totalAnswered: number;
  prompt: string;
};

class App extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      problem: '',
      answer: 0,
      guess: '',
      score: 0,
      gameStarted: false,
      gameEnded: false,
      totalAnswered: 0,
      prompt: '',
    };
  }

  generateNewProblem = () => {
    this.setState({ problem: calcs.generateMathsProblem(), guess: '' }, () => {
      this.setState(
        { answer: calcs.calculateProblem(this.state.problem) }
    )});
  }

  gameStarted = () => {
    this.generateNewProblem();
    this.startCountDown();
    this.setState({ gameStarted: true, gameEnded: false, score: 0, totalAnswered: 0})
  }

  endGame = () => {
    this.setState({ gameStarted: false, gameEnded: true });  
  }

  startCountDown = () => {
    let count = 60;
    const timer = () => {
      --count;
      console.log(count);
      if (count === 1) {
        clear();
        this.endGame();
      }
    }
    const clear = () => clearInterval(countdown);
    const countdown = setInterval(timer, 1000);
  }

  handleChange = (e: React.FormEvent) => {
    const target = e.target as HTMLSelectElement;
    const guess = target.value;
    const containsLetters = /\D/.test(guess);
    if (!containsLetters) {
      this.setState({ guess, prompt: '' });
    } else {
      this.setState({ prompt: 'Answer only in numbers!'})
    }
  }

  handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      const { answer, guess } = this.state;
      if (guess.length >= 1) {
        if (+answer === +guess) {
           this.setState({ score: this.state.score + 1});
        }
        this.setState({ totalAnswered: this.state.totalAnswered + 1, prompt: '' });
        this.generateNewProblem();
      } else {
        this.setState({ prompt: 'Make sure you answer each question!' })
      }
    }
  }

  render() {
    const { gameStarted, gameEnded, problem, guess, score, totalAnswered, prompt } = this.state;
    return (
       <div className="content">
       <h1>Quick Maths</h1>
       {!gameStarted ?  <p>Solve as many maths problems as you can before the timer runs out!</p> :
        <>
          <p>Get solving!</p>
          <p className="problem">{problem}</p>
          <input value={guess} onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
          <p className="prompt">{prompt}</p>
        </>
       }
       {gameEnded && <p>Times up! You scored {score} out of {totalAnswered} - nice job!</p>}
       {!gameStarted && <button onClick={this.gameStarted}>Start</button> }
       </div>
    );
  }
}

export default App;
