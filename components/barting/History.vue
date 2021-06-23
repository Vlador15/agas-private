<template>
  <v-data-table
    :headers="headers"
    :items="getBartsHistory"
    class="elevation-1"
    item-key="createdAt"
    sort-by="createdAt"
    sortDesc
    show-expand
    single-expand
    :expanded.sync="expanded"
    :loading="loading"
    :loading-text="$t('barting.loading')"
    locale="ru-RU"
    mobile-breakpoint="348"
    style="max-width: 500px; margin: 0 auto"
  >
    <template v-slot:[`item.type`]="{ item }">
      <v-chip :color="getColor(item.sender)" dark>
        {{ item.type }}
      </v-chip>
    </template>
    <template v-slot:[`item.amount`]="{ item }">
      {{ item.amount }}<v-icon small>{{ svg.btc }}</v-icon>
    </template>
    <template v-slot:[`item.createdAt`]="{ item }">
      {{ new Date(item.createdAt).toLocaleString() }}
    </template>
    <template v-slot:expanded-item="{ item }">
      <td class="text-center" colspan="3">
        <span class="font-weight-bold">{{ $t('barting.from') }}: </span>
        {{ item.sender }}
        <span class="font-weight-bold">{{ $t('barting.to') }}: </span>
        {{ item.recepientMail }}
        <br />
        <span class="font-weight-bold">{{ $t('barting.time') }}: </span
        >{{ new Date(item.createdAt).toLocaleString() }}
        <span class="font-weight-bold">{{ $t('barting.comment') }}: </span>
        {{ item.comment }}
      </td>
    </template>
  </v-data-table>
</template>

<script>
// VUEX
import { mapGetters } from 'vuex'

import { mdiCurrencyBtc } from '@mdi/js'

export default {
  props: {
    userCredentials: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      expanded: [],
      svg: {
        btc: mdiCurrencyBtc
      },
      loading: false
    }
  },
  computed: {
    headers() {
      return [
        { text: this.$t('barting.type'), value: 'type' },
        { text: this.$t('barting.sum'), value: 'amount' },
        { text: '', value: 'data-table-expand' }
        // { text: 'От', value: 'sender' },
        // { text: 'Кому', value: 'recepientMail' },
        // { text: 'Дата', value: 'createdAt', align: 'start' },
        // { text: 'Комментарий', value: 'comment' }
      ]
    },
    // history: {
    //   get() {
    //     if (!this.getBartsHistory) {
    //       return []
    //     }
    //     return this.getBartsHistory
    //   },
    //   set() {}
    // },
    ...mapGetters(['getBartsHistory', 'isAuthenticated'])
  },
  mounted() {
    this.fetchHistory()
  },
  methods: {
    getColor(sender) {
      if (sender === this.userCredentials.email) return 'orange'
      else return 'green'
    },
    async fetchHistory() {
      if (!this.isAuthenticated) {
        this.$router.push({ name: `login___${this.$i18n.locale}` })
      }
      if (this.getBartsHistory.length < 1) {
        this.loading = true
        this.history = await this.$store
          .dispatch('GET_BARTS_HISTORY')
          .then(() => {
            this.loading = false
          })
      }
    }
  }
}
</script>
