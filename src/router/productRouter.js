const express = require('express')

const router = express.Router()

const manager = require('../productManager').manager; 

router.get('/', async (req, res) => {
    const { limit } = req.query;
    if (limit) {
        res.json(await manager.getProducts(Number(limit)));
    } else {
        res.json(await manager.getProducts());
    }
});

router.get('/:pid', async (req, res) => {
    const pid = req.params.pid;
    const product = await manager.getProductById(pid);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

router.post('/', async (req, res) =>{
    /* const {title, description, code, price, status, stock, category} = req.body */
    const newProduct = req.body
    res.send(await manager.addProduct(newProduct))
})

router.put('/:pid', async (req, res)=>{
    const updatedProduct = req.body
    const {pid} = req.params
    res.send(await manager.updateProduct(pid, updatedProduct))
})

router.delete('/:pid', async (req, res) =>{
    const {pid} = req.params
    res.send(await manager.deleteById(pid))
})


module.exports = router;