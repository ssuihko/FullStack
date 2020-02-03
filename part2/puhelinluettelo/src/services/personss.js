import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

  
const update = (id, name, number) => {
  const request = axios.put(`${baseUrl}/${id}`,name, number)
  return request.then(response => response.data)
}
  
const del = (id, name, updateDB) => {
    if (window.confirm('Delete ' + name + '?')) {
    const request = axios.delete(baseUrl.concat('/', id))
    return request.then(response => response.data)
    .then(updateDB)
    

  }}

  export default { 
    getAll: getAll, 
    create: create,
    update: update,
    del: del
  }