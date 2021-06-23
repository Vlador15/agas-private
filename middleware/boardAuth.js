// eslint-disable-next-line camelcase
export default function ({ store, redirect, app: { i18n, api_board } }) {
  if (!store.getters.isAuthenticated)
    return redirect({ name: `login___${i18n.locale}` })
  if (!api_board.defaults.headers.common.Authorization_board) {
    store.dispatch('board/AUTH')
  }
}
