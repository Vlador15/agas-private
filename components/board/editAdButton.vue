<template>
  <div class="editadbutton">
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
          @click="goToEdit"
          v-on="on"
        >
          <v-icon color="black lighten-1">{{ svg.edit }}</v-icon>
        </v-btn>
      </template>
      <span>{{ $t('scream.editPost') }}</span>
    </v-tooltip>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

import { mdiPencil } from '@mdi/js'

export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    adId: {
      type: String
    }
  },
  data() {
    return {
      svg: {
        edit: mdiPencil
      }
    }
  },
  methods: {
    goToEdit() {
      const path = this.localePath(`/board/pets/${this.adId}/edit`)
      this.$router.push(path)
    }
  }
}
</script>
<style lang="scss" scoped>
.editadbutton {
  .v-btn {
    top: 30px !important;
  }
}
</style>
