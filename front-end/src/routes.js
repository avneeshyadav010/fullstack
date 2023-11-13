//import * as VueRouter from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import ShoppingCartPage from './pages/ShoppingCartPage.vue'
import ProductsPage from './pages/ProductsPage.vue'
import ProductDetailPage from './pages/ProductDetailPage.vue'
import NotFoundPage from './pages/NotFoundPage.vue'
import SignUp from './pages/SignUp.vue'
import LoginPage from './pages/LoginPage.vue'
//import { cosh } from 'core-js/core/number'

   const  routes= [
      {
        path: '/',
        component: LoginPage,
       meta: {
         isAuth: false
       },
      },
      {
        path: '/sign-up',
        component: SignUp,
        meta: {
          isAuth: false
        },
      },
      {
        path: '/cart',
        component: ShoppingCartPage,
        meta: {
          isAuth: true
        },
      }, {
        path: '/products',
        component: ProductsPage,
        meta: {
          isAuth: true
        },
      }, {
        path: '/products/:productId',
        component: ProductDetailPage,
        meta: {
          isAuth: true
        },
      }, {
        path: '/:pathMatch(.*)*',
        component: NotFoundPage,
        meta: {
          isAuth: true
        },
      }]
const isLoggedIn = () => {
  let userData = localStorage.getItem('token_ls');
   userData = JSON.parse(userData);
  if (userData.token)
    return true;
  else
    return false
}
const router = createRouter({

  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {

  if (to.meta.isAuth) {
    console.log("Routes", to, from)
    console.log("Token", isLoggedIn())
    if (isLoggedIn()) {
      next();
    }
    else
      next('/')
  }
  else {
    console.log("Auth", to.meta.isAuth)
    next()
  }
}
)
export default router

 