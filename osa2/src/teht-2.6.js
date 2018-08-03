import React from 'react';
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        {name: 'Arto Hellas'}
      ],
      newName: ''
    }
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={e => {
          e.preventDefault()
          this.setState({
            persons: this.state.persons.concat({name: this.state.newName}),
            newName: '',
          })
        }}>
          <div>
            nimi: <input value={this.state.newName} onChange={e => this.setState({
            newName: e.target.value
          })}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        {this.state.persons.map(p => <div key={p.name}>{p.name}</div>)}
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
