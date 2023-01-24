import express from "express";

const router = express.Router();

router.get("/carros", (req, res) => {
    console.log("Get /carros");
    res.send("Get /carros");
});

export default router;