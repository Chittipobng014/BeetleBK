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
            if (passcode == null || passcode == undefined || passcode == '' || boxid == null || boxid == undefined || boxid == '') {
                res.sendStatus(400).end()
            } else {
                const transaction = await db.any(sqllist.gettransactionbyid, [boxid])
                console.log(transaction)
                if (passcode.toString() != transaction[0].passcode) {
					console.log("​passcode", passcode)
                    res.send(200).json({
                        result: false
                    })
                } else {
                    console.log("​passcode else", passcode)
                    res.send(200).json({
                        result: true
                    })
                }
            }
        } catch (error) {
            console.log(error)
            res.sendStatus(500).end()
        }
    }
}