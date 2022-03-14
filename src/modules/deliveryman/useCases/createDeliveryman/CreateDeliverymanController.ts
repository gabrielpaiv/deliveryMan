import { Request, Response } from 'express'
import { CreateDeliverymanUseCase } from './CreateDeliverymanUseCase'

class CreateDeliverymanController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body

    const createDeliverymanUseCase = new CreateDeliverymanUseCase()
    const result = await createDeliverymanUseCase.execute({
      password,
      username
    })

    return response.json(result)
  }
}
export { CreateDeliverymanController }
