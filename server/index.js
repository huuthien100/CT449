const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const { connectDb } = require("./utils/connectDb");
connectDb();

const routeUser = require("./routes/user");
const routeProduct = require("./routes/product");
const routeCart = require("./routes/cart");
const routeReceipt = require("./routes/receipt");
app.use("/api/auth", routeUser);
app.use("/api/product", routeProduct);
app.use("/api/cart", routeCart);
app.use("/api/receipt", routeReceipt);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
