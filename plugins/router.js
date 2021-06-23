// export default ({ app }) => {
//   app.router.beforeEach((to, from, next) => {
//     if (to.matched.some(route => route.meta.requiresAuth)) {
//       if (store.getters.isAuthenticated) {
//         next()
//         return
//       }
//       next({ name: 'login' })
//     } else {
//       next()
//     }
//   })
// }
