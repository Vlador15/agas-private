import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import io from 'socket.io-client'
import store from '../store/state'

const socketInstance = io(process.env.LEARNING_API, {
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
