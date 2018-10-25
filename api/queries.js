import sql from '../commond/sqllist'
import promise from 'bluebird'
import pg from 'pg-promise'

const options = { promiseLib: promise }
const pgp = pg(options)
const connections = "postgres://clgfhgaukuolin:09efedd1bf282ea7dc4b9091b07f94155e1e4d9633a72dddff2ccf70b7ca83e0@ec2-54-83-22-244.compute-1.amazonaws.com:5432/dbhajskmdk85id?ssl=true"
const db = pgp(connections)

export default {
    getboxes: async (req, res, next) => {
        try {
            const branchid = req.body.branchid
            if (branchid == '' || branchid == null || branchid == undefined) {
                const error = new Error("missing request body")
                return res.sendStatus(400).json({
                    error: error
                })
            } else {
                const boxes = await db.any(sql.getallboxes, [branchid])
                res.status(200).json({
                    response: {
                        data: boxes
                    }
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
                const branch = await db.any(sql.getallbr, [branchid])
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
    }
}