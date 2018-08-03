import React from 'react';
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        {name: 'Arto Hellas', num: '040-123456'},
        {name: 'Martti Tienari', num: '040-123456'},
        {name: 'Arto Järvinen', num: '040-123456'},
        {name: 'Lea Kutvonen', num: '040-123456'}
      ],
      newName: '',
      newNum: '',
      filter: ''
    }
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <div>
          rajaa nimellä: <input value={this.state.filter} onChange={e => this.setState({
          filter: e.target.value
        })}/>
        </div>

        <h2>Lisää uusi</h2>
        <form onSubmit={e => {
          e.preventDefault()
          const add = {name: this.state.newName, num: this.state.newNum}
          if (!this.state.persons.filter(x => x.name === add.name).length) {
            this.setState({
              persons: this.state.persons.concat(add),
              newName: '',
              newNum: ''
            })
          }
        }}>
          <div>
            nimi: <input value={this.state.newName} onChange={e => this.setState({
            newName: e.target.value
          })}/>
          </div>
          <div>
            numero: <input value={this.state.newNum} onChange={e => this.setState({
            newNum: e.target.value
          })}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        {this.state.persons
          .filter(p =>
            this.state.filter.trim() === '' ||
            p.name.toLowerCase().startsWith(this.state.filter.toLowerCase()))
          .map(p => <div key={p.name}>{p.name}: {p.num}</div>)}
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
