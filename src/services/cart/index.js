import express from "express";
import Product from "./modal.js";
import { Op } from "sequelize";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const query = {};
    if (req.query.name) {
      console.log("here")
      query.name = {
        [Op.iLike]: `%${req.query.name}%`,
      };
    }
    if (req.query.price) {
      query.price = {
        [Op.between]: req.query.price.split(","),
      };
    }
    if (req.query.category) {
      query.category = {
        [Op.in]: req.query.category.split(","),
      };
    }
    const products = await Product.findAll({
      
       attributes: {
         exclude: [],
       },
      where: query,
    });

  ;
    res.send(products);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {

    const product = await Product.findByPk(req.params.id);
    res.send(product);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.send(product);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const product = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    res.send(product);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const product = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send({ rows: product });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;
