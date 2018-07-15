import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = p => <h1>{p.kurssi}</h1>
const Sisalto = p => [
  <p>{p.osa1} {p.tehtavia1}</p>,
  <p>{p.osa2} {p.tehtavia2}</p>,
  <p>{p.osa3} {p.tehtavia3}</p>]
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
      <Sisalto osa1={osa1} osa3={osa3} osa2={osa2} tehtavia1={tehtavia1}/>
      <Yhteensa/>
    </div>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
