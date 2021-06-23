import Vue from 'vue'
import relativeTime from 'dayjs/plugin/relativeTime'

export default function ({ app: { i18n, $dayjs } }) {
  $dayjs.locale(i18n.locale)

  function convertToDay(date) {
    $dayjs.extend(relativeTime)
    return $dayjs(date).fromNow()
  }

  Vue.filter('day', val => convertToDay(val))
}

// const day = {}
