import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string
}

export async function ensureAuthenticateDeliveryman(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).json({
      message: 'Token is missing!'
    })
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub } = verify(
      token,
      'b442dbfb2ca01e65f9cb5fdc0b0fefc8'
    ) as IPayload
    request.id_deliveryman = sub

    return next()
  } catch (error) {
    return response.status(401).json({
      message: 'Token is invalid!'
    })
  }
}
