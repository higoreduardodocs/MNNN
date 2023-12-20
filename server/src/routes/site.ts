import { Router } from 'express'

import { getEvent } from '../controllers/events'
import { searchPerson } from '../controllers/people'

const router = Router()

router.get('/ping', (req, res) => res.json({ pong: true }))

router.get('/events/:id', getEvent)
router.get('/events/:id_event/search', searchPerson)

export default router
