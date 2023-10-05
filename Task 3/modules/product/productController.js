const Product = require("../../models/Product");

const productController = {};

productController.displayProduct = async(req,res) =>{
  const products = await Product.find({});
  res.send(products)
}


productController.addProduct = async (req, res) => {
  const newProduct = new Product({ ...req.body });

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
console.log(productController);
module.exports = productController;