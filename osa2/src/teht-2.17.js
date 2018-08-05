import React from 'react';
import ReactDOM from 'react-dom'
import pb from './services/phonebook.js'

const Numbers = ({state}) => [
  <h2 key={'Numerot title'}>Numerot</h2>,
  state.persons
    .filter(p =>
      state.filter.trim() === '' || p.name.toLowerCase().startsWith(state.filter.toLowerCase()))
    .map(p => <div key={p.name}>{p.name}: {p.num}
      <button onClick={
        () => window.confirm('Poistetaanko ' + p.name + '?') ? pb.delete(p.id).then(() => window.location.reload()) : ''
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
    } else {
      const hit = tissi.state.persons.filter(x => x.name === add.name)[0]
      hit.num = add.num
      tissi.setState({
        persons: tissi.state.persons,
        newName: '',
        newNum: ''
      })
      pb.update(hit)
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


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNum: '',
      filter: ''
    }
  }

  componentDidMount() {
    pb.getAll().then(res => this.setState({persons: res.data}))
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Filter tissi={this}/>
        <Addform tissi={this}/>
        <Numbers state={this.state}/>
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
