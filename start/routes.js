'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return {
    greeting: 'Hello my name is Diamsyah M Dida'
  }
})

Route.group(() => {
  Route.post('login', 'AuthController.login')
  Route.post('register', 'AuthController.register')
}).prefix('api/auth')

Route.group(() => {
  Route.get('product', 'ProductController.index')
  Route.get('product/:id', 'ProductController.show')
  Route.post('product', 'ProductController.store')
  Route.put('product/:id', 'ProductController.update')
  Route.delete('product/:id', 'ProductController.delete')
}).prefix('api/v1').middleware(['authentication'])
