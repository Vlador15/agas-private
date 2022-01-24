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
        <v-toolbar v-else color="#2fde55" dark>
          <h2>{{ product.title }}</h2>
          <p v-if="product.discountBool" class="discount">
            -{{ product.discount }}%
          </p>
        </v-toolbar>

        <v-card-text>
          <h1 v-if="!product.discountBool" class="card_text">
            <p style="display: inline-block">{{ product.price }}</p>
            <p style="display: inline-block">{{ product.currency }}</p>
          </h1>
          <h1 v-else class="card_text">
            <p>
              <span>
                {{
                  Math.floor(
                    product.price - (product.price / 100) * product.discount
                  )
                }}
                {{ product.currency }}
              </span>

              <span class="text">
                <span class="oldPrice">
                  {{ product.price }}
                </span>
                {{ product.currency }}
              </span>
            </p>
          </h1>

          <h2 style="padding: 1.5rem 4.5rem">{{ product.time }}</h2>

          <h4 class="description">
            {{ product.description }}
          </h4>
        </v-card-text>
        <v-card-actions class="justify-center">
          <nuxt-link
            class="buy"
            :to="{
              path: product.link,
              params: { data: product }
            }"
          >
            {{ $t('pay') }}
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
  middleware: 'auth',
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

      const ln = this.currentRouteName.substr(-2)
      this.products = this.getProducts.map(item => {
        return {
          currency: item[ln].currency,
          price: item[ln].price,
          title: item[ln].title,
          time: item[ln].time,
          description: item[ln].description,
          discountBool: item.discountBool,
          discount: item.discount,
          id: item.id,
          link: this.localePath(`/catalogs/paypal/${item.id}`)
        }
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
.oldPrice {
  text-decoration: line-through;
  display: inline-block;
  text-decoration-color: #ff00007a;
}
.price {
  font-size: 28px;
}
.text {
  font-size: 22px;
}
.discount {
  margin: 0;
  position: absolute;
  right: 0%;
  height: 100%;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #604ed3;
}
</style>
