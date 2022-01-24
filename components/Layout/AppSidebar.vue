<template>
  <v-navigation-drawer
    v-model="sidebarModel"
    :right="isRight"
    :mini-variant="sidebarDrawerMini"
    :temporary="temporary"
    :permanent="permanent"
    app
    clipped
    floating
    :color="color"
  >
    <v-list nav dense shaped class="pl-0">
      <div v-for="item in $t('main_nav_links')" :key="item.title">
        <template v-if="$store.state.hasSublist && item.sublist">
          <v-list-group active-class="blue--text text--accent-4" value="true">
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <div v-for="(subitem, i) in item.sublist" :key="i">
              <v-list-item
                active-class="blue--text text--accent-4"
                :to="subitem.link || ''"
              >
                <v-list-item-title>{{ subitem.title }}</v-list-item-title>
                <v-list-item-action>
                  <v-icon></v-icon>
                </v-list-item-action>
              </v-list-item>
            </div>
          </v-list-group>
        </template>
        <v-list-item
          v-else
          link
          :to="item.link || ''"
          active-class="blue--text text--accent-4"
          :exact="item.home"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// VUEX
import { mapGetters } from 'vuex'
import layoutDirMixin from '@/mixins/layoutDirMixin'

export default {
  mixins: [layoutDirMixin],
  data() {
    return {
      mobSideBarModel: false,
      deskSideBarModel: true,
      color: 'white',
      temporary: false,
      permanent: true,
      items: [
        {
          title: 'Лента',
          icon: 'mdi-newspaper-variant-multiple-outline',
          link: '/'
        },
        { title: 'Профиль', icon: 'mdi-account-outline', link: '/profile' },
        // {
        //   title: 'Друзья',
        //   icon: 'mdi-account-multiple',
        //   link: '/friends'
        // },

        // { title: 'Группы', icon: 'mdi-account-group-outline', link: '/groups' },
        // { title: 'Опросы', icon: 'mdi-progress-question', link: '/quizzes' },
        // { title: 'Товары  ', icon: 'mdi-storefront-outline', link: '/store' },
        { title: 'Бартинг', icon: 'mdi-bitcoin', link: '/barting' }
        // { title: 'Сообщения', icon: 'mdi-forum', link: '/chat' }
      ]
    }
  },
  computed: {
    ...mapGetters(['sidebarDrawer', 'sidebarDrawerMini']),
    sidebarModel: {
      get() {
        return this.sidebarDrawer
      },
      set(val) {
        this.$store.state.sidebarDrawer = val
      }
    }
  },
  created() {
    // eslint-disable-next-line nuxt/no-globals-in-created
    if (process.client && window.innerWidth < 767) {
      this.permanent = false
      this.temporary = true
      this.color = ''
      this.$store.state.sidebarDrawerMini = false
      this.$store.state.sidebarDrawer = false
      // this.$store.commit('TOGGLE_SIDEBAR_DRAWER_MINI')
    }
  }
}
</script>

<style lang="css" scoped>
/* .v-list-item:not(.blue--text):not(.text--accent-4) .v-list-item__icon i {
  color: #2196F3;
}

.v-list-item:not(.blue--text):not(.text--accent-4) .v-list-item__content {
  color: #2196F3;
} */
</style>
