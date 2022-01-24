// import axios from 'axios'

// export default () => {
//   return axios.create({
//     baseURL: '/apiSecond/'
//   })
// }

export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    baseURL: `${process.env.LEARNING_API}/api/`
  })
  inject('apiLearning', api)
}
