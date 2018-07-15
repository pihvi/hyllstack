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
  const osa1 = {
    nimi: 'Reactin perusteet',
    tehtavia: 10
  }
  const osa2 = {
    nimi: 'Tiedonvälitys propseilla',
    tehtavia: 7
  }
  const osa3 = {
    nimi: 'Komponenttien tila',
    tehtavia: 14
  }
  return (
    <div>
      <Otsikko kurssi={kurssi}/>
      <Sisalto osa1={osa1.nimi} osa3={osa3.nimi} osa2={osa2.nimi} tehtavia1={osa1.tehtavia} tehtavia2={osa2.tehtavia} tehtavia3={osa3.tehtavia}/>
      <Yhteensa tehtavia1={osa1.tehtavia} tehtavia2={osa2.tehtavia} tehtavia3={osa3.tehtavia}/>
    </div>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
