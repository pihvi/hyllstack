import React from 'react'
import ReactDOM from 'react-dom'

const Osa = (props) => <p>{props.osa} {props.tehtavia}</p>
const Otsikko = (props) => <h1>{props.kurssi.nimi}</h1>
const Sisalto = (props) => props.kurssi.osat.map(osa => <Osa osa={osa.nimi} tehtavia={osa.tehtavia}/>)
const Kurssi = ({kurssi}) => [<Otsikko kurssi={kurssi}/>, <Sisalto kurssi={kurssi}/>]
const Yhteensa = ({kurssi}) => <p>yhteensä {kurssi.osat.map(osa => osa.tehtavia).reduce((a, b) => a + b)} tehtävää</p>

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10,
        id: 1
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7,
        id: 2
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Kurssi kurssi={kurssi}/>
      <Yhteensa kurssi={kurssi}/>
    </div>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
