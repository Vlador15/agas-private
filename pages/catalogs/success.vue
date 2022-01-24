<template>
  <v-row justify="center" style="margin-top: 200px">
    <nuxt-link :to="localePath(`/`)" class="description">
      {{ $t('catalogs.successfulPay') }}
    </nuxt-link>
  </v-row>
</template>

<script>
// import payPal from '@/components/paypal/paypal.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'HelloWorld',
  components: {
    // payPal
  },
  data() {
    return {}
  },

  computed: {
    ...mapGetters(['getProducts'])
  },
  methods: {}
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
.description {
  background: rgba(105, 240, 106, 0.5098);
  padding: 2rem;
  font-size: 24px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 3px 3px 5px 0px #32323299;
}
.description:hover {
  background: #61ffda82;
}
</style>
