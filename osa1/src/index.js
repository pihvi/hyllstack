import React from 'react'
import ReactDOM from 'react-dom'

const Button = p => <button onClick={p.handleClick}>{p.name}</button>
const Statistic = ({text, val, perc}) => <div>{text}: {val * (perc ? 100 : 0)} {perc ? '%' : ''}</div>
const Statistics = ({state}) =>
  <div>
    <h1>Statistiikka</h1>
    <Statistic text='hyvä' val={state.good} perc={false}/>
    <Statistic text='neutraali' val={state.neutral}/>
    <Statistic text='huono' val={state.bad}/>
    <Statistic text='keskiarvo' val={(state.bad * -1 + state.good) / (state.bad + state.good + state.neutral)}/>
    <Statistic text='positiivisia' perc={true} val={state.good / (state.bad + state.good + state.neutral)}/>
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
