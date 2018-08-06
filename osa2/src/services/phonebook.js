import axios from 'axios';

const base = 'http://localhost:3001/api'

const add = entry => axios.post(base + '/persons', entry)
const del = id => axios.delete(base + '/persons/' + id)
const update = entry => {
  axios
    .put(base + '/persons/' + entry.id, entry)
    .catch(() => {
      add(entry)
    })
}
const getAll = () => axios.get(base + '/persons')

export default {add, getAll, delete: del, update}
