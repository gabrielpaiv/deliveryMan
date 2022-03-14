import { Request, Response } from 'express'
import { CreateClientUseCase } from './CreateClientUseCase'

class CreateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body

    const createClientUseCase = new CreateClientUseCase()
    const result = await createClientUseCase.execute({
      password,
      username
    })

    return response.json(result)
  }
}
export { CreateClientController }
