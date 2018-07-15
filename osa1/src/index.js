import React from 'react'
import ReactDOM from 'react-dom'

const Button = p => <button onClick={p.handleClick}>{p.name}</button>
const Statistic = ({text, val, perc}) => <div>{text}: {val * (perc ? 100 : 1)} {perc ? '%' : ''}</div>
const Statistics = ({state}) =>
  <div>
    <h1>Statistiikka</h1>
    {state.good || state.neutral || state.bad ? [
      <Statistic key='1' text='hyvä' val={state.good}/>,
      <Statistic key='2' text='neutraali' val={state.neutral}/>,
      <Statistic key='3' text='huono' val={state.bad}/>,
      <Statistic key='4' text='keskiarvo' val={(state.bad * -1 + state.good) / (state.bad + state.good + state.neutral)}/>,
      <Statistic key='5' text='positiivisia' perc={true} val={state.good / (state.bad + state.good + state.neutral)}/>,
    ] : <p>ei yhtään palautetta annettu</p>}
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

  increaseType = type => () => this.setState({[type]: this.state[type] + 1})

  render() {
    return <div>
      <h1>Anna palautetta</h1>
      <Button name='hyvä' handleClick={this.increaseType('good')}/>
      <Button name='neutraali' handleClick={this.increaseType('neutral')}/>
      <Button name='huono' handleClick={this.increaseType('bad')}/>
      <Statistics state={this.state}/>
    </div>
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))
