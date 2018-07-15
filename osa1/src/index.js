import React from 'react'
import ReactDOM from 'react-dom'

const Button = p => <button onClick={p.handleClick}>{p.name}</button>


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
    return <div>
      <h1>Anna palautetta</h1>
      <Button name='hyvä' handleClick={() => this.setState({good: this.state.good + 1})}/>
      <Button name='neutraali' handleClick={() => this.setState({neutral: this.state.neutral + 1})}/>
      <Button name='huono' handleClick={() => this.setState({bad: this.state.bad + 1})}/>
      <h1>Statistiikka</h1>
      <div>hyvä: {this.state.good}</div>
      <div>neutraali: {this.state.neutral}</div>
      <div>huono: {this.state.bad}</div>
      <div>keskiarvo: {(this.state.bad * -1 + this.state.good) / (this.state.bad + this.state.good + this.state.neutral)}</div>
      <div>positiivisia: {100 * this.state.good / (this.state.bad + this.state.good + this.state.neutral)}%</div>
    </div>
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))
