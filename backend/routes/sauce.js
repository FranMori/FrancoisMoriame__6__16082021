const express =require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const cors = require('cors')

const sauceCtrl = require('../controllers/sauce')

router.post('/', auth, cors(), multer, sauceCtrl.createSauce)
router.put('/:id', auth, multer, sauceCtrl.modifySauce)
router.delete('/:id', auth, sauceCtrl.deleteSauce)
router.get('/:id', auth, sauceCtrl.getOneSauce)
router.get('/', auth, sauceCtrl.getAllSauces)
router.post('/:id/like', auth, sauceCtrl.likeStatus)

module.exports = router