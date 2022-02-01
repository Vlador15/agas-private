<template>
  <div class="container">
    <div class="messager">
      <div class="messager__header">
        <img
          src="https://www.actbuilders.org/wp-content/uploads/2014/01/avatar.png"
          alt="photo"
          width="50"
        />
        <p>{{ dialog.fullname }}</p>
      </div>

      <div class="messager__content">
        <div class="messager__chat chat">
          <div
            v-for="(message, i) in messages"
            :key="i"
            :class="{
              chat__right: message.fromMe,
              chat__left: !message.fromMe
            }"
          >
            <p class="message">{{ message.message }}</p>
          </div>
        </div>
      </div>

      <div class="messager__footer">
        <div class="messager__input">
          <textarea
            class="messager__text"
            type="text"
            placeholder="Введите сообщение"
          />
          <button @click="sendMessage()">{{ $t('chat.send') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HelloWorld',
  data() {
    return {
      loaded: false,
      paidFor: false,
      dialog: {
        fullname: '' // фио собеседника
      },
      messages: []
    }
  },
  sockets: {
    connect() {
      console.log('socket connected')
    },
    newMessage(data) {
      const chatId = this.$route.params.id
      console.log(data)
      if (data.senderId === chatId) {
        this.addMessage(data.message, false)
      }
    },
    getMessages({ messages, fullName }) {
      if (fullName) this.dialog.fullname = fullName
      if (messages.length) {
        messages.forEach(message =>
          this.addMessage(message.message, message.fromMe)
        )
      }
    }
  },
  computed: {
    ...mapGetters(['getProducts'])
  },
  mounted() {
    this.socketAuth()
  },
  methods: {
    autoScroll() {
      setTimeout(() => {
        this.$nuxt.$el.querySelector('.chat').scrollTop =
          this.$nuxt.$el.querySelector('.chat').scrollHeight
        document.querySelector('.messager__text').value = ''
      }, 100)
    },
    sendMessage() {
      // при приеме сообщений делать проверку на активный чат. Если id соответствует собеседнику, то пушим в массив
      const message = document.querySelector('.messager__text').value
      const token = localStorage.getItem('auth._token.local')
      const chatId = this.$route.params.id

      this.addMessage(message, true)
      this.$socket.emit('new_message', {
        message,
        token,
        chatId
      })
    },
    addMessage(message, fromMe) {
      this.messages = [
        ...this.messages,
        {
          message,
          fromMe
        }
      ]
      this.autoScroll()
    },
    socketAuth() {
      const token = localStorage.getItem('auth._token.local')
      const chatId = this.$route.params.id
      if (chatId) {
        this.$socket.emit('socketAuth', {
          chatId,
          token
        })
      }
    },

    async opa(order) {
      await this.$store.dispatch('PAYMENT_SUCCESS', { data: order })
    }
  }
}
</script>

<style lang="scss" scoped>
.btn_pay {
  margin-top: 5rem;
}
.product {
  width: 400px;
  background: #c2eee1;
  border-radius: 5px;
  padding: 1rem;
}
.container {
  display: flex;
  justify-content: center;
}
.messager {
  max-width: 1000px;
  width: 100%;
  background: #ccc;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 5px 0px #32323259;

  &__header {
    background: #fff;
    padding: 1rem;
    display: flex;
    align-items: center;
    border: 1px solid #cccccc;

    p {
      margin: 0 0 0 1rem;
      color: #00b0f0;
      font-size: 24px;
    }
  }

  &__content {
    background: #ddecff;
  }

  &__footer {
    border: 1px solid #cccccc;
    background: #fff;
    padding: 1rem 1rem;
  }

  &__input {
    border: 1px solid #e6e6e6;
    display: flex;

    button {
      background: #00b0f0;
      color: #fff;
      padding: 0.5rem 1rem;
      transition: all 0.3s ease;

      &:hover {
        background: #009df0;
      }
    }

    textarea {
      padding: 0.5rem 1rem;
      width: 100%;

      &:focus {
        outline: none;
      }
    }
  }
}
.chat {
  height: 550px;
  max-height: 550px;
  border-left: 1px solid #cccccc;
  border-right: 1px solid #cccccc;
  padding: 1rem 1rem;
  display: flex;
  flex-direction: column;
  overflow: auto;

  &__left {
    margin-bottom: 1rem;
    display: flex;
    justify-content: flex-start;

    p {
      background: #dccfff;
      display: inline-block;
      padding: 1rem 2rem 1rem 1rem;
      border-radius: 0 10px 10px 10px;
      font-size: 18px;
      max-width: 90%;
      word-break: break-word;
    }
  }
  &__right {
    margin-bottom: 1rem;
    display: flex;
    justify-content: flex-end;

    p {
      background: #6fd9ff;
      display: inline-block;
      padding: 1rem 2rem 1rem 1rem;
      border-radius: 10px 10px 0 10px;
      font-size: 18px;
      max-width: 90%;
      word-break: break-word;
    }
  }
}
</style>
