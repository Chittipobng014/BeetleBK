import express from "express";
import db from '../api/queries'

const router = express.Router();

router.post('/getallboxes', db.getallboxes)
router.post('/renting', db.renting)
router.post('/getinusefaceid', db.getInuseFaceId)

export default router