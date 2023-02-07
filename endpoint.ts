

import express from "express";
import Processing from "./processing";
import EnpointDTO from "./interfaces/endpointDto";

const router = express.Router();

router.post("/", (req, res) => {
    const body: EnpointDTO = req.body;
    const { data } = body;

    const processing = new Processing(JSON.parse(data));
    const result = processing.returnDataCreator();

    res.json(result);
});

export default router;