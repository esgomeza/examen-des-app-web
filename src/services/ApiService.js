import axios from 'axios'

const API = 'https://6a248d41420469ff067b202d.mockapi.io'

export default {
  getProductos() {
    return axios.get(`${API}/productos`)
  },
  crearProducto(data) {
    return axios.post(`${API}/productos`, data)
  },
  editarProducto(id, data) {
    return axios.put(`${API}/productos/${id}`, data)
  },
  eliminarProducto(id) {
    return axios.delete(`${API}/productos/${id}`)
  },

  getUsuarios() {
    return axios.get(`${API}/usuarios`)
  },
  crearUsuario(data) {
    return axios.post(`${API}/usuarios`, data)
  },
  editarUsuario(id, data) {
    return axios.put(`${API}/usuarios/${id}`, data)
  },
  eliminarUsuario(id) {
    return axios.delete(`${API}/usuarios/${id}`)
  }
}