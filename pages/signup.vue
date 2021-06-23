<template>
  <v-row justify="center" align="center" style="height: 100%" class="ma-0">
    <v-col cols="12" sm="8" md="6" lg="4">
      <AppPanel :name="$t('auth.signUp')">
        <AppSignUpForm></AppSignUpForm>
      </AppPanel>
    </v-col>
  </v-row>
</template>

<script>
// COMPONENTS
import AppPanel from '@/components/AppPanel'
import AppSignUpForm from '@/components/Form/AppSignUpForm'

export default {
  components: {
    AppPanel,
    AppSignUpForm
  }
}
</script>
