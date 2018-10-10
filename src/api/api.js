const promise = require('bluebird')
const options = { promiseLib: promise }
const pgp = require('pg-promise')(options)
const connection = "postgres://clgfhgaukuolin:09efedd1bf282ea7dc4b9091b07f94155e1e4d9633a72dddff2ccf70b7ca83e0@ec2-54-83-22-244.compute-1.amazonaws.com:5432/dbhajskmdk85id?ssl=true"
const db = pgp(connection)
import dbHelper from './sql/sqlCollections'

export default {
    getAllBoxs: async (req, res, next) => {
        try {
            const branchid = req.body.branchid.toString()
            const allBoxs = await db.any(dbHelper.GET_ALLBOXS, [branchid])
            res.status(200).json({
                response: {
                    data: allBoxs,
                    message: 'Successfully'
                }
            })
        } catch (err) {
            console.log(err)
            return next(err)
        }
    },
    getAvailableBoxs: async (req, res, next) => {
        try {
            const branchid = req.body.branchid.toString()
            const availableBoxs = await db.any(dbHelper.getAvailableBoxs, [branchid])
            res.status(200).json({
                response: {
                    data: availableBoxs,
                    message: 'Successfully'
                }
            })
        } catch (err) {
            console.log(err)
            return next(err)
        }
    },
    getInuseBoxs: async (req, res, next) => {
        try {
            const branchid = req.body.branchid.toString()
            const inuseBoxs = await db.any(dbHelper.getInuseBoxs, [branchid])
            res.status(200).json({
                response: {
                    data: inuseBoxs,
                    message: 'Successfully'
                }
            })
        } catch (err) {
            console.log(err)
            return next(err)
        }
    },
    updateToInuse: async (req, res, next) => {
        try {
            const branchid = req.body.branchid.toString()
            const boxid = req.body.id.toString()
            const passcode = req.body.passcode.toString()
            const faceid = req.body.faceid.toString()
            const update = await db.none(dbHelper.updateToInuse, [branchid, boxid, passcode, faceid])
            res.status(200).json({
                data: update,
                message: 'Successfully'
            })
        } catch (error) {
            console.log(err)
            return next(err)
        }
    },
    updateToAvai: async (req, res, next) => {
        try {
            const branchid = req.body.branchid.toString()
            const boxid = req.body.id.toString()
            const update = await db.none(dbHelper.updateToInuse, [branchid, boxid])
            res.status(200).json({
                data: update,
                message: 'Successfully'
            })
        } catch (error) {
            console.log(err)
            return next(err)
        }
    }
}
 
//export default api
