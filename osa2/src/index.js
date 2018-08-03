import React from 'react'
import ReactDOM from 'react-dom'

const Osa = (props) => <p>{props.osa} {props.tehtavia}</p>
const Otsikko = (props) => <h2>{props.kurssi.nimi}</h2>
const Sisalto = (props) => props.kurssi.osat.map(osa => <Osa osa={osa.nimi} tehtavia={osa.tehtavia}/>)
const Kurssi = ({kurssi}) => [<Otsikko kurssi={kurssi}/>, <Sisalto kurssi={kurssi}/>]
const Yhteensa = ({kurssi}) => <p>yhteensä {kurssi.osat.map(osa => osa.tehtavia).reduce((a, b) => a + b)} tehtävää</p>

const App = () => {
  const kurssit = [{
    nimi: 'Half Stack -sovelluskehitys',
    id: 1,
    osat: [{
      nimi: 'Reactin perusteet',
      tehtavia: 10,
      id: 1
    }, {
      nimi: 'Tiedonvälitys propseilla',
      tehtavia: 7,
      id: 2
    }, {
      nimi: 'Komponenttien tila',
      tehtavia: 14,
      id: 3
    }]
  }, {
    nimi: 'Node.js',
    id: 2,
    osat: [{
      nimi: 'Routing',
      tehtavia: 3,
      id: 1
    }, {
      nimi: 'Middlewaret',
      tehtavia: 7,
      id: 2
    }]
  }]

  return (
    <div>
      <h1>Opetusohjelma</h1>
      {kurssit.map(k => [<Kurssi kurssi={k}/>, <Yhteensa kurssi={k}/>])}
    </div>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
