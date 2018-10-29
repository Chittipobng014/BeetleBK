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
            const branchid = req.body.branchid
            if (branchid == '' || branchid == null || branchid == undefined) {
                const error = new Error("missing request body")
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
                res.sendStatus(200)
            }
        } catch (error) {
            console.log(error)
            res.sendStatus(500)
        }
    },
    checkout: async (req, res, next) => {
        try {
            const boxid = req.body.boxid
            const transactionid = req.body.transactionid
            const checkouttime = new Date()
            if (boxid == '' || boxid == null || boxid == undefined || transactionid == '' || transactionid == null || transactionid == undefined || checkout == '' || checkout == null || checkout == undefined) {
                res.sendStatus(400).end()
            } else {
                const checkout = await db.none(sqllist.checkout, [transactionid.toString(), boxid.toString(), checkouttime])
                const boxrelease = await db.none(sqllist.boxrelease, [boxid])
                res.status(200).json({
                    message: 'Success'
                })
            }
        } catch (error) {
            console.log(error)
            res.sendStatus(500).end()
        }
    },
    getInuseFaceId: async (req, res, next) => {
        try {
            const branchid = req.body.branchid
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
    }
}