import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_SERVER_URL as string,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
