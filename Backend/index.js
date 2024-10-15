const express = require("express");

require("dotenv").config({ path: "./.env" });

const db = require("./connection.js");
const cors = require("cors");
const userRoute = require("./features/users/userApi.js");
const authRoute = require("./features/auth/authApi.js");
const restaurantRoute = require("./features/restaurants/restaurantApi.js");
const customerRoute = require("./features/customer/customerApi.js");
const deliveryPartnerRoute = require("./features/delivery_partner/deliveryPartnerApi.js");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");
const customError = require("./utils/customError.js");
const globalErrorHandler = require("./utils/globalErrorHandler.js");

const app = express();

db.check();

app.use(
  cors({
    origin: "http://192.1.200.168:8080",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const { generateKeyPairSync } = require("crypto");

const { privateKey, publicKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
  },
});

fs.writeFileSync("./privateKey.pem", privateKey);
fs.writeFileSync("./publicKey.pem", publicKey);

app.use("/api/v1/", userRoute);
app.use("/api/v1/", authRoute);
app.use("/api/v1/", restaurantRoute);
app.use("/api/v1/", customerRoute);
app.use("/api/v1/", deliveryPartnerRoute);
app.use("*", (req, res, next) => {
  const err = new customError("Page not found", 404);
  next(err);
});

app.use(globalErrorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log("server started");
});
