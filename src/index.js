import express from "express";
import { authenticateDB, syncModels } from "./db/index.js";
import cors from "cors";
import cartRouter from "./services/cart/index.js";

const server = express();

server.use(express.json());

server.use(cors());
server.use("/products", cartRouter);

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
