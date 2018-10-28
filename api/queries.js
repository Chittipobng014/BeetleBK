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
            return res.sendStatus(500)
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
                const renting = await db.none(sqllist.renting, [boxid, checkin, branchid, phonenumber, passcode, faceid])
                const boxrented = await db.none(sqllist.boxrented, [boxid])
                console.log(boxrented)
                res.sendStatus(200)
            }
        } catch (error) {
            console.log(error)
            res.sendStatus(500)
        }
    }
}