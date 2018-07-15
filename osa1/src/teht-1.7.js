import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      good: 0,
      neutral: 0,
      bad: 0
    }
  }

  render() {
    return (
      <div>
        <h1>Anna palautetta</h1>
        <button onClick={() => this.setState({good: this.state.good + 1})}>hyvä</button>
        <button onClick={() => this.setState({neutral: this.state.neutral + 1})}>neutraali</button>
        <button onClick={() => this.setState({bad: this.state.bad + 1})}>huono</button>
        <h1>Statistiikka</h1>
        <div>hyvä: {this.state.good}</div>
        <div>neutraali: {this.state.neutral}</div>
        <div>huono: {this.state.bad}</div>
        <div>keskiarvo: {(this.state.bad * -1 + this.state.good) / (this.state.bad + this.state.good + this.state.neutral)}</div>
        <div>positiivisia: {100 * this.state.good / (this.state.bad + this.state.good + this.state.neutral)}%</div>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))
