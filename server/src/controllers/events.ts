import { RequestHandler } from 'express'

import { addEventSchema, updateEventSchema } from '../types/type'
import * as events from '../services/events'
import { update as updatePeople } from '../services/people'

export const getAll: RequestHandler = async (req, res) => {
  const items = await events.getAll()
  if (items) return res.json(items)

  res.json({ error: 'Ocorreu um erro' })
}

export const getEvent: RequestHandler = async (req, res) => {
  const { id } = req.params
  const eventItem = await events.getOne(parseInt(id))
  if (eventItem) return res.json({ event: eventItem })

  res.json({ error: 'Ocorreu um erro' })
}

export const addEvent: RequestHandler = async (req, res) => {
  const body = addEventSchema.safeParse(req.body)
  if (!body.success) return res.status(400).json({ error: 'Dados inválidos' })

  const newEvent = await events.add(body.data)
  if (newEvent) return res.status(201).json({ event: newEvent })

  res.json({ error: 'Ocorreu um erro' })
}

export const updateEvent: RequestHandler = async (req, res) => {
  const { id } = req.params
  const body = updateEventSchema.safeParse(req.body)
  if (!body.success) return res.status(400).json({ error: 'Dados inválidos' })

  const updateEvent = await events.update(parseInt(id), body.data)
  if (updateEvent) {
    if (updateEvent.status) {
      const response = await events.doMatches(parseInt(id))
      if (!response) {
        return res.status(400).json({ error: 'Sorteio invalidado' })
      }
    } else {
      await updatePeople({ id_event: parseInt(id) }, { matched: '' })
    }

    return res.json({ event: updateEvent })
  }

  res.json({ error: 'Ocorreu um erro' })
}

export const deleteEvent: RequestHandler = async (req, res) => {
  const { id } = req.params

  const deleteEvent = await events.remove(parseInt(id))
  if (deleteEvent) return res.json({ event: deleteEvent })

  res.json({ error: 'Ocorreu um erro' })
}
