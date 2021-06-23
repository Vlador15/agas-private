<template>
  <div>
    <v-stepper v-model="e1">
      <v-stepper-items>
        <v-stepper-content step="1">
          <form ref="form" @submit.prevent="loginHandlerSubmit">
            <v-text-field
              v-model="loginUser.email"
              :rules="emailRules"
              label="E-mail"
              required
              :loading="loadingForm"
              color="blue"
              type="email"
            ></v-text-field>
            <v-text-field
              v-model="loginUser.password"
              :rules="pwRules"
              :append-icon="showPassword ? svg.visibility : svg.visibilityOff"
              :type="showPassword ? 'text' : 'password'"
              name="input-10-1"
              :label="$t('auth.password')"
              counter
              :loading="loadingForm"
              color="blue"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
            <v-btn
              :disabled="loadingForm"
              x-small
              color="blue"
              text
              elevation="0"
              dark
              @click="e1 = 2"
            >
              {{ $t('auth.pwForgot') }}
            </v-btn>
            <!-------------------------  FORM ERRORS  ------------------->
            <div v-if="errors" class="subtitle1 text-center red--text">
              <p>{{ errors }}</p>
              <!-- <p v-for="(errorMessage, i) in errors" :key="i">{{errorMessage}}</p> -->
            </div>
            <!-------------------------  END FORM ERRORS ------------------->

            <div
              class="mt-4 d-flex flex-row justify-end align-center"
              style="flex-wrap: wrap"
            >
              <v-btn
                :disabled="loadingForm"
                class="mr-4"
                color="blue"
                text
                elevation="0"
                dark
                @click="reset"
              >
                {{ $t('auth.clear') }}
              </v-btn>
              <v-btn
                type="submit"
                :loading="loadingForm"
                color="blue"
                elevation="0"
                dark
              >
                {{ $t('auth.signIn') }}
              </v-btn>
            </div>
            <div class="mt-4">
              {{ $t('auth.noAccHint') }}
              <router-link class="cyan--text" :to="localePath('/signup')">{{
                $t('auth.regNow')
              }}</router-link>
            </div>
          </form>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-form
            ref="form_rec"
            v-model="recValid"
            @submit.prevent="recoverHandlerSubmit"
          >
            <v-text-field
              v-model="loginUser.recoverEmail"
              :rules="emailRules"
              label="E-mail"
              required
              :loading="loadingForm"
              color="blue"
            ></v-text-field>

            <div class="mt-5 d-flex flex-row justify-end align-center">
              <v-btn
                :disabled="loadingForm"
                class="mr-4"
                color="blue"
                text
                elevation="0"
                dark
                @click="e1 = 1"
              >
                {{ $t('auth.cancel') }}
              </v-btn>
              <v-btn
                type="submit"
                :loading="loadingForm"
                color="blue"
                elevation="0"
                dark
              >
                {{ $t('auth.pwRecower') }}
              </v-btn>
            </div>
          </v-form>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-row justify="center" align="center" style="height: 100%">
            <v-col class="col-auto">
              <v-icon x-large>{{ svg.check }}</v-icon>
              {{ $t('auth.recoweryMsg') }}
            </v-col>
          </v-row>
          <v-btn
            :disabled="loadingForm"
            class="mr-4"
            color="blue"
            text
            elevation="0"
            dark
            @click="e1 = 1"
          >
            {{ $t('auth.backToLogin') }}
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
// MIXINS
import { reset } from '@/mixins/mixins'

// SVG ICONS
import { mdiEyeOutline, mdiEyeOffOutline, mdiCheckOutline } from '@mdi/js'

// VUEX
import { mapGetters } from 'vuex'

export default {
  mixins: [reset],
  data: () => ({
    recValid: true,
    e1: 1,
    showPassword: false,
    loginUser: {
      email: '',
      password: '',
      recoverEmail: ''
    },
    // emailRules: [
    //   v => !!v || this.$t('emailErr'),
    //   v => /.+@.+\..+/.test(v) || this.$t('emailErr')
    // ],
    // pwRules: [v => !!v || this.$t('pwErr')],
    svg: {
      visibility: mdiEyeOutline,
      visibilityOff: mdiEyeOffOutline,
      check: mdiCheckOutline
    }
  }),
  computed: {
    emailRules() {
      return [
        v => !!v || this.$t('auth.emailErr'),
        v => /.+@.+\..+/.test(v) || this.$t('auth.emailErr')
      ]
    },
    pwRules() {
      return [v => !!v || this.$t('auth.pwErr')]
    },
    ...mapGetters(['errors', 'loadingForm'])
  },
  beforeDestroy() {
    this.$store.dispatch('CLEAR_ERROR')
  },
  methods: {
    async loginHandlerSubmit() {
      await this.$store.dispatch('SIGN_IN', this.loginUser)
    },
    recoverHandlerSubmit() {
      if (this.$refs.form_rec.validate()) {
        this.$store
          .dispatch('RECOVER_PASS', {
            email: this.loginUser.recoverEmail
          })
          .then(() => {
            this.e1 = 3
          })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.v-stepper {
  box-shadow: unset;
}
</style>
