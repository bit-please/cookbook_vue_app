import Vue from 'vue'
import Router from 'vue-router'
import RecipesIndex from './views/Recipes/Index.vue'
import RecipesNew from './views/Recipes/New.vue'
import RecipesShow from './views/Recipes/Show.vue'
import RecipesEdit from './views/Recipes/Edit.vue'
import Signup from './views/Users/Signup.vue'
import Login from './views/Users/Login.vue'
import Logout from './views/Users/Logout.vue'
import Map from './views/Map.vue'
import Messages from './views/Messages.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'recipes-index',
      component: RecipesIndex
    },
    {
      path: '/recipes/new',
      name: 'recipes-new',
      component: RecipesNew
    },
    {
      path: '/recipes/:id',
      name: 'recipes-show',
      component: RecipesShow
    },
    {
      path: '/recipes/:id/edit',
      name: 'recipes-edit',
      component: RecipesEdit
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
    {
      path: '/map',
      name: 'map',
      component: Map
    },
    {
      path: '/messages',
      name: 'messages',
      component: Messages
    }
  ]
})
