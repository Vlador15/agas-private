// import axios from 'axios'

export default function ({ store, redirect, app: { i18n } }) {
  if (!store.getters.isAuthenticated)
    return redirect({ name: `login___${i18n.locale}` })
}
