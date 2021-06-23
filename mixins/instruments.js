/**
 *
 * Written by vlad on 23/11/2020
 */

import { Constants } from '@/scripts/conf/Constants'

export default {
  methods: {
    /**
     * Function that clones original category scheme and initializes it whenever required
     * @param category - String pointing to current chosen post category
     * @return {any}
     * Vlad.
     */
    getCategoryScheme(category) {
      return JSON.parse(
        JSON.stringify(Constants[`STRUCTURE_${category.toUpperCase()}`])
      )
    }
  }
}
