--table for user
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(255)NOT NULL,
  email VARCHAR(255) NOT NULL,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) DEFAULT 'viewer' CHECK (role IN ('viewer', 'editor', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


--table for products

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC NOT NULL,
    description TEXT NOT NULL,
    quantity INT NOT NULL,
    product_type VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


--table for cart
CREATE TABLE cart (
  cart_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id),
  total_price NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);


--table for cart products

CREATE TABLE cart_products (
  cart_product_id SERIAL PRIMARY KEY,
  cart_id INT REFERENCES cart(cart_id),
  product_id INT REFERENCES products(product_id),
  product_name VARCHAR(255),
  quantity INT DEFAULT 1,
  price NUMERIC
);
