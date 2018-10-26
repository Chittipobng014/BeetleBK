import express from "express";
import db from '../api/queries'

const router = express.Router();

router.post('/getallboxes', db.getallboxes)
router.post('/renting', db.renting)

export default router