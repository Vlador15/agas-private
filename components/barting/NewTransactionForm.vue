<template>
  <v-card class="mt-3 mb-6">
    <v-card-title v-if="userCredentials" class="text-center">
      {{ $t('barting.balance') }} - {{ userCredentials.bBalance }}
      <v-icon>{{ svg.btc }}</v-icon>
    </v-card-title>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="submit()"
    >
      <v-container>
        <v-row class="mb-0">
          <v-col cols="12" md="6" class="py-0">
            <v-text-field
              v-model="email"
              outlined
              :rules="emailRules"
              :label="`${$t('barting.to')} (E-mail)`"
              required
              :prepend-inner-icon="svg.user"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="py-0">
            <v-text-field
              v-model.number="sum"
              outlined
              :rules="sumRules"
              :label="$t('barting.sum')"
              required
              type="number"
              :prepend-inner-icon="svg.btc"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="py-0">
            <v-textarea
              v-model="comment"
              rows="1"
              outlined
              :label="$t('barting.comment')"
              :prepend-inner-icon="svg.comment"
            ></v-textarea>
          </v-col>
          <v-col
            v-if="error"
            cols="12"
            class="subtitle1 text-center red--text py-0 mt-n3"
          >
            <p>{{ error }}</p>
          </v-col>
          <v-col class="py-0">
            <v-btn
              block
              large
              color="primary"
              type="submit"
              :disabled="loadingForm"
              :loading="loadingForm"
              >{{ $t('barting.transferTo') }}</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-dialog v-model="dialog" max-width="300">
      <v-card>
        <v-card-text>
          {{ $t('barting.transfer') }}
          <span class="text-h6 font-weight-bold">
            {{ sum }}<v-icon>{{ svg.btc }}</v-icon>
          </span>
          <br />
          {{ $t('barting.user') }}
          <span class="text-h6 font-weight-bold">{{ email }}</span>
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="primary darken-1" text @click="dialog = false">
            {{ $t('cancel') }}
          </v-btn>
          <v-btn color="red darken-1" dark @click="send()">
            {{ $t('barting.transferTo') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
// VUEX
import { mapGetters } from 'vuex'

import { mdiAccount, mdiCurrencyBtc, mdiComment } from '@mdi/js'

export default {
  props: {
    userCredentials: {
      type: Object,
      required: true
    },
    errors: {
      // required: true,
      default: () => {
        return 'null'
      },
      type: String
    }
  },
  data() {
    return {
      dialog: false,
      svg: {
        user: mdiAccount,
        btc: mdiCurrencyBtc,
        comment: mdiComment
      },
      valid: false,
      firstname: '',
      sum: '',
      comment: '',
      email: '',
      emailRules: [
        v => !!v || this.$t('barting.emailErr'),
        v => /.+@.+/.test(v) || this.$t('barting.emailIncorrect')
      ],
      bBalance: 0
    }
  },
  computed: {
    ...mapGetters([
      'isAuthenticated',
      // 'userCredentials',
      'loadingForm'
      // 'errors'
    ]),
    sumRules() {
      return [
        v => !!v || this.$t('barting.sumErr'),
        v =>
          (v && Number(v) >= 10) || this.$t('barting.transactSumMinValueErr'),
        v =>
          (!!v && Number(v) <= Number(this.userCredentials.bBalance)) ||
          this.$t('barting.sumErr')
      ]
    },
    error() {
      if (this.errors) {
        if (this.errors === 'not_found') {
          return this.$t('barting.userNotfoundErr')
        } else if (this.errors === 'no_money') {
          return this.$t('barting.sumErr')
        }
      }
      return null
    }
  },
  methods: {
    // preventNaNtype(event) {
    //   if (event.keyCode < 48 || event.keyCode > 57) {
    //     event.preventDefault()
    //   }
    // },
    submit() {
      if (this.$refs.form.validate()) {
        this.dialog = true
      }
    },
    send() {
      if (this.isAuthenticated) {
        const transaction = {
          recepientMail: this.email,
          amount: parseFloat(this.sum),
          comment: this.comment,
          type: 'Перевод'
        }

        this.$store.dispatch('SEND_BARTS', transaction)
        this.dialog = false
      } else {
        this.$router.push({ name: `login___${this.$i18n.locale}` })
      }
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
