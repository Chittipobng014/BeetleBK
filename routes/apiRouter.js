import express from "express";
import db from '../api/queries'

const router = express.Router();

router.get('/getallboxes/:branchid', db.getallboxes)
router.post('/transactions', db.renting)
router.get('/transactions/:branchid', db.getInuseFaceId)
router.put('/checkout/:transactionid', db.checkout),
router.post('/passcode', db.passcodeVerify)
router.put('/checkoutbyid/:boxid', db.checkoutByBoxid)
router.get('/transactionsbyphone/:phonenumber', db.transactionByPhone)
router.put('/boxes/:id', db.updateBoxInfo)
router.delete('/boxes/:id', db.deleteBox)
router.post('/boxes', db.addBox)

export default router