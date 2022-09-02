import express from "express";
import { authenticateDB, syncModels } from "./db/index.js";
import cors from "cors";
import cartRouter from "./services/cart/index.js";
import reviewRouter from "./services/review/index.js";
import userRouter from "./services/users/index.js";
import categoryRouter from "./services/categories/index.js"
import Review from "./services/review/model.js";
import User from "./services/users/model.js";
import Product from "./services/cart/model.js";
import cartCategory from "./services/cart/cartCategoriesModel.js"
import Category from "./services/categories/model.js";

User.hasMany(Review);
Review.belongsTo(User);

Product.belongsToMany(Category, { through: cartCategory });
Category.belongsToMany(Product, { through: cartCategory });


const server = express();

server.use(express.json());

server.use(cors());
server.use("/products", cartRouter);
server.use("/users", userRouter);
server.use("/reviews", reviewRouter);
server.use("/categories", categoryRouter);

const { PORT = 5001 } = process.env;

const initalize = async () => {
  try {
    server.listen(PORT, async () => {
      console.log("Server is running on port " + PORT);
    });

    server.on("error", (error) => {
      console.log("server went down : " + error);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

authenticateDB()
  .then(async () => {
    await syncModels();
  })
  .then(() => {
    initalize();
  })
  .catch((e) => console.log(e));
