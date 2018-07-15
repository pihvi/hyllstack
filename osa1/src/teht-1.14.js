import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: rand(),
      votes: Array(props.anecdotes.length).fill(0),
      max: 0
    }
  }

  render() {
    return (
      <div>
        {this.props.anecdotes[this.state.selected]}
        <br/>
        <br/>
        has {this.state.votes[this.state.selected] || 0} votes
        <br/>
        <br/>
        <button onClick={() => this.setState(vote(this.state))}>vote</button>
        <button onClick={() => this.setState({selected: rand()})}>next</button>
        <h3>most votes:{this.state.max}</h3>
        {this.props.anecdotes[this.state.max]}
        <br/>
        <br/>
        with {this.state.votes[this.state.max]} votes
      </div>
    )
  }
}

const vote = state => {
  const votes = [...state.votes]
  votes[state.selected] += 1
  return {
    votes,
    max: votes.indexOf(Math.max(...votes))
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const rand = () => parseInt(Math.random() * anecdotes.length, 10)

ReactDOM.render(
  <App anecdotes={anecdotes}/>,
  document.getElementById('root')
)
