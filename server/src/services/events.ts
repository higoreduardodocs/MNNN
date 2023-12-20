import { PrismaClient, Prisma } from '@prisma/client'

import { getAll as getAllPeople, update as updatePerson } from './people'
import { encryptMatch } from '../utils/helpers'

const prisma = new PrismaClient()

export const getAll = async () => {
  try {
    return await prisma.event.findMany()
  } catch (error) {
    return false
  }
}

export const getOne = async (id: number) => {
  try {
    return await prisma.event.findFirst({ where: { id } })
  } catch (error) {
    return false
  }
}

type EventsCreateData = Prisma.Args<typeof prisma.event, 'create'>['data']

export const add = async (data: EventsCreateData) => {
  try {
    return await prisma.event.create({ data })
  } catch (error) {
    return false
  }
}

type EventsUpdateData = Prisma.Args<typeof prisma.event, 'update'>['data']

export const update = async (id: number, data: EventsUpdateData) => {
  try {
    return await prisma.event.update({ where: { id }, data })
  } catch (error) {
    return false
  }
}

export const remove = async (id: number) => {
  try {
    return await prisma.event.delete({ where: { id } })
  } catch (error) {
    return false
  }
}

export const doMatches = async (id: number): Promise<Boolean> => {
  const eventItem = await prisma.event.findFirst({
    where: { id },
    select: { grouped: true },
  })

  if (eventItem) {
    const peopleList = await getAllPeople({ id_event: id })
    if (peopleList) {
      let sortedList: { id: number; match: number }[] = []
      let sortable: number[] = []

      let attemps = 0
      let maxAttemps = peopleList.length
      let keepTrying = true
      while (keepTrying && attemps < maxAttemps) {
        keepTrying = false
        attemps++
        sortedList = []
        sortable = peopleList.map((item) => item.id)

        for (let i in peopleList) {
          let sortableFiltered: number[] = sortable
          if (eventItem.grouped) {
            sortableFiltered = sortable.filter((sortableId) => {
              let person = peopleList.find((item) => item.id === sortableId)
              return peopleList[i].id_group !== person?.id_group
            })
          }

          if (
            sortableFiltered.length === 0 ||
            (sortableFiltered.length === 1 &&
              sortableFiltered[0] === peopleList[i].id)
          ) {
            keepTrying = true
          } else {
            let sortedIndex = Math.floor(
              Math.random() * sortableFiltered.length
            )
            while (sortableFiltered[sortedIndex] === peopleList[i].id) {
              sortedIndex = Math.floor(Math.random() * sortableFiltered.length)
            }

            sortedList.push({
              id: peopleList[i].id,
              match: sortableFiltered[sortedIndex],
            })
            sortable = sortable.filter(
              (item) => item !== sortableFiltered[sortedIndex]
            )
          }
        }
      }

      // console.log(`ATTEMPS: ${attemps}`)
      // console.log(`MAX ATTEMPS: ${maxAttemps}`)
      // console.log(sortedList)

      if (attemps < maxAttemps) {
        for (let i in sortedList) {
          await updatePerson(
            { id: sortedList[i].id, id_event: id },
            { matched: encryptMatch(sortedList[i].match) }
          )
        }

        return true
      }
    }
  }

  return false
}
