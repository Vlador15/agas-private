<template>
  <v-row justify="center" style="margin-top: 1rem">
    <v-col cols="12" md="8">
      <v-card>
        <v-form ref="form" lazy-validation>
          <h1 class="pa-6 ml-2 center">{{ $t('chat.yourDialogs') }}</h1>

          <div v-for="(dialog, i) in dialogs" :key="i" class="dialog">
            <img
              src="https://www.actbuilders.org/wp-content/uploads/2014/01/avatar.png"
              alt="photo"
              width="50"
            />
            <nuxt-link
              class="fullname"
              :to="{
                path: `/ru/messager/dialog/${dialog.uid}`
              }"
            >
              <p>{{ dialog.fullName }}</p>
            </nuxt-link>
          </div>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
// import payPal from '@/components/paypal/paypal.vue'

export default {
  middleware: 'auth',
  name: 'HelloWorld',
  components: {},
  data() {
    return {
      dialogs: []
    }
  },

  sockets: {
    connect() {
      console.log('socket connected')
    },
    getDialogs({ dialogs }) {
      if (dialogs.length) {
        this.dialogs = dialogs
      }
      console.log(this.dialogs)
    }
  },

  computed: {},
  mounted() {
    this.getDialogs()
  },
  methods: {
    getDialogs() {
      const token = localStorage.getItem('auth._token.local')
      this.$socket.emit('get_dialogs', {
        token
      })
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
  margin: 1rem;
  box-shadow: 1px 1px 5px 0px rgb(50 50 50 / 75%);
}
.container {
  display: flex;
  justify-content: center;
}
.dialog {
  border-top: 1px solid #ccc;
  padding: 1rem;
  transition: all 0.3s ease;
  display: flex;

  &:hover {
    background: #e8eaff;
  }
}
.fullname {
  display: flex;
  align-items: center;
  p {
    margin: 0 0 0 1rem;
    font-size: 20px;
  }
}
</style>
