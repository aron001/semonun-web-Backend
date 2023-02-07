const express = require('express')
const router = express.Router()

const {
    getallevents,
    searchevent,
    filmevents,
    musicevents,
    exhibitionevents,
    fashionevents,
    craftevents,
    sportevents,
    seminarevents,
    artevents,
    businessevents,
    partyevents,
    freeevents
}=require('../controllers/catagoryController')

router.get('/',  getallevents)
router.get('/search/:key', searchevent)

router.get('/film',filmevents)
router.get('/music',musicevents)
router.get('/exhibition',exhibitionevents)
router.get('/fashion',fashionevents)
router.get('/craft',craftevents)
router.get('/sport',sportevents)
router.get('/seminar',seminarevents)
router.get('/art',artevents)
router.get('/business',businessevents)
router.get('/party',partyevents)
router.get('/free',freeevents)
module.exports = router