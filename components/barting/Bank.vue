<template>
  <v-card class="mt-3 mb-6">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="submit()"
    >
      <v-container>
        <v-row
          class="mt-0"
          justify="center"
          align="center"
          if="userCredentials"
        >
          <v-col class="pt-0">
            <span v-if="userCredentials" class="text-h6">
              {{ $t('barting.balance') }} - {{ userCredentials.bBalance }}
              <v-icon>{{ svg.btc }}</v-icon>
            </span>
          </v-col>
        </v-row>
        <v-row class="mb-0">
          <v-col cols="12" md="6" class="py-0">
            <v-text-field
              v-model.number="sumOut"
              outlined
              :rules="sumRulesOut"
              :label="$t('barting.sum')"
              required
              type="number"
              :prepend-inner-icon="svg.btc"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="py-0">
            <v-select
              v-model="period"
              outlined
              :prepend-inner-icon="svg.clock"
              :label="$t('barting.time')"
              :items="times"
            ></v-select>
          </v-col>
          <v-col class="py-0">
            <v-btn block large color="primary" type="submit">
              {{ $t('barting.deposit') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-form
      v-if="userCredentials.inBank"
      ref="form1"
      v-model="valid"
      class="mt-3"
      lazy-validation
      @submit.prevent="submit1()"
    >
      <v-container>
        <v-row v-if="userCredentials" justify="center" align="center">
          <v-col class="pt-0">
            <span class="text-h6">
              {{ $t('barting.bank') }} - {{ userCredentials.inBank }}
              <v-icon>{{ svg.btc }}</v-icon>
            </span>
            <span v-if="interestHistory" class="text-h6">
              {{ $t('barting.accrual') }} - {{ interestHistory }}
              <v-icon>{{ svg.btc }}</v-icon>
            </span>
          </v-col>
        </v-row>
        <v-row class="mb-0">
          <v-col cols="12" md="12" class="py-0">
            <v-text-field
              v-model.number="sumIn"
              outlined
              :rules="sumRulesIn"
              :label="$t('barting.sum')"
              required
              type="number"
              :prepend-inner-icon="svg.btc"
            ></v-text-field>
          </v-col>
          <v-col class="py-0">
            <v-btn block large color="primary" type="submit">
              {{ $t('barting.doWithdraw') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-dialog v-model="dialog" max-width="300">
      <v-card>
        <v-card-text>
          {{ $t('barting.deposit') }}
          <span class="text-h6 font-weight-bold">
            {{ sumOut }}<v-icon>{{ svg.btc }}</v-icon>
          </span>
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="primary darken-1" text @click="dialog = false">
            {{ $t('cancel') }}
          </v-btn>
          <v-btn
            color="red darken-1"
            dark
            :loading="loadingForm"
            @click="confirmOut"
          >
            {{ $t('barting.confirm') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog1" max-width="300">
      <v-card>
        <v-card-text>
          {{ $t('barting.withdraw') }}
          <span class="text-h6 font-weight-bold">
            {{ sumIn }}<v-icon>{{ svg.btc }}</v-icon>
          </span>
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="primary darken-1" text @click="dialog1 = false">
            {{ $t('cancel') }}
          </v-btn>
          <v-btn
            color="red darken-1"
            dark
            :loading="loadingForm"
            @click="confirmIn"
          >
            {{ $t('barting.confirm') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
// VUEX
import { mapGetters } from 'vuex'

import { mdiClock, mdiAccount, mdiCurrencyBtc, mdiComment } from '@mdi/js'

export default {
  props: {
    userCredentials: {
      type: Object,
      required: true
    },
    errors: {
      type: String,
      default: () => {
        return 'null'
      }
      // required: true
    }
  },
  data() {
    return {
      // times: ['Бессрочно', '1 месяц', '3 месяца', '6 месяцев', '1 год'],
      bBalance: 0,
      inBank: 0,
      dialog: false,
      dialog1: false,
      svg: {
        user: mdiAccount,
        btc: mdiCurrencyBtc,
        comment: mdiComment,
        clock: mdiClock
      },
      valid: false,
      sumOut: '',
      sumIn: '',
      comment: '',
      email: '',
      emailRules: [
        v => !!v || this.$t('barting.emailErr'),
        v => /.+@.+/.test(v) || this.$t('barting.emailIncorrect')
      ]
    }
  },
  computed: {
    times() {
      return [this.$t('barting.indf10')]
    },
    period() {
      return this.$t('barting.indf10')
    },
    ...mapGetters(['isAuthenticated', 'loadingForm', 'interestHistory']),
    sumRulesOut() {
      return [
        v => !!v || this.$t('barting.sumErr'),
        v => (v && Number(v) >= 10) || this.$t('barting.sumMinDepositErr'),
        v =>
          (!!v && Number(v) <= Number(this.userCredentials.bBalance)) ||
          this.$t('barting.noMoneyErr')
      ]
    },
    sumRulesIn() {
      return [
        v => !!v || this.$t('barting.sumErr'),
        v => (v && Number(v) >= 10) || this.$t('barting.sumMinWithdrawErr'),
        v =>
          (!!v && Number(v) <= Number(this.userCredentials.inBank)) ||
          this.$t('barting.sumDepositErr')
      ]
    },
    error() {
      if (this.errors) {
        if (this.errors === 'not_found') {
          return this.$t('barting.userNotfoundErr')
        } else if (this.errors === 'no_money') {
          return this.$t('barting.noMoneyErr')
        }
      }
      return null
    }
  },
  mounted() {
    this.fetchInterestHistory()
  },
  methods: {
    async fetchInterestHistory() {
      if (!this.isAuthenticated) {
        this.$router.push({ name: `login___${this.$i18n.locale}` })
      }
      if (!this.interestHistory) {
        this.loading = true
        this.history = await this.$store
          .dispatch('GET_BANKINTEREST_HISTORY')
          .then(() => {
            this.loading = false
          })
      }
    },
    // TODO
    // preventNaNtype(event) {
    //   if (event.keyCode < 48 || event.keyCode > 57) {
    //     if (event.keyCode !== 46 || event.keyCode !== 8) {
    //       console.log(event.keyCode);
    //       event.preventDefault()
    //     }
    //   }
    // },
    submit() {
      if (this.$refs.form.validate()) {
        this.dialog = true
      }
    },
    submit1() {
      if (this.$refs.form1.validate()) {
        this.dialog1 = true
      }
    },
    confirmOut() {
      const transaction = {
        amount: parseFloat(this.sumOut),
        period: this.period
      }

      this.$store.dispatch('INVEST_BARTS', transaction).then(() => {
        this.$refs.form.reset()
        this.dialog = false
      })
    },
    confirmIn() {
      const transaction = {
        amount: parseFloat(this.sumIn)
      }

      this.$store.dispatch('WITHDRAW_BARTS', transaction).then(() => {
        this.$refs.form1.reset()
        this.dialog1 = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep input[type='number'] {
  -moz-appearance: textfield;
}

::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
