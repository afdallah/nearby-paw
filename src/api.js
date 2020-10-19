import axios from 'axios'
const BASE_URL = process.env.REACT_APP_API_BASE_URL

export default axios.create({
  baseURL: 'https://pet-matcher.herokuapp.com/api/v1',
  headers: {
    'content-type': 'application/json'
  },
})