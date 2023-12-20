import { RequestHandler } from 'express'

import * as people from '../services/people'
import {
  addPersonSchema,
  searchPersonSchema,
  updatePersonSchema,
} from '../types/type'
import { decryptMatch } from '../utils/helpers'

export const getAll: RequestHandler = async (req, res) => {
  const { id_event, id_group } = req.params
  const items = await people.getAll({
    id_event: parseInt(id_event),
    id_group: parseInt(id_group),
  })
  if (items) return res.json({ people: items })

  res.json({ error: 'Ocorreu um erro' })
}

export const getPerson: RequestHandler = async (req, res) => {
  const { id_event, id_group, id } = req.params
  const personItem = await people.getOne({
    id_event: parseInt(id_event),
    id_group: parseInt(id_group),
    id: parseInt(id),
  })
  if (personItem) return res.json({ person: personItem })

  res.json({ error: 'Ocorreu um erro' })
}

export const addPerson: RequestHandler = async (req, res) => {
  const { id_event, id_group } = req.params
  const body = addPersonSchema.safeParse(req.body)
  if (!body.success) return res.status(400).json({ error: 'Dados inválidos' })

  const newPeople = await people.add({
    ...body.data,
    id_event: parseInt(id_event),
    id_group: parseInt(id_group),
  })
  if (newPeople) return res.status(201).json({ people: newPeople })

  res.json({ error: 'Ocorreu um erro' })
}

export const updatePerson: RequestHandler = async (req, res) => {
  const { id_event, id_group, id } = req.params
  const body = updatePersonSchema.safeParse(req.body)
  if (!body.success) return res.status(400).json({ error: 'Dados inválidos' })

  const updatePerson = await people.update(
    {
      id_event: parseInt(id_event),
      id_group: parseInt(id_group),
      id: parseInt(id),
    },
    body.data
  )
  if (updatePerson) {
    const personItem = await people.getOne({
      id_event: parseInt(id_event),
      id_group: parseInt(id_group),
      id: parseInt(id),
    })

    return res.json({ person: personItem })
  }

  res.json({ error: 'Ocorreu um erro' })
}

export const deletePerson: RequestHandler = async (req, res) => {
  const { id_event, id_group, id } = req.params

  const deletePerson = await people.remove({
    id_event: parseInt(id_event),
    id_group: parseInt(id_group),
    id: parseInt(id),
  })
  if (deletePerson) return res.json({ person: deletePerson })

  res.json({ error: 'Ocorreu um erro' })
}

export const searchPerson: RequestHandler = async (req, res) => {
  const { id_event } = req.params
  const query = searchPersonSchema.safeParse(req.query)
  if (!query.success) return res.status(400).json({ error: 'Dados inválidos' })

  const personItem = await people.getOne({
    id_event: parseInt(id_event),
    cpf: query.data.cpf,
  })
  if (personItem && personItem.matched) {
    const matchedId = decryptMatch(personItem.matched)
    const personMatch = await people.getOne({
      id_event: parseInt(id_event),
      id: matchedId,
    })
    if (personMatch) {
      return res.json({
        person: { id: personItem.id, name: personItem.name },
        personMatch: { id: personMatch.id, name: personMatch.name },
      })
    }
  }

  res.json({ error: 'Ocorreu um erro' })
}
