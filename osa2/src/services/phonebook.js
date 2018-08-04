import axios from 'axios';

const add = entry => axios.post('http://localhost:3001/persons', entry)
const del = id => axios.delete('http://localhost:3001/persons/' + id)
const update = entry => axios.put('http://localhost:3001/persons/' + entry.id, entry)
const getAll = () => axios.get('http://localhost:3001/persons')

export default {add, getAll, delete: del, update}
