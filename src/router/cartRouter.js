const express = require('express')
const cartsManager = require('../cartManager.js')
const router = express.Router()

router.post('/', async (req, res) =>{
    res.send(await cartsManager.createCart())
})

router.get('/:cid', async (req, res) =>{
    const { cid } = req.params
    console.log(cid)
    res.send(await cartsManager.getProductsById(Number(cid)))
})

router.post('/:cid/products/:pid', async (req, res) =>{
    const { cid, pid } = req.params
    const { quantity } = req.query
    res.send(await cartsManager.addProductCart(Number(cid), Number(pid), Number(quantity)))
})



module.exports = router