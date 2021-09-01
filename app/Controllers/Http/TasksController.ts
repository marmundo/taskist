import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Task from 'App/Models/Task'

export default class TasksController {
  public async index ({ view }: HttpContextContract) {
    const tasks=await Task.all()
    return view.render('tasks/index',{tasks:tasks})
  }

  public async delete ({params,response,session}:HttpContextContract){
    var task=await Task.findOrFail(params.id)
    task.delete()
    session.flash('notification','Tarefa Deletada!')
    response.redirect('back')
  }

  public async alterar ({request,params,response,session}:HttpContextContract){
    var task=await Task.findOrFail(params.id)
    task.isCompleted = !!request.input('completed');
    (await task).save()
    session.flash('notification','Tarefa Atualizada!')
    response.redirect('back')
  }

  public async armazenar ({ response,request }: HttpContextContract) {
    const validationSchema = schema.create({
      title: schema.string({ trim: true }, [
        rules.maxLength(255),
      ]),
    })

    const validatedData = await request.validate({
      schema: validationSchema,
      messages: {
        'title.required': 'Digite o título da tarefa',
        'title.maxLength': 'O título da tarefa não pode exceder 255 characteres',
      },
    })

    await Task.create({
      title:validatedData.title,
    })
    return response.redirect('back')
  }
}
