import Review from "./model.js";
import User from "../users/model.js";
import express from "express";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
     include: User, 
    });

    res.send(reviews);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
    res.send(review);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newReview = await Review.create({
      content: req.body.content,
      userId: req.body.userId,
    });

    res.send(newReview);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const updatedReview = await Review.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    res.send(updatedReview);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const result = await Review.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.send({ rows: result });
  } catch (error) {
    console.log(error);
    next(error);
  }
});
export default router;
