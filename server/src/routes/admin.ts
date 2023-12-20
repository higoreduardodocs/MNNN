import { Router } from 'express'

import * as auth from '../controllers/auth'
import * as events from '../controllers/events'
import * as groups from '../controllers/groups'
import * as people from '../controllers/people'

const router = Router()

router.post('/login', auth.login)

router.get('/ping', auth.validate, (req, res) =>
  res.json({ ping: true, admin: true })
)

const eventsRoute = '/events'
router.get(`${eventsRoute}`, auth.validate, events.getAll)
router.get(`${eventsRoute}/:id`, auth.validate, events.getEvent)
router.post(`${eventsRoute}`, auth.validate, events.addEvent)
router.put(`${eventsRoute}/:id`, auth.validate, events.updateEvent)
router.delete(`${eventsRoute}/:id`, auth.validate, events.deleteEvent)

const groupsRoute = '/events/:id_event/groups'
router.get(`${groupsRoute}`, auth.validate, groups.getAll)
router.get(`${groupsRoute}/:id`, auth.validate, groups.getGroup)
router.post(`${groupsRoute}`, auth.validate, groups.addGroup)
router.put(`${groupsRoute}/:id`, auth.validate, groups.updateGroup)
router.delete(`${groupsRoute}/:id`, auth.validate, groups.deleteGroup)

const peopleRoute = '/events/:id_event/groups/:id_group/people'
router.get(`${peopleRoute}`, auth.validate, people.getAll)
router.get(`${peopleRoute}/:id`, auth.validate, people.getPerson)
router.post(`${peopleRoute}`, auth.validate, people.addPerson)
router.put(`${peopleRoute}/:id`, auth.validate, people.updatePerson)
router.delete(`${peopleRoute}/:id`, auth.validate, people.deletePerson)

export default router
