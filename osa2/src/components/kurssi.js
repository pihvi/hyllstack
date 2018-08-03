import React from 'react'

const Osa = (props) => <p>{props.osa} {props.tehtavia}</p>
const Otsikko = (props) => <h2>{props.kurssi.nimi}</h2>
const Sisalto = (props) => props.kurssi.osat.map(osa => <Osa osa={osa.nimi} tehtavia={osa.tehtavia}/>)
const Yhteensa = ({kurssi}) => <p>yhteensä {kurssi.osat.map(osa => osa.tehtavia).reduce((a, b) => a + b)} tehtävää</p>
const Kurssi = ({kurssi}) => [<Otsikko kurssi={kurssi}/>, <Sisalto kurssi={kurssi}/>, <Yhteensa kurssi={kurssi}/>]

export default Kurssi
