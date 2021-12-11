export default function ({app, route, redirect}){
  if (route.path !== '/login') {
    if(!app.$fire.auth.currentUser) {
      //take them to sign in page
      return redirect('/login')
    }
  } else if (route.path === '/login') {
    if(!app.$fire.auth.currentUser) {
      //leave them on the sign in page
    } else {
      return redirect('/')
    }
  }
}