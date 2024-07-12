import express from  'express';
import mongoose from  'mongoose';
import cors from  'cors';

const app = express();
const port = 8081;

app.use(cors());
app.use(express.json());

// Conectando ao MongoDB
mongoose.connect('mongodb://localhost:27017/productDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Definindo o esquema do Produto
const productSchema = new mongoose.Schema({
  name: String,
  purchasePrice: Number,
  salePrice: Number,
  profit: Number,
});

// Definindo o modelo do Produto
const Product = mongoose.model('Product', productSchema);

// Rota para a raiz do servidor
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Rota para adicionar um novo produto
app.post('/api/products', async (req, res) => {
  try {
    const { name, purchasePrice, salePrice } = req.body;
    const profit = salePrice - purchasePrice;

    const product = new Product({
      name,
      purchasePrice,
      salePrice,
      profit,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota para obter todos os produtos
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
