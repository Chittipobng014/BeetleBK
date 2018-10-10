const promise = require('bluebird')
const options = { promiseLib: promise }
const pgp = require('pg-promise')(options)
const connection = "postgres://clgfhgaukuolin:09efedd1bf282ea7dc4b9091b07f94155e1e4d9633a72dddff2ccf70b7ca83e0@ec2-54-83-22-244.compute-1.amazonaws.com:5432/dbhajskmdk85id"
const db = pgp(connection)

const api = {
    
}

export default { api }