import { RequestHandler } from 'express'

import { loginSchema } from '../types/type'
import * as auth from '../services/auth'

export const validate: RequestHandler = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: 'Acesso negado' })
  }
  const token = req.headers.authorization.split(' ')[1]
  if (!auth.validateToken(token)) {
    return res.status(403).json({ error: 'Acesso negado' })
  }

  next()
}

export const login: RequestHandler = (req, res) => {
  const body = loginSchema.safeParse(req.body)
  if (!body.success) return res.status(400).json({ error: 'Dados inválidos' })

  // Validar senha e gerar token
  if (!auth.validatePassword(body.data.password)) {
    return res.status(403).json({ error: 'Acesso negado' })
  }
  return res.status(200).json({ token: auth.createToken() })
}
