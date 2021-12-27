// import axios from 'axios'

// export default () => {
//   return axios.create({
//     baseURL: '/api/'
//   })
// }

export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    baseURL: `/api/`
  })
  inject('api', api)
}
