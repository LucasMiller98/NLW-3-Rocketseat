import { Router } from 'express'
import OrphanagesController from './controllers/OrphanagesController'
import multer from 'multer'
import uploadConfig from './config/upload'

const routes = Router()
const upload = multer(uploadConfig)

// metodos -> index, show, create, update, delete
routes.get('/orphanages', OrphanagesController.index)
routes.get('/orphanages/:id', OrphanagesController.show)
routes.post('/orphanages', upload.array('images'),OrphanagesController.create) // Quando cadastrar um user , já vai cadastrar com as imgs

export default routes