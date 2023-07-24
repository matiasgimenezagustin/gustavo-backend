const express = require('express');
const manager = require('./ProductManager').manager; 

const app = express();
const port = 3000; 

app.get('/products', async (req, res) => {
  const { limit } = req.query;

  if (limit) {
    res.json(await manager.getProducts(Number(limit)));
  } else {
    res.json(await manager.getProducts());
  }
});

app.get('/products/:pid', async (req, res) => {
  const pid = req.params.pid;
  const product = await manager.getProductById(pid);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});