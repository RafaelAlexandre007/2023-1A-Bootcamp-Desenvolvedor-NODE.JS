import SaleService from "../services/sale.service.js";

async function createSale(req, res, next) {

    try {
        let sale = req.body;
        if (!sale.value || !sale.date || !sale.client_id || !sale.product_id) {
            throw new Error("Value, Date, Client_id and Product_id are necessary!")
        }

        sale = await SaleService.createSale(sale);
        res.send(sale);

        logger.info(`POST /sale - ${JSON.stringify(sale)}`);

    } catch (error) {
        next(error);
    }
}

async function getSales(req, res, nex) {
    try {

        res.send(await SaleService.getSales(req.query.product_id));
        logger.info("GET /sale");
    } catch (error) {
        nex(error)
    }
}

async function getSale(req, res, nex) {
    try {

        res.send(await SaleService.getSale(req.params.id));
        logger.info(`GET /sale/${id}`);
    } catch (error) {
        nex(error)
    }
}

async function deleteSale(req, res, nex) {
    try {
        await SaleService.deleteSale(req.params.id);
        res.end();
        logger.info("DELETE /sale")
    } catch (error) {
        nex(error)
    }
}

async function updateSale(req, res, nex) {
    try {
        let sale = req.body;

        if (sale.sale_id || !sale.value || !sale.date || !sale.client_id || !sale.product_id) {
            throw new Error("Sale_id, Value, Date, Client_id and Product_id are necessary!")
        }

        //SaleService
        sale = await SaleService.updateSale(sale)
        res.send(sale);

        logger.info(`PUT /sale - ${JSON.stringify(sale)}`);
    } catch (error) {
        nex(error)
    }
}


export default {
    createSale,
    getSales,
    getSale,
    deleteSale,
    updateSale
}