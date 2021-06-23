<template>
  <form ref="form" @submit.prevent="loginHandlerSubmit">
    <v-text-field
      v-model="formNewUser.handle"
      :rules="handleRules"
      :label="$t('auth.name')"
      required
      :loading="loadingForm"
      color="cyan"
    ></v-text-field>
    <v-text-field
      v-model="formNewUser.email"
      :rules="emailRules"
      label="E-mail"
      required
      :loading="loadingForm"
      color="cyan"
    ></v-text-field>
    <v-text-field
      v-model="formNewUser.password"
      :rules="pwRules"
      :append-icon="showPassword ? svg.visibility : svg.visibilityOff"
      :type="showPassword ? 'text' : 'password'"
      name="password"
      :label="$t('auth.password')"
      :hint="$t('auth.pwLengthErr')"
      counter
      :loading="loadingForm"
      color="cyan"
      @click:append="showPassword = !showPassword"
    ></v-text-field>
    <v-text-field
      v-model="formNewUser.confirmPassword"
      :rules="pwConfirmRules"
      :append-icon="showPassword ? svg.visibility : svg.visibilityOff"
      :type="showPassword ? 'text' : 'password'"
      name="confirmPassword"
      :label="$t('auth.pwConfirm')"
      :hint="$t('auth.pwLengthErr')"
      counter
      :loading="loadingForm"
      color="cyan"
      @click:append="showPassword = !showPassword"
    ></v-text-field>
    <v-text-field
      v-model="formNewUser.ref"
      :rules="emailRules"
      :label="$t('auth.inviteEmail')"
      required
      :loading="loadingForm"
      color="cyan"
    ></v-text-field>

    <!-------------------------  FORM ERRORS ------------------->
    <div v-if="errors" class="subtitle1 text-center red--text">
      <p>{{ errors }}</p>
      <!-- <p v-for="(errorMessage, i) in errors" :key="i">{{errorMessage}}</p> -->
    </div>
    <span
      >{{ $t('auth.alredySignedUp') }}
      <router-link class="cyan--text" :to="localePath('/login')">{{
        $t('auth.signIn')
      }}</router-link></span
    >
    <!-------------------------  END FORM ERRORS ------------------->

    <div class="mt-5 text-right">
      <v-btn
        class="mr-3"
        :disabled="loadingForm"
        color="primary"
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
        color="primary"
        elevation="0"
        dark
      >
        {{ $t('auth.signUp') }}
      </v-btn>
    </div>
  </form>
</template>

<script>
// ICONS
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'

// MIXINS
import { reset } from '@/mixins/mixins'

// VUEX
import { mapGetters } from 'vuex'

export default {
  mixins: [reset],
  data: () => ({
    showPassword: false,
    formNewUser: {
      email: '',
      password: '',
      confirmPassword: '',
      handle: '',
      ref: ''
    },
    // emailRules: [
    //   v => !!v || this.$t('auth.emailErr'),
    //   v => /.+@.+\..+/.test(v) || this.$t('auth.emailErr')
    // ],
    // pwRules: [v => !!v || this.$t('pwErr')],
    // handleRules: [v => !!v || this.$t('auth.nameErr')],
    svg: {
      visibility: mdiEyeOutline,
      visibilityOff: mdiEyeOffOutline
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
      return [
        v => !!v || this.$t('auth.pwErr'),
        v => v.length > 5 || this.$t('auth.pwLengthErr')
      ]
    },
    pwConfirmRules() {
      return [
        v => !!v || this.$t('auth.pwErr'),
        v => v.length > 5 || this.$t('auth.pwLengthErr'),
        v => v === this.formNewUser.password || this.$t('auth.pwConfirmErr')
      ]
    },
    handleRules() {
      return [v => !!v || this.$t('auth.nameErr')]
    },
    ...mapGetters(['errors', 'loadingForm'])
  },
  beforeDestroy() {
    this.$store.dispatch('CLEAR_ERROR')
  },
  mounted() {
    // TODO REFERAL TEMPORARY SOLUTION
    switch (true) {
      case this.$router.history._startLocation.includes('republic-haifa'):
        this.formNewUser.ref = 'republic.haifa@gmail.com'
        break
      case this.$router.history._startLocation.includes('esh-li-hatul'):
        this.formNewUser.ref = 'deskpets21@gmail.com'
        break
      default:
        this.formNewUser.ref = 'agoramas.net@gmail.com'
    }
  },
  methods: {
    async loginHandlerSubmit() {
      await this.$store.dispatch('SIGN_UP', this.formNewUser)
    }
  }
}
</script>
