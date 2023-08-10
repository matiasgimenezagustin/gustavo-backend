const http = require('http'); 
const express = require('express');
const { engine } = require('express-handlebars');
const cors = require('cors');
const { manager } = require('./productManager');
const WebSocket = require('ws');  

const app = express();
const port = 8080;

const server = http.createServer(app);  

const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', async (req, res) => {
  res.render('home', { products: await manager.getProducts() });
});

app.get('/realtimeProducts', async (req, res) => {
  res.render('index', { products: await manager.getProducts() });
});


const wss = new WebSocket.Server({ noServer: true }); 

wss.on('connection',async (websocket) => {
  websocket.send(JSON.stringify(await manager.getProducts()));

  websocket.on('message', async (message) => {

    const newProduct = JSON.parse(message);
    await manager.addProduct(newProduct)
    const updatedProducts = await manager.getProducts()

    wss.clients.forEach(async (client) => {
      if (client.readyState === WebSocket.OPEN) {
        console.log(updatedProducts)
        client.send(JSON.stringify(updatedProducts));
      }
    });
    
  });
});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (websocket) => {
    wss.emit('connection', websocket, request);
  });
});

const productsRouter = require('./router/productRouter');
app.use('/api/products', productsRouter);

const cartRouter = require('./router/cartRouter');
app.use('/api/cart', cartRouter);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});