import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { prisma } from '../../../database/prismaClient'

interface IAuthenticateDeliveryman {
  username: string
  password: string
}

export class AuthenticateDeliverymanUseCase {
  async execute({ password, username }: IAuthenticateDeliveryman) {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username
      }
    })

    if (!deliveryman) {
      throw new Error('Username or password invalid!')
    }

    const passwordMatch = await compare(password, deliveryman.password)

    if (!passwordMatch) {
      throw new Error('Username or password invalid!')
    }

    const token = sign({ username }, 'b442dbfb2ca01e65f9cb5fdc0b0fefc8', {
      subject: deliveryman.id,
      expiresIn: '1d'
    })

    return token
  }
}
