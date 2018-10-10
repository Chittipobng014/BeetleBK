import api from '../api/api'
var router = require('express').Router()


router.post('/getallboxs', api.getAllBoxs)

router.get('/', (req, res, next) => {
    res.send(200)
})

export default router