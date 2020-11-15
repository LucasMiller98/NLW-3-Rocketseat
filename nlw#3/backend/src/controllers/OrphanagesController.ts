import {Request, Response} from 'express'
import { getRepository } from 'typeorm' // Inseri os dados no bd
import Orphanage from '../models/Orphanage'
import orphanageView from '../views/orphanages_view'
import * as Yup from 'yup'

export default {
  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage)

    const orphanages = await orphanagesRepository.find({
      relations: ['images'] // nome da entidade da coluna, que tem as imagens
    })

    return response.json(orphanageView.renderMany(orphanages))
  },

  async show(request: Request, response: Response) {
    const { id } = request.params
    
    const orphanagesRepository = getRepository(Orphanage)

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images']
    })

    return response.json(orphanageView.render(orphanage))
  },
  
  async create(request: Request, response: Response) {

    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body
  
    const orphanagesRepository = getRepository(Orphanage)
    
    const requestImages = request.files as Express.Multer.File[] // "as" serve para instruir o código para um array de um arquivos. É um hack para multiplos arquivos

    const images = requestImages.map(image => {
      return { path: image.filename } // nome da img que foi salva no disco.
    })

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      images // vai criar as imgs automaticamente quando o orfanato for criado
    }

    const schema = Yup.object().shape({ // para os campos na hora de inseriri um orfanato
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({ // shape pra falar o formato do objeto
          path: Yup.string().required()
        })
      )
    })

    const finalData = schema.cast(data)

    await schema.validate(Yup.date, {
      abortEarly: false, 
    })
  
    const orphanage = orphanagesRepository.create(data)
  
    await orphanagesRepository.save(orphanage)
  
    return response.status(201).json({ orphanage })
  }
}