import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => this.setState({countries: res.data}))
  }

  render() {
    const cons = this.state.countries
      .filter(p =>
        this.state.filter.trim() === '' || p.name.toLowerCase().indexOf(this.state.filter.toLowerCase()) >= 0)
    return (
      <div>
        <p>
          find countries:
          <input value={this.state.filter} onChange={e => this.setState({
            filter: e.target.value
          })}/>
        </p>
        {cons.length === 1 ? cons.map(c => <div key={c.name}>
          <h1>{c.name}</h1>
          <p>capital: {c.capital}</p>
          <p>population: {c.population}</p>
          <p><img width={200} src={c.flag} alt={c.name}/></p>
        </div>) : ''}
        {cons.length > 10 ? <div>too many matches ({cons.length}), specify a filter</div> : ''}
        {cons.length > 1 && cons.length <= 10 ? cons.map(c => <div key={c.name}>{c.name}</div>) : ''}
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
