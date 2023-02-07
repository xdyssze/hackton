

import express from "express";
import endpoint from "./endpoint";
import database from "./db";

const app = express();
const port = process.env.PORT || 6000;

app.use("/", endpoint);

app.listen(port, () => console.log(`Listening on port ${port}...`));