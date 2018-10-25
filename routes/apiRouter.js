import express from "express";
import db from '../api/queries'

const router = express.Router();

router.post('/getboxes', db.getboxes)

export default router