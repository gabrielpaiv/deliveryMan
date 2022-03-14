import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { prisma } from '../../../database/prismaClient'

interface IAuthenticateClient {
  username: string
  password: string
}

export class AuthenticateClientUseCase {
  async execute({ password, username }: IAuthenticateClient) {
    const client = await prisma.clients.findFirst({
      where: {
        username
      }
    })

    if (!client) {
      throw new Error('Username or password invalid!')
    }

    const passwordMatch = await compare(password, client.password)

    if (!passwordMatch) {
      throw new Error('Username or password invalid!')
    }

    const token = sign({ username }, 'b442dbfb2ca01e65f9cb5fdc0b0fefc8', {
      subject: client.id,
      expiresIn: '1d'
    })

    return token
  }
}
