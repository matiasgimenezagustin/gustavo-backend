const express = require('express');

const app = express();
const port = 8080; 

app.use(express.json())

const productsRouter = require('./router/productRouter');
app.use('/api/products', productsRouter);

const cartRouter = require('./router/cartRouter')
app.use('/api/cart', cartRouter)


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


