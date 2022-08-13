const express = require("express");

const router = express.Router();
const { check, validationResult } = require("express-validator");
const calculateBMI = require("../helper/calculateBMI");
const classifieBMI = require("../helper/classifieBMI");

router.get("/status", (req, res) => {
  res.status(200);
  res.json({ status: "It's working bro!" });
});

router.get("/calculate");

router.post(
  "/calculate",
  [
    check("height").notEmpty().withMessage("Have you fill the height value"),
    check("height")
      .isNumeric()
      .withMessage("Make sure you fill with correct value (kg)"),
    check("height").isInt({ min: 1, max: 1000 }).withMessage("Is it possible?"),

    check("weight").notEmpty().withMessage("Have you fill the weight value?"),
    check("weight")
      .isNumeric()
      .withMessage("Make sure you fill with correct value (kg)"),
    check("weight").isInt({ min: 1, max: 3000 }).withMessage("Is it possible?"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      const { height, weight } = req.body;
      const resultBMI = calculateBMI(height, weight);
      const label = classifieBMI(resultBMI);

      res.status(200);
      res.json({ bmi: `${resultBMI}`, label: `${label}` });
    } catch (errors) {
      // console.log(errors.message);
      res.status(500).send("Something went wrong");
    }
  }
);

module.exports = router;
