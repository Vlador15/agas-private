<template>
  <div>
    <!--------------------- LOGOUT BUTTON ----------------------->
    <v-btn
      fab
      small
      elevation="0"
      color="primary"
      dark
      @click.stop="dialog = true"
    >
      <v-icon>{{ svg.logout }}</v-icon>
    </v-btn>
    <!--------------------- END LOGOUT BUTTON ----------------------->

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline"></v-card-title>

        <v-card-text>{{ $t('auth.confirmLogout') }}</v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="cyan darken-1" text @click="dialog = false">
            {{ $t('auth.cancel') }}
          </v-btn>
          <v-btn color="cyan darken-1" text @click="logout">{{
            $t('auth.submit')
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// VUEX
import { mapGetters } from 'vuex'

// SVG ICONS
import { mdiExitToApp } from '@mdi/js'

export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    scream: {
      type: Object
    }
  },
  data() {
    return {
      dialog: false,
      svg: {
        logout: mdiExitToApp
      }
    }
  },
  computed: {
    ...mapGetters(['loadingUser'])
  },
  methods: {
    logout() {
      this.$store.dispatch('LOGOUT_USER').then(() => {
        this.dialog = false
      })
    }
  }
}
</script>
