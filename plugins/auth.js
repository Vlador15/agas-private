import jwtDecode from 'jwt-decode'

export default function ({ store, $auth, app: { i18n }, redirect }) {
  const token = $auth.$storage.getCookie('_token.local')
  if (token) {
    const decodedToken = jwtDecode(token)
    if (decodedToken.exp * 1000 > Date.now()) {
      store.dispatch('AUTH_USER', token)
      store.dispatch('FETCH_AUTH_USER')
    }
    if (decodedToken.exp * 1000 < Date.now()) {
      store.dispatch('LOGOUT_USER')
      redirect({ name: `login___${i18n.locale}` })
    }
  }
}
