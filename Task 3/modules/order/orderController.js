const Order = require("../../models/Order");
const User = require("../../models/User");
const Product = require("../../models/Product");
const Cart = require("../../models/Cart");

const mjml = require("mjml");
const transporter = require("../../helpers/nodemailer");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const { configDotenv } = require("dotenv");

const orderController = {};

orderController.addToCart = async (req, res) => {
  const userId = req.body.userId;

  const productId = `${req.body.productId}`;
  const quantity = parseInt(req.body.quantity || 1);

  let cart = await Cart.findOne({ user: userId }).populate("products");
  if (!cart) {
    cart = new Cart({ user: userId, products: [] });
  }

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  const price = product.productPrice;
  const product_name = product.productName;


  console.log(cart.products.length);
  if (cart.products.length > 0) {
    for (const i of cart.products) {
      if (i.product_id.equals(product._id)) {
        const existingCartItem = i;
        console.log(existingCartItem);
        existingCartItem.quantity += quantity;
        existingCartItem.price = existingCartItem.quantity * price;
      } else {
        cart.products.push({
          product_id: productId,
          quantity: quantity,
          price: price,
          productName: product_name,
        });
      }
    }
  } else {
    cart.products.push({
      product_id: productId,
      quantity: quantity,
      price: price,
      productName: product_name,
    });
  }

  const total_price = cart.products.reduce(
    (acc, product) => acc + product.price,
    0
  );
  cart.totalPrice = total_price;
  await cart.save();

  res.status(200).json({ message: "Product added to the cart", data: cart });
  //console.log(cart);
};

orderController.checkOut = async (req, res) => {
  const userId = req.body.userId;
  const user = await User.findOne({ _id: userId });
  const cart = await Cart.findOne({ user: userId }).populate("products");
  //console.log((user));
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }
  const order = new Order({
    user: user,
    products: cart.products,
    totalPrice: cart.totalPrice,
  });

  try {
    // Save the order to the database
    await order.save();
    const orderDetails = await Order.findById(order._id);

    //sending mail
    const mjmlTemplate = fs.readFileSync(
      path.resolve(__dirname, "../../helpers/invoice.mjml"),
      "utf8"
    );
    //console.log(mjmlTemplate);
    const template = ejs.compile(mjmlTemplate);
    const mjmlContent = template(orderDetails);
    //console.log(mjmlContent);

    const { html } = mjml(mjmlContent);

    const info = {
      from: `"Ecommerce" <${process.env.SENDER_EMAIL}>`,
      to: orderDetails.user.email,
      subject: "Invoice",
      text: "Test",
      html: html,
    };

    await transporter.sendMail(info);

    // Clearing the user's cart after checkout
    cart.products = [];
    await cart.save();

    return res.status(200).json({ message: "Checkout successful", order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = orderController;
