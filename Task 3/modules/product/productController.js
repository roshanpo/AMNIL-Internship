//const Product = require("../../models/Product");
const pool = require('../../db/config');
//const {ImageUrl} = require('../../helpers/imageUrl')
//const fs = require('fs');


const productController = {};

productController.displayProduct = async(req,res) =>{
  const products = await pool.query("SELECT * FROM products");
  if(products.rowCount<0){
    res.send("There are No products!")
  }
  res.send(products.rows)
}


productController.addProduct = async (req, res) => {
  //const file = req.file.filename;
  //const newProduct = new Product({ ...req.body, image: file });
  //newProduct.image = ImageUrl(req, newProduct.image);
  const product = {
      name: req.body.name,
      price : req.body.price,
      quantity : req.body.quantity,
      description : req.body.description,
      productType : req.body.type
    };

  const newProduct = await pool.query('INSERT INTO products (name, price, quantity, description, product_type) VALUES ($1, $2, $3, $4, $5) RETURNING *', [product.name,product.price, product.quantity, product.description, product.productType]);

  return res.json({ message: "Product added successfully", data: newProduct.rows });
};

productController.deleteProduct = async (req,res) => {
  const product = await pool.query('SELECT * FROM products WHERE product_id=$1', [req.params.id]);
  if (user.rowCount === 0) {
      return res.status(404).send('Product not found');
  }

  await pool.query('DELETE FROM products WHERE product_id=$1', [req.params.id]);
  res.status(200).send('Product deleted');
}


productController.searchProduct = async (req,res) =>{
  //const filter = req.params.id;
  const query = req.params.productName;
  const product = await ('SELECT * FROM products WHERE name ILIKE $1', [query]);
  if (!product){
    res.status(404).send("Product does not exist")
  }
  else{
    res.send(product)
  }
}

productController.updateProductQuantity = async (req,res) => {
  const query = req.params.id;
  const find = pool.query('SELECT * FROM products WHERE product_id=$1', [query]);
  if (!find) {
    return res.send('Product not Found')
  }
  const quantity = req.body.quantity
  
  const updatedProduct = await pool.query('UPDATE products SET quantity=$1 WHERE product_id = $2 RETURNING *',[quantity, query]);
  res.send(updatedProduct.rows)
}

/*productController.outOfStock = async (req, res) => {
  const products = await Product.find({quantity : {$lt: 5}})
  if (!products) {
    res.send("Empty!")
  }
  res.send(products)
}*/

//console.log(productController);
module.exports = productController;