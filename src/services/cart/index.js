import express from "express";
import Product from "./model.js";
import Category from "../categories/model.js";
import { Op } from "sequelize";
import CartCategory from "./cartCategoriesModel.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const carts = await Product.findAll({
      include:{
          model: Category,
          attributes: ["name", "id"],
          through: { attributes: [] },
        }
      
    });
    res.send(carts)
  }
  /*try {
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
  }*/
   catch (error) {
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
    const newCart = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
    });

    if (newCart.id) {
      const dataToInsert = req.body.categories.map((categoryId) => ({
        categoryId: categoryId,
        ProductId: newCart.id,
      }));

      await CartCategory.bulkCreate(dataToInsert);
    }

    res.send(newCart);
  } catch (error) {
    console.log(error);
    next(error);
  }
})

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
router.post("/:cartId/add/:categoryId", async (req, res, next) => {
  try {
    const result = await CartCategory.create({
      categoryId: req.params.categoryId,
      cartId: req.params.cartId,
    });

    res.send(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/:cartId/delete/:categoryId", async (req, res, next) => {
  try {
    const result = await CartCategory.destroy({
      where: {
        categoryId: req.params.categoryId,
        cartId: req.params.cartId,
      },
    });
    res.send({ rows: result });
  } catch (error) {
    console.log(error);
  }
});

export default router;
