const Product = require("../../models/Product");
const {ImageUrl} = require('../../helpers/imageUrl')
//const fs = require('fs');


const productController = {};

productController.displayProduct = async(req,res) =>{
  const products = await Product.find({});
  res.send(products)
}


productController.addProduct = async (req, res) => {
  const file = req.file.filename;
  const newProduct = new Product({ ...req.body, image: file });
  newProduct.image = ImageUrl(req, newProduct.image);

  await newProduct.save();

  return res.json({ message: "Product added successfully", data: newProduct });
};

productController.deleteProduct = async (req,res) => {
  const product = Product.findById(req.params.id);
  if(!product){
    res.status(404).send("Product Not Found")
  }
  await(Product.findByIdAndDelete(req.params.id))
  res.status(200).send("Product Deleted Successfully")
}


productController.searchProduct = async (req,res) =>{
  //const filter = req.params.id;
  const query = req.params.productName;
  const product = await Product.find({productName : {$regex: new RegExp(query, 'i')}})
  if (!product){
    res.status(404).send("Product does not exist")
  }
  else{
    res.send(product)
  }
}

productController.updateProductQuantity = async (req,res) => {
  const query = req.params.id;
  const find = await Product.findById(query)
  if (!find) {
    return res.send('Product not Found')
  }
  const product = {
    quantity : req.body.quantity
  }
  const updatedProduct = await Product.findByIdAndUpdate(query, product, {new: true})
  res.send(updatedProduct)
}

productController.outOfStock = async (req, res) => {
  const products = await Product.find({quantity : {$lt: 5}})
  if (!products) {
    res.send("Empty!")
  }
  res.send(products)
}

//console.log(productController);
module.exports = productController;