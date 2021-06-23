/**
 *
 * Written by vlad on 02/11/2020
 */

import { Constants } from '@/scripts/conf/Constants'

export default {
  computed: {
    isRight() {
      return this.getViewDirection()
    }
  },
  methods: {
    getViewDirection() {
      return Constants.rtlLanguages.includes(this.$i18n.locale)
    }
  }
}
