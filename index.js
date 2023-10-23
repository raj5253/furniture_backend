const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors')

const productRoutes = require("./routes/products.routes")
const authRoutes = require("./routes/auth.routes")
const userRoutes = require("./routes/user.routes")
const cartRoutes = require("./routes/cart.routes")
const orderRoutes = require('./routes/order.routes');

const app = express();
const port = 3000;

dotenv.config();
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("db connected"))
  .catch((error) => console.log(error)); //very easy compared to mongodb


app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use("/api/products", productRoutes);
app.use("/api", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRoutes)


app.get("/", (req, res) => res.send("Hello World!"));
app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${process.env.PORT}!`));
