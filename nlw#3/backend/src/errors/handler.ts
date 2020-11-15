import { ErrorRequestHandler } from 'express'
import { ValidationError } from 'yup'

interface ValidationError {
  [key: string]: string[]
}

const errorHandler:ErrorRequestHandler = (error, request, response, next) => {
  if(error instanceof ValidationError) {
    let errors: ValidationError = {}

    error.inner.forEach(err => {
      errors[err.path] = err.errors // percorre cada erro para retornar de maneira legivel pro front-end
    })
    return response.status(400).json({ message: 'validatoion fails', errors })
  }
  
  console.error(error)

  return response.status(500).json({ messager: 'Internal server error' }) // só vai aparecer isso para o cliente
}

export default errorHandler

// error -> todos os erros
// request -> dados da requisição
// response -> o que eu quero devolver de resposta
// 500 -> erro interno