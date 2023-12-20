import { Prisma, PrismaClient } from '@prisma/client'

import { getOne as getOneEvent } from './events'
import { getOne as getOneGroup } from './groups'

const prisma = new PrismaClient()

type GetAllFilters = { id_event: number; id_group?: number }

export const getAll = async (filters: GetAllFilters) => {
  try {
    return await prisma.eventPeople.findMany({ where: filters })
  } catch (error) {
    return false
  }
}

type GetOneFilters = {
  id_event: number
  id_group?: number
  id?: number
  cpf?: string
}

export const getOne = async (filters: GetOneFilters) => {
  try {
    if (!filters.id && !filters.cpf) return false

    return await prisma.eventPeople.findFirst({ where: filters })
  } catch (error) {
    return false
  }
}

type PeopleCreateData = Prisma.Args<typeof prisma.eventPeople, 'create'>['data']

export const add = async (data: PeopleCreateData) => {
  try {
    if (!data.id_event || !data.id_group) return false

    const eventItem = await getOneEvent(data.id_event)
    if (!eventItem) return false
    const groupItem = await getOneGroup({
      id_event: data.id_event,
      id: data.id_group,
    })
    if (!groupItem) return false

    return await prisma.eventPeople.create({ data })
  } catch (error) {
    return false
  }
}

type UpdateFilters = { id?: number; id_event: number; id_group?: number }
type PeopleUpdateData = Prisma.Args<typeof prisma.eventPeople, 'update'>['data']

export const update = async (
  filters: UpdateFilters,
  data: PeopleUpdateData
) => {
  try {
    return await prisma.eventPeople.updateMany({ where: filters, data })
  } catch (error) {
    return false
  }
}

type RemoveFilters = { id_event?: number; id_group?: number; id: number }

export const remove = async (filters: RemoveFilters) => {
  try {
    return await prisma.eventPeople.delete({ where: filters })
  } catch (error) {
    return false
  }
}
