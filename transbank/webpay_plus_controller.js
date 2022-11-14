const express = require('express');
const router = express.Router();
var webpayPlusController = require("./webpay_plus");
const WebpayPlus = require("transbank-sdk").WebpayPlus;

router.use(function (req, res, next) {
  if (process.env.WPP_CC && process.env.WPP_KEY) {
    WebpayPlus.configureForProduction(process.env.WPP_CC, process.env.WPP_KEY);
  } else {
    WebpayPlus.configureForTesting();
  }
  next();
});

router.get("/create/:id", webpayPlusController.create);
router.get("/commit", webpayPlusController.commit);
router.post("/commit", webpayPlusController.commit);
router.post("/status", webpayPlusController.status);
router.post("/refund", webpayPlusController.refund);

module.exports = router;
