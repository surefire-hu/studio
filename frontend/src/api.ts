import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:1337/api', 
})

export const getMediaUrl = (path: string) => {
  if (!path) return ''
  if (path.startsWith('http')) return path
  return `http://localhost:1337${path}`
}

export default api
