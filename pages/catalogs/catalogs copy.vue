<template>
  <v-row v-if="!isLoading" justify="center" style="margin-top: 10px">
    <div v-for="(product, i) in products" :key="i" class="product">
      <!-- <h1>{{ product.title }}</h1>
      <p class="price">Цена: ${{ product.price }}</p> -->

      <!-- <payPal :data="product"> </payPal> -->

      <v-card height="400" class="mx-auto">
        <v-toolbar v-if="product.discountBool == false" color="#5a88b0" dark
          ><h2>
            {{ product.title }}
          </h2>
        </v-toolbar>
        <v-toolbar v-else color="#2fde55" dark
          ><h2>{{ product.title }}</h2>
        </v-toolbar>

        <v-card-text>
          <h1
            v-if="
              product.discountBool == true &&
              currentRouteName.substr(-2) === 'ru'
            "
            class="card_text"
          >
            <!-- <p class="oldPrice">{{ product.oldPrice }} шек.</p> -->
            <p style="display: inline-block">{{ product.price.ru.value }}</p>
            <p style="display: inline-block">{{ product.price.ru.currency }}</p>
          </h1>

          <h1
            v-if="
              product.discountBool == false &&
              currentRouteName.substr(-2) === 'ru'
            "
            class="price"
          >
            <!-- <p class="oldPrice">{{ product.oldPrice }} шек.</p> -->
            <p style="display: inline-block">{{ product.price.ru.value }}</p>
            <p style="display: inline-block">{{ product.price.ru.currency }}</p>
          </h1>

          <h1
            v-if="
              product.discountBool == true &&
              currentRouteName.substr(-2) === 'he'
            "
            class="card_text"
          >
            <!-- <p class="oldPrice">{{ product.oldPrice }} шек.</p> -->
            <p style="display: inline-block">{{ product.price.he.value }}</p>
            <p style="display: inline-block">{{ product.price.he.currency }}</p>
          </h1>

          <h1
            v-if="
              product.discountBool == false &&
              currentRouteName.substr(-2) === 'he'
            "
            class="price"
          >
            <!-- <p class="oldPrice">{{ product.oldPrice }} шек.</p> -->
            <p style="display: inline-block">{{ product.price.he.value }}</p>
            <p style="display: inline-block">{{ product.price.he.currency }}</p>
          </h1>

          <!-- <h1 v-else class="price">
            <p style="margin-left: 50px">{{ product.price }} шек.</p>
          </h1> -->
          <h2 style="padding: 1.5rem 4.5rem">{{ product.time }}</h2>

          <h4 class="description">
            {{ product.description }}
          </h4>
        </v-card-text>
        <v-card-actions class="justify-center">
          <nuxt-link
            class="buy"
            :to="{
              path: `/ru/catalogs/paypal/${product.id}`,
              params: { data: product }
            }"
          >
            Оплатить
          </nuxt-link>
        </v-card-actions>
      </v-card>
    </div>
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
    return {
      products: {},
      isLoading: true
    }
  },

  computed: {
    ...mapGetters(['getProducts']),
    currentRouteName() {
      return this.$route.name
    }
  },
  async mounted() {
    // await this.$store.dispatch('GET_PRODUCTS')
    // console.log(this.getProducts)
    await this.loadProducts()
    this.isLoading = false
  },
  methods: {
    async loadProducts() {
      await this.$store.dispatch('GET_PRODUCTS')
      console.log(this.getProducts)

      this.products = this.getProducts.map(item => {
        item.currency = item.price[this.currentRouteName.substr(-2)].currency
        item.value = item.price[this.currentRouteName.substr(-2)].value
        return item
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.card_text {
  padding: 0rem 0.6rem;
  margin-top: 20px;
}
.oldPrice {
  text-decoration: line-through;
  display: inline-block;
}
.product {
  width: 300px;
  border-radius: 5px;
  margin: 1rem;
}
.price {
  padding: 0rem 0.6rem;
  margin-top: 20px;
}
.description {
  font-size: 15px;
  padding: 0.5rem 0.8rem;
}
.buy {
  font-size: 20px;
  padding: 1.2rem 2rem;
  background: linear-gradient(#a247d1, #3453d5);
  color: #fff;
  border-radius: 5px;
  &:hover {
    background: linear-gradient(#3453d5, #a247d1);
  }
}
</style>
