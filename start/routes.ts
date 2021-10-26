/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'TasksController.index')
Route.post('/tasks', 'TasksController.armazenar')
Route.patch('/tasks/:id', 'TasksController.alterar')
Route.delete('/tasks/:id', 'TasksController.delete')

Route.get('/registrar', 'AuthController.showRegistrar')
Route.post('/registrar', 'AuthController.registrar')
Route.post('/logout', 'AuthController.logout')
Route.get('/login', 'AuthController.showLogin')
Route.post('/login', 'AuthController.login')

