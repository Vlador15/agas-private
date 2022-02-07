<template>
  <v-container class="mt-5">
    <v-row v-if="isLoading">
      <v-col
        v-for="link in $t('moder_categories')"
        :key="link.routing"
        cols="12"
        md="4"
      >
        <!-- <v-btn
          height="80"
          width="200"
          x-large
          color="primary"
          :to="link.routing"
          class="mx-auto mt-10"
          >{{ link.name }}
        </v-btn> -->
        <nuxt-link :to="link.routing">
          <v-banner color="#0d4456" rounded shaped>
            <v-icon large color="white"> mdi-square-edit-outline </v-icon>
            <span class="white--text">{{ link.name }}</span>
          </v-banner>
        </nuxt-link>
      </v-col>
      <v-col v-if="getValideModer.level > 1" cols="12" md="4">
        <nuxt-link v-if="$i18n.locale === 'ru'" :to="moderSelect.routing">
          <v-banner color="#0d4456" rounded shaped>
            <v-icon large color="white"> mdi-cog </v-icon>
            <span class="white--text">{{ $t('moder.moders') }}</span>
          </v-banner>
        </nuxt-link>
        <nuxt-link v-else :to="moderSelect.routingHe">
          <v-banner color="#0d4456" rounded shaped>
            <v-icon large color="white"> mdi-cog </v-icon>
            <span class="white--text">{{ $t('moder.moders') }}</span>
          </v-banner>
        </nuxt-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Moderator',
  components: {},
  data() {
    return {
      moderSelect: {
        name: 'Модераторы',
        routing: '/ru/learningModule/moderator/moders',
        routingHe: '/learningModule/moderator/moders',
        key: 'moders'
      },
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['getValideModer'])
  },
  watch: {},
  async mounted() {
    await this.validateModer()
    this.isLoading = true
  },
  created() {},
  methods: {
    nextModer() {
      this.$router.push({
        name: `learningModule-moderator-moders___${this.$i18n.locale}`
      })
    },
    async validateModer() {
      await this.$store.dispatch('VALIDATE_MODER')
    }
  }
}
</script>
<style scoped></style>
