<template>
  <div class="deleteadbutton">
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          elevation="0"
          small
          absolute
          right
          top
          fab
          style="transform: translateY(35px)"
          @click.stop="dialog = true"
          v-on="on"
        >
          <v-icon color="red lighten-1">{{ svg.delete }}</v-icon>
        </v-btn>
      </template>
      <span>{{ $t('scream.deletePost') }}</span>
    </v-tooltip>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline"></v-card-title>

        <v-card-text> {{ $t('scream.rSure') }} </v-card-text>

        <!---------------------- ACTIOS BUTTONS -------------------->
        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn
            color="cyan darken-1"
            text
            :disabled="loadingUser"
            @click="dialog = false"
          >
            Нет
          </v-btn>
          <v-btn
            color="red darken-1"
            text
            :loading="loadingUser"
            @click="handleDeleteScream"
          >
            Удалить
          </v-btn>
        </v-card-actions>
        <!---------------------- END ACTIOS BUTTONS -------------------->
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" color="info" :timeout="1500" top>
      Success
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { mdiDeleteOutline } from '@mdi/js'

export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    adId: {
      type: String,
      required: true,
      default: ''
    }
  },
  data() {
    return {
      snackbar: false,
      dialog: false,
      svg: {
        delete: mdiDeleteOutline
      }
    }
  },
  computed: {
    ...mapGetters(['loadingUser'])
  },
  methods: {
    handleDeleteScream() {
      this.$store.dispatch('board/DELETE_AD', this.adId).then(res => {
        this.dialog = false
        if (res.data === 'success') {
          this.snackbar = true
        }
        if (this.$route.params.id) {
          const path = this.localePath('/board/pets/')
          this.$router.push(path)
        }
      })
    }
  }
}
</script>
