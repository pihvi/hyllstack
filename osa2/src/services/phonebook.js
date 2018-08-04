import axios from 'axios';

const add = entry => axios.post('http://localhost:3001/persons', entry)
const getAll = () => axios.get('http://localhost:3001/persons')

export default {add, getAll}
