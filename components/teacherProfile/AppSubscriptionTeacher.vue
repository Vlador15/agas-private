<template>
  <div v-if="data">
    <v-row
      v-if="!data.subscription.status"
      cols="10"
      class="left relative my-8"
    >
      <h1 class="ma-8 inline-block">{{ $t('teacherProfile.subscription') }}</h1>

      <v-btn class="ma-9 inline-block" @click="buySub">
        {{ $t('teacherProfile.buy') }}
      </v-btn>
    </v-row>
    <v-row v-else cols="10" class="left relative ma-8">
      <h1 class="ma-2">{{ $t('teacherProfile.subscriptionBuy') }}</h1>
      <p class="ma-2">
        {{ $t('teacherProfile.subscriptionDataEnd') }}
        {{ data.subscription.timeText }}
      </p>
      <p class="ma-2">
        {{ $t('teacherProfile.viewPhone') }}
        {{ data.subscription.viewsPhone }}
      </p>
      <!-- <p class="ma-2">
        {{ $t('teacherProfile.freeReviews') }}
        <v-btn>{{ data.subscription.feedbacks }} </v-btn>
      </p> -->
    </v-row>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {
    // console.log(this.data.subscription)
  },
  methods: {
    buySub() {
      this.$router.push({
        name: `catalogs-catalogs___${this.$i18n.locale}`
      })
    }
  }
}
</script>
