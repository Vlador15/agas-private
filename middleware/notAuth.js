export default function ({ store, redirect, app: { i18n } }) {
  // if (store.getters.isAuthenticated) return redirect('/')\
  if (store.getters.isAuthenticated)
    return redirect({ name: `index___${i18n.locale}` })
}
