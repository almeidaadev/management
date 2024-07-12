import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  purchasePrice: {
    type: Number,
    required: true,
  },
  salePrice: {
    type: Number,
    required: true,
  },
  profit: {
    type: Number,
    required: true,
  },
});


export default Product = mongoose.model('Product', productSchema);

// const Product = mongoose.model('Product', productSchema);

// module.exports = Product;
