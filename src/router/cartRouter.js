const express = require('express')
const cartsManager = require('../cartManager.js')
const router = express.Router()

router.post('/', async (req, res) =>{
    res.send(await cartsManager.createCart())
})

router.get('/:cid', async (req, res) =>{
    const { cid } = req.params
    console.log(cid)
    const response = await cartsManager.getProductsById(Number(cid))
    if(response.ok){
        res.status(200).send(response)
    }
    else{
        res.status(400).send(response)
    }

})

router.post('/:cid/products/:pid', async (req, res) =>{
    const { cid, pid } = req.params
    const { quantity } = req.query
    const response = await cartsManager.addProductCart(Number(cid), Number(pid), Number(quantity))
    if(response.ok){
        res.status(200).send(response)
    }
    else{
        res.status(400).send(response)
    }

})

router.put('/:cid/products/:pid/:units', async (req, res) =>{
    const {cid, pid, units} = req.params
    const response = await cartsManager.addProductCart(Number(cid), Number(pid), Number(units))
    if(result.ok){
        res.status(200).send(response)
    }else{
        res.status(400).send(response)
    }
})

router.delete('/:cid/products/:pid/:unit', async ()=>{
    const {cid, pid, unit} = req.params
    const response = await cartsManager.deleteProducts(Number(cid), Number(pid), Number(unit))
    if(response?.ok){
        res.status(200).send(response)
    }
    else{
        res.status(400).send(response)
    }
})

module.exports = router