import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {rules,schema} from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  public async showRegistrar ({view}){
    return view.render('auth/register')
  }

  public async logout ({ auth, response }: HttpContextContract) {
    await auth.logout()

    return response.redirect('/')
  }

  public async registrar ({ response,auth,request }: HttpContextContract){
    const validationSchema = schema.create({
      name: schema.string({trim: true }),
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.maxLength(255),
        rules.unique({ table: 'users', column: 'email' }),
      ]),
      password: schema.string({ trim: true }, [
        rules.confirmed(),
      ]),
    })

    const validatedData = await request.validate({
      schema: validationSchema,
      messages: {
        'confirmed': 'As senhas devem ser iguais',
      },)
    const user=await User.create(validatedData)

    await auth.login(user)
    return response.redirect('/')
  }
}
