import { RequestHandler } from 'express'

import * as groups from '../services/groups'
import {
  addEventSchema,
  addGroupSchema,
  updateGroupSchema,
} from '../types/type'

export const getAll: RequestHandler = async (req, res) => {
  const { id_event } = req.params
  const items = await groups.getAll(parseInt(id_event))
  if (items) return res.json({ groups: items })

  res.json({ error: 'Ocorreu um erro' })
}

export const getGroup: RequestHandler = async (req, res) => {
  const { id_event, id } = req.params
  const groupItem = await groups.getOne({
    id_event: parseInt(id_event),
    id: parseInt(id),
  })
  if (groupItem) return res.json({ group: groupItem })

  res.json({ error: 'Ocorreu um erro' })
}

export const addGroup: RequestHandler = async (req, res) => {
  const { id_event } = req.params
  const body = addGroupSchema.safeParse(req.body)
  if (!body.success) return res.status(400).json({ error: 'Dados inválidos' })

  const newGroup = await groups.add({
    ...body.data,
    id_event: parseInt(id_event),
  })
  if (newGroup) return res.status(201).json({ group: newGroup })

  res.json({ error: 'Ocorreu um erro' })
}

export const updateGroup: RequestHandler = async (req, res) => {
  const { id_event, id } = req.params
  const body = updateGroupSchema.safeParse(req.body)
  if (!body.success) return res.status(400).json({ error: 'Dados inválidos' })

  const updateGroup = await groups.update(
    { id: parseInt(id), id_event: parseInt(id_event) },
    body.data
  )
  if (updateGroup) return res.json({ group: updateGroup })

  res.json({ error: 'Ocorreu um erro' })
}

export const deleteGroup: RequestHandler = async (req, res) => {
  const { id_event, id } = req.params

  const deleteGroup = await groups.remove({
    id: parseInt(id),
    id_event: parseInt(id_event),
  })
  if (deleteGroup) return res.json({ group: deleteGroup })

  res.json({ error: 'Ocorreu um erro' })
}
