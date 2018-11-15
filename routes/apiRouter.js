import express from "express";
import db from '../api/queries'

const router = express.Router();

router.get('/getallboxes/:branchid', db.getallboxes)
router.post('/transactions', db.renting)
router.get('/transactions/:branchid', db.getInuseFaceId)
router.put('/checkout/:transactionid', db.checkout),
router.post('/passcode', db.passcodeVerify)
router.put('/checkoutbyid/:boxid', db.checkoutByBoxid)

export default router