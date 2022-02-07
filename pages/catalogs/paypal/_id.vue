<template>
  <v-row
    v-if="!isLoading"
    justify="center"
    style="margin-top: 10px; padding: 0 0.5rem"
  >
    <v-card v-if="!error" class="mx-auto" width="400">
      <v-toolbar v-if="product.discountBool == false" color="#00825C" dark
        ><h2>
          {{ product.title }}
        </h2>
      </v-toolbar>
      <v-toolbar v-else color="#DC6D01" dark>
        <span class="rowHeader">
          <h2>{{ product.title }}</h2>
          <p v-if="product.discountBool" class="discount">
            {{ product.discount }}%
          </p>
        </span>
      </v-toolbar>

      <v-card-text>
        <h1 v-if="product.discountBool == true" class="card_text">
          <p class="oldPrice">
            <!-- Старая цена:  -->
            {{ product.price }}
            {{ product.currency_text }}
          </p>
          <p style="display: inline-block" class="price">
            <!-- Новая цена: -->
            {{
              Math.floor(
                product.price - (product.price / 100) * product.discount
              )
            }}
            {{ product.currency_text }}
          </p>
        </h1>

        <h1 v-else class="price">
          <p>
            <!-- Цена:  -->
            {{ product.price }}
            {{ product.currency_text }}
          </p>
        </h1>
        <h2 style="padding: 1rem 0">{{ product.time }}</h2>

        <h4 class="description">
          <p
            v-for="(item, j) in product.description.split(',')"
            :key="j"
            class="description__row"
          >
            <i>&#10003;</i> {{ item }}
          </p>
        </h4>
      </v-card-text>
      <div ref="paypal" class="btn_pay"></div>
    </v-card>
    <v-card v-else class="mx-auto errorMsg">
      <h2>{{ $t('notFound') }}</h2>
    </v-card>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HelloWorld',
  data() {
    return {
      isLoading: true,
      error: false,
      paidFor: false,
      product: {},
      products: []
    }
  },
  computed: {
    ...mapGetters(['getProducts']),
    currentRouteName() {
      return this.$route.name
    }
  },
  async mounted() {
    await this.$store.dispatch('GET_PRODUCTS')
    this.getProduct()
    this.isLoading = false
  },
  methods: {
    getProduct() {
      this.products = this.getProducts

      const ln = this.currentRouteName.substr(-2)
      const id = this.$route.params.id
      if (id) {
        try {
          const product = this.products.find(x => Number(id) === x.id)

          this.product = {
            title: product.title,
            time: product.time,
            description: product.description,
            id: product.id,
            discountBool: product.discountBool,
            discount: product.discount,
            ...product[ln]
          }
          if (this.product.discountBool) {
            this.product.summa = Math.floor(
              this.product.price -
                (this.product.price / 100) * this.product.discount
            )
          } else {
            this.product.summa = this.product.price
          }

          const script = document.createElement('script')
          script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.PAYPAL_CLIENT_ID}&currency=${this.product.currency}`
          script.addEventListener('load', this.setLoaded)
          document.body.appendChild(script)
          console.log(true)
        } catch (e) {
          console.log(e)
          this.error = true
        }
      }
    },

    setLoaded() {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  custom_id: this.product.id,
                  description: this.product.description,
                  amount: {
                    value: this.product.summa
                  }
                }
              ]
            })
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture()
            this.paidFor = true
            this.opa(order)

            this.$router.push({
              name: `catalogs-success___${this.currentRouteName.substr(-2)}`
            })
          },
          onError: err => {
            console.log(err)
          }
        })
        .render(this.$refs.paypal)
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
.oldPrice {
  text-decoration: line-through;
  font-size: 20px;
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
.price {
  margin-top: 1rem;
  color: #f00;
  font-size: 20px;
}
.description {
  font-size: 20px;
}
.errorMsg {
  padding: 1rem;
  background-color: #fff;
}
.discount {
  margin: 0;
  height: 100%;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #002a38;
  border-radius: 10px 0 10px 0;
}
.rowHeader {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  align-items: center;
}

.description__row {
  border-top: 1px solid #ccc;
  margin-bottom: 0;
  padding: 0.2rem 0;
  font-size: 16px;
}
</style>
