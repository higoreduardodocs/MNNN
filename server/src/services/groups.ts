import { Prisma, PrismaClient } from '@prisma/client'

import { getOne as getOneEvent } from './events'

const prisma = new PrismaClient()

export const getAll = async (id_event: number) => {
  try {
    return await prisma.eventGroup.findMany({ where: { id_event } })
  } catch (error) {
    return false
  }
}

type GetOneFilters = { id_event?: number; id: number }

export const getOne = async (filter: GetOneFilters) => {
  try {
    return await prisma.eventGroup.findFirst({ where: filter })
  } catch (error) {
    return false
  }
}

type GroupsCreateData = Prisma.Args<typeof prisma.eventGroup, 'create'>['data']

export const add = async (data: GroupsCreateData) => {
  try {
    if (!data.id_event) return false

    const eventItem = await getOneEvent(data.id_event)
    if (!eventItem) return false

    return await prisma.eventGroup.create({ data })
  } catch (error) {
    return false
  }
}

type UpdateFilters = { id_event?: number; id: number }
type GroupsUpdateData = Prisma.Args<typeof prisma.eventGroup, 'update'>['data']

export const update = async (
  filters: UpdateFilters,
  data: GroupsUpdateData
) => {
  try {
    return await prisma.eventGroup.update({ where: filters, data })
  } catch (error) {
    return false
  }
}

type DeleteFilter = { id: number; id_event?: number }
export const remove = async (filters: DeleteFilter) => {
  try {
    return await prisma.eventGroup.delete({ where: filters })
  } catch (error) {
    return false
  }
}
