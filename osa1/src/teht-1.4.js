import React from 'react'
import ReactDOM from 'react-dom'

const Osa = p => <p>{p.osa} {p.tehtavia}</p>
const Otsikko = p => <h1>{p.kurssi}</h1>
const Sisalto = p =>
  <div>
    <Osa osa={p.osat[0].nimi} tehtavia={p.osat[0].tehtavia}/>
    <Osa osa={p.osat[1].nimi} tehtavia={p.osat[1].tehtavia}/>
    <Osa osa={p.osat[2].nimi} tehtavia={p.osat[2].tehtavia}/>
  </div>
const Yhteensa = p => <p>yhteensä {p.osat[0].tehtavia + p.osat[1].tehtavia + p.osat[2].tehtavia} tehtävää</p>

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osat = [
    {
      nimi: 'Reactin perusteet',
      tehtavia: 10
    },
    {
      nimi: 'Tiedonvälitys propseilla',
      tehtavia: 7
    },
    {
      nimi: 'Komponenttien tila',
      tehtavia: 14
    }
  ]
  return (
    <div>
      <Otsikko kurssi={kurssi}/>
      <Sisalto osat={osat}/>
      <Yhteensa osat={osat}/>
    </div>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
