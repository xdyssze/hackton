

import express from "express";
import ProcessingThread from "./processing.js"
//import Processing from "processing";

const router = express.Router();

router.post("/", (req, res) => {
    const { body } = req;
    const { data } = body;
    const processing = new ProcessingThread(data);

    const result = processing.returnDataCreator();
    res.json(result);
});

export default router;