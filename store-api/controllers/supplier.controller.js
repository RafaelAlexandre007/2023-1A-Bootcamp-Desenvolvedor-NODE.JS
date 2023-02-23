import SupplierService from "../services/supplier.service.js";

async function createSupplier(req, res, next) {

    try {
        let supplier = req.body;
        if (!supplier.name || !supplier.cnpj || !supplier.phone || !supplier.email || !supplier.address) {
            throw new Error("Name, CNPJ, Phone, Email and Address are necessary!")
        }

        //SupplierService
        supplier = await SupplierService.createSupplier(supplier);
        res.send(supplier);

        logger.info(`POST /supplier - ${JSON.stringify(supplier)}`);

    } catch (error) {
        next(error);
    }
}

async function getSuppliers(req, res, nex) {
    try {

        res.send(await SupplierService.getSuppliers());
        logger.info("GET /supplier");
    } catch (error) {
        nex(error)
    }
}

async function getSupplier(req, res, nex) {
    try {

        res.send(await SupplierService.getSupplier(req.params.id));
        logger.info(`GET /supplier/${id}`);
    } catch (error) {
        nex(error)
    }
}

async function deleteSupplier(req, res, nex) {
    try {
        await SupplierService.deleteSupplier(req.params.id);
        res.end();
        logger.info("DELETE /supplier")
    } catch (error) {
        nex(error)
    }
}

async function updateSupplier(req, res, nex) {
    try {
        let supplier = req.body;

        if (!supplier.supplier_id || !supplier.name || !supplier.cnpj || !supplier.phone || !supplier.email || !supplier.address) {
            throw new Error("Name, CNPJ, Phone, Email and Address are necessary!")
        }

        //SupplierService
        supplier = await SupplierService.updateSupplier(supplier)
        res.send(supplier);

        logger.info(`PUT /supplier - ${JSON.stringify(supplier)}`);
    } catch (error) {
        nex(error)
    }
}


export default {
    createSupplier,
    getSuppliers,
    getSupplier,
    deleteSupplier,
    updateSupplier
}