import React from 'react'
import ReactDOM from 'react-dom'

const Osa = p => <p>{p.osa} {p.tehtavia}</p>
const Otsikko = p => <h1>{p.kurssi}</h1>
const Sisalto = p =>
  <div>
    <Osa osa={p.osa1} tehtavia={p.tehtavia1}/>
    <Osa osa={p.osa2} tehtavia={p.tehtavia2}/>
    <Osa osa={p.osa3} tehtavia={p.tehtavia3}/>
  </div>
const Yhteensa = p => <p>yhteensä {p.tehtavia1 + p.tehtavia2 + p.tehtavia3} tehtävää</p>

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osa1 = 'Reactin perusteet'
  const tehtavia1 = 10
  const osa2 = 'Tiedonvälitys propseilla'
  const tehtavia2 = 7
  const osa3 = 'Komponenttien tila'
  const tehtavia3 = 14

  return (
    <div>
      <Otsikko kurssi={kurssi}/>
      <Sisalto osa1={osa1} osa3={osa3} osa2={osa2} tehtavia1={tehtavia1} tehtavia2={tehtavia2} tehtavia3={tehtavia3}/>
      <Yhteensa tehtavia1={tehtavia1} tehtavia2={tehtavia2} tehtavia3={tehtavia3}/>
    </div>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
