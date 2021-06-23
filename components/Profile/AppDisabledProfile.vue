<template>
  <div
    v-if="!isAuthenticated"
    style="min-height: 300px; flex-direction: column"
    class="center"
  >
    <div class="subtitle-1 text-center mb-5">
      <div class="grey--text text--darken-1">{{ $t('auth.noAccHint') }}</div>
      <router-link to="/signup" class="title">
        <v-btn color="primary" elevation="0" class="mt-3" dark>
          {{ $t('auth.signUp') }}
        </v-btn>
      </router-link>
    </div>
    <div class="subtitle-1 text-center">
      <div class="grey--text text--darken-1">
        {{ $t('auth.alredySignedUp') }}
      </div>
      <router-link to="/login" class="title">
        <v-btn color="#E0E0E0" elevation="0" class="mt-3">{{
          $t('auth.signIn')
        }}</v-btn>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isAuthenticated'])
  }
}
</script>
