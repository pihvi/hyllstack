import React from 'react'
import ReactDOM from 'react-dom'

const Button = p => <button onClick={p.handleClick}>{p.name}</button>
const Statistics = ({state}) =>
  <div>
    <h1>Statistiikka</h1>
    <div>hyvä: {state.good}</div>
    <div>neutraali: {state.neutral}</div>
    <div>huono: {state.bad}</div>
    <div>keskiarvo: {(state.bad * -1 + state.good) / (state.bad + state.good + state.neutral)}</div>
    <div>positiivisia: {100 * state.good / (state.bad + state.good + state.neutral)}%</div>
  </div>


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
      <Statistics state={this.state}/>
    </div>
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))
