import { hash } from 'bcrypt'
import { prisma } from '../../../../database/prismaClient'

interface ICreateCLient {
  username: string
  password: string
}

export class CreateClientUseCase {
  async execute({ password, username }: ICreateCLient) {
    const clientExists = await prisma.clients.findFirst({
      where: {
        username: {
          mode: 'insensitive'
        }
      }
    })

    if (clientExists) {
      throw new Error('Client already exists')
    }

    const hashPassword = await hash(password, 10)

    const client = await prisma.clients.create({
      data: {
        username,
        password: hashPassword
      }
    })

    return client
  }
}
