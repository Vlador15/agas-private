<template>
  <v-row justify="center" align="center" style="height: 100%" class="ma-0">
    <v-col cols="12" sm="8" md="6" lg="4">
      <AppPanelFullH :name="$t('auth.login')">
        <AppLoginForm />
      </AppPanelFullH>
    </v-col>
  </v-row>
</template>

<script>
import AppLoginForm from '@/components/Form/AppLoginForm'

export default {
  middleware: 'notAuth',
  components: {
    AppLoginForm
  }
}
</script>
