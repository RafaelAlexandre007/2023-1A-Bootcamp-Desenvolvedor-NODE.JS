import express from "express";
import accountController from "../controllers/account.controller.js";


const router = express.Router();

router.post("/", accountController.createAccount);

router.get("/", accountController.getAccount);

router.get("/:id", accountController.getAccountId);

router.delete("/:id", accountController.deleteAccount)

router.put("/", accountController.putAccount);

router.patch("/updatebalance", accountController.patchAccount);

//Tratamento de erros
router.use((err, req, res, next) => {
    global.logger.error(`${err.message}`);
    res.status(400).send({ error: err.message })
})


//
export default router;