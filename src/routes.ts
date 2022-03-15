import { Router } from 'express'
import { ensureAuthenticateClient } from './middlewares/ensureAuthenticateClient'
import { AuthenticateClientController } from './modules/account/authenticateClient/AuthenticateClientController'
import { AuthenticateDeliverymanController } from './modules/account/authenticateDeliveryman/AuthenticateDeliverymanController'
import { CreateClientController } from './modules/clients/useCases/createClient/CreateClientController'
import { CreateDeliveryController } from './modules/deliveries/createDelivery/CreateDeliveryController'
import { CreateDeliverymanController } from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController'

const routes = Router()
const createClientController = new CreateClientController()
const createDeliverymanController = new CreateDeliverymanController()
const authenticateClientController = new AuthenticateClientController()
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController()

const createDeliveryController = new CreateDeliveryController()

routes.post('/client/', createClientController.handle)

routes.post('/deliveryman', createDeliverymanController.handle)

routes.post('/client/authenticate', authenticateClientController.handle)
routes.post(
  '/deliveryman/authenticate',
  authenticateDeliverymanController.handle
)

routes.post(
  '/delivery',
  ensureAuthenticateClient,
  createDeliveryController.handle
)

export { routes }
