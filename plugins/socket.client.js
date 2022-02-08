import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import io from 'socket.io-client'
import store from '../store/state'

// const isProxy = process.env.PROXY.match(/[^/{1}]*$/gm)[0]
// const proxy = process.env.PROXY
// const path = proxy ? `${proxy}/socket.io/` : `/socket.io`

// const url = proxy
//   ? process.env.LEARNING_API.replace(`${proxy}`, '')
//   : `${process.env.LEARNING_API}`

const socketInstance = io(process.env.LEARNING_API, {
  path: `/apiLearning/socket.io/`,
  query: {},
  rejectUnauthorized: false,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 15
})

// { store } store
export default () => {
  Vue.use(
    new VueSocketIO({
      debug: false,
      connection: socketInstance,
      store,
      vuex: {
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
      }
    })
  )
}
