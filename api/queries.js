import sql from '../commond/sqllist'
import promise from 'bluebird'
import pg from 'pg-promise'
import sqllist from '../commond/sqllist';

const options = { promiseLib: promise }
const pgp = pg(options)
const connections = "postgres://clgfhgaukuolin:09efedd1bf282ea7dc4b9091b07f94155e1e4d9633a72dddff2ccf70b7ca83e0@ec2-54-83-22-244.compute-1.amazonaws.com:5432/dbhajskmdk85id?ssl=true"
const db = pgp(connections)

export default {
    getallboxes: async (req, res, next) => {
        try {
            const branchid = req.params.branchid
            if (branchid == '' || branchid == null || branchid == undefined) {
                return res.sendStatus(400).end()
            } else {
                const boxes = await db.any(sql.getallboxes, [branchid.toString()])
                res.status(200).json({
                    boxes: boxes
                })
            }
        } catch (error) {
            console.log(error)
            return res.sendStatus(500).end()
        }
    },
    getbranches: async (req, res, next) => {
        try {
            const branchid = req.body.branchid
            if (branchid == '' || branchid == null || branchid == undefined) {
                res.sendStatus(400)
            } else {
                const branch = await db.any(sql.getallbranches, [branchid])
                res.status(200).json({
                    response: {
                        data: branch
                    }
                })
            }
        } catch (error) {
            console.log(error)
            return res.sendStatus(500)
        }
    },
    renting: async (req, res, next) => {
        try {
            const boxid = req.body.boxid
            const passcode = req.body.passcode
            const faceid = req.body.faceid
            const phonenumber = req.body.phonenumber
            const branchid = req.body.branchid
            const checkin = new Date()
            if (boxid == '' || passcode == '' || faceid == '' || phonenumber == '' || branchid == '') {
                res.sendStatus(400)
            } else {
                const renting = await db.any(sqllist.renting, [boxid.toString(), checkin, branchid.toString(), phonenumber.toString(), passcode.toString(), faceid.toString(), boxid.toString()])
                console.log(renting)
                const boxrented = await db.none(sqllist.boxrented, [boxid.toString()])
                console.log(boxrented)
                res.sendStatus(201)
            }
        } catch (error) {
            console.log(error)
            res.sendStatus(500)
        }
    },
    checkout: async (req, res, next) => {
        try {
            const transactionid = req.params.transactionid
            const checkouttime = new Date()
            if (transactionid == '' || transactionid == null || transactionid == undefined) {
                res.sendStatus(400).end()
            } else {
                const checkout = await db.any(sqllist.checkout, [transactionid.toString(), checkouttime])
                let boxid = checkout[0].boxid
                const boxrelease = await db.none(sqllist.boxrelease, [boxid])
                res.sendStatus(200)
            }
        } catch (error) {
            console.log(error)
            res.sendStatus(500).end()
        }
    },
    getInuseFaceId: async (req, res, next) => {
        try {
            const branchid = req.params.branchid
            if (branchid == '' || branchid == null || branchid == undefined) {
                res.sendStatus(400).end()
            } else {
                const facesid = await db.any(sqllist.getInuseFaceId, [branchid.toString()])
                res.status(200).json({
                    facesid
                })
            }
        } catch (error) {
            console.log(error)
            res.sendStatus(500).end()
        }
    },
    passcodeVerify: async (req, res, next) => {
        try {
            const passcode = req.body.passcode
            const boxid = req.body.boxid
            let result = null
            if (passcode == null || passcode == undefined || passcode == '' || boxid == null || boxid == undefined || boxid == '') {
                res.sendStatus(400).end()
            } else {
                const transaction = await db.any(sqllist.gettransactionbyid, [boxid])
                if (passcode.toString() != transaction[0].passcode) {
                    result = false
                } else {
                    result = true
                    await db.any(sql.checkout, [transaction[0].id, new Date()])
                    await db.none(sqllist.boxrelease, [boxid])
                }
                return res.status(200).json({
                    result
                })
            }
        } catch (error) {
            console.log(error)
            res.sendStatus(500).end()
        }
    },
    checkoutByBoxid: async (req, res, next) => {
        try {
            const boxid = req.params.boxid
            if (boxid == null || boxid == undefined || boxid == '') {
                res.sendStatus(400).end()
            } else {
                const transaction = await db.any(sqllist.gettransactionbyid, [boxid])
                const transactionid = transaction[0].id
                const checkout = await db.any(sqllist.checkout, [transactionid.toString(), new Date()])
                const boxrelease = db.none(sqllist.boxrelease, [boxid])
                res.sendStatus(200)
            }
        } catch (error) {
            console.log(error)
            res.sendStatus(500).end()
        }
    },
    transactionByPhone: async (req, res, next) => {
        try {
            const phonenumber = req.params.phonenumber
            if (phonenumber == null || phonenumber == undefined || phonenumber == '') {
                res.sendStatus(400).end()
            } else {
                const transactions = await db.any(sqllist.gettransactionbyphone, [phonenumber])
                res.status(200).json({
                    transactions
                })
            }
        } catch (error) {
            console.log(error)
            res.sendStatus(500).end()
        }
    },
    updateBoxInfo: async (req, res, next) => {
        try {
            const boxid = req.params.id
            const price = req.body.price
            const size = req.body.size
            await db.any(sqllist.updateBoxInfo, [boxid, price, size])
            res.status(200).send({
                status: 200,
                message: 'success'
            })
        } catch (error) {
            console.log(error)
            res.sendStatus(500).end()
        }
    },
    deleteBox: async (req, res, next) => {
        try {
            const boxid = req.params.id
            await db.any(sqllist.deleteBox, [boxid])
            res.status(200).send({
                status: 200,
                message: 'success'
            })
        } catch (error) {
            console.log(error)
            res.sendStatus(500).end()
        }
    },
    addBox: async (req, res, next) => {
        try {
            const boxid = req.body.boxid
            const name = req.body.name
            const size = req.body.size
            const price = req.body.price
            const status = 'aviable'
            const branchid = req.body.branchid
            const masterkey = 1234
            let box = await db.any(sqllist.addbox, [boxid, name, size, price, status, branchid, masterkey])
            console.log(box)
            res.status(200).send({
                status: 200,
                message: 'success'
            })
        } catch (error) {
            console.log(error)
            res.sendStatus(500).end()
        }
    },
    lockBox: async (req, res, next) => {
        try {
            const boxid = req.params.id
            const transactionid = await db.any(sqllist.gettransactionbyid, [boxid])
            await db.any(sqllist.lockTransaction, [transactionid])
            await db.any(sqllist.lockBox, [boxid])
            res.status(200).send({
                status: 200,
                message: 'success'
            })
        } catch (error) {
            console.log(error)
            res.sendStatus(500).end()
        }
    },
    unlockBox: async (req, res, next) => {
        try {
            const boxid = req.params.id
            await db.any(sqllist.unlockBox, [boxid])
            res.status(200).send({
                status: 200,
                message: 'success'
            })
        } catch (error) {
            console.log(error)
            res.sendStatus(500).end()
        }
    },
}