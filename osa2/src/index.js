import React from 'react';
import ReactDOM from 'react-dom'
import pb from './services/phonebook.js'
import './index.css'

function notsku(tis, msg) {
  tis.setState({notsku: msg})
  setTimeout(() => tis.setState({notsku: ''}), 2000)
}

function del(tis, person) {
  pb.delete(person.id).then(() => {
    notsku(tis, 'Poistettu ' + person.name)
    tis.setState({
      persons: tis.state.persons.filter(p => p.name !== person.name)
    })
  })
}

const Numbers = ({state, tissi}) => [
  <h2 key={'Numerot title'}>Numerot</h2>,
  state.persons
    .filter(p =>
      state.filter.trim() === '' || p.name.toLowerCase().startsWith(state.filter.toLowerCase()))
    .map(p => <div key={p.name}>{p.name}: {p.num}
      <button onClick={
        () => window.confirm('Poistetaanko ' + p.name + '?') ? del(tissi, p) : ''
      }>poista
      </button>
    </div>)]

const Addform = ({tissi}) => [
  <h2 key={'Add title'}>Lisää uusi</h2>,
  <form key={'addform'} onSubmit={e => {
    e.preventDefault()
    const add = {name: tissi.state.newName, num: tissi.state.newNum}
    if (!tissi.state.persons.filter(x => x.name === add.name).length) {
      const updated = tissi.state.persons.concat(add)
      tissi.setState({
        persons: updated,
        newName: '',
        newNum: ''
      })
      pb.add(add)
      notsku(tissi, 'Lisätty ' + add.name)
    } else {
      const hit = tissi.state.persons.filter(x => x.name === add.name)[0]
      hit.num = add.num
      tissi.setState({
        persons: tissi.state.persons,
        newName: '',
        newNum: ''
      })
      pb.update(hit)
      notsku(tissi, 'Päivitetty ' + hit.name)
    }
  }}>
    <div>
      nimi: <input value={tissi.state.newName} onChange={e => tissi.setState({
      newName: e.target.value
    })}/>
    </div>
    <div>
      numero: <input value={tissi.state.newNum} onChange={e => tissi.setState({
      newNum: e.target.value
    })}/>
    </div>
    <div>
      <button type="submit">lisää</button>
    </div>
  </form>]

const Filter = ({tissi}) => <div>
  rajaa nimellä: <input value={tissi.state.filter} onChange={e => tissi.setState({
  filter: e.target.value
})}/></div>

const Notsku = ({tissi}) => {
  if (tissi.state.notsku === '') return <div></div>
  else return <div className="success">{tissi.state.notsku}</div>
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNum: '',
      notsku: '',
      filter: ''
    }
  }

  componentDidMount() {
    pb.getAll().then(res => this.setState({persons: res.data}))
  }

  render() {
    return (
      <div>
        <Notsku tissi={this}/>
        <h2>Puhelinluettelo</h2>
        <Filter tissi={this}/>
        <Addform tissi={this}/>
        <Numbers tissi={this} state={this.state}/>
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
