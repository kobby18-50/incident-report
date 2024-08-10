import express from 'express'
import { createIncidentReport,getAllReports, filterReports} from '../controllers/incidentController.js'

const router = express.Router()

router.post('/', createIncidentReport)

router.get('/', getAllReports)

router.get('/filter', filterReports)

export default router