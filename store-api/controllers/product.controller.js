import ProductService from "../services/product.service.js";


async function createProduct(req, res, next) {

    try {
        let product = req.body;
        if (!product.name || !product.description || !product.value || !product.stock || !product.supplier_id) {
            throw new Error("Name, Description, Value, Stock and Supplier Id are necessary!")
        }

        //ProductService
        product = await ProductService.createProduct(product);
        res.send(product);

        logger.info(`POST /product - ${JSON.stringify(product)}`);

    } catch (error) {
        next(error);
    }
}

async function getProducts(req, res, nex) {
    try {

        res.send(await ProductService.getProducts());
        logger.info("GET /product");
    } catch (error) {
        nex(error)
    }
}

async function getProduct(req, res, nex) {
    try {

        res.send(await ProductService.getProduct(req.params.id));
        logger.info(`GET /product/${id}`);
    } catch (error) {
        nex(error)
    }
}

async function deleteProduct(req, res, nex) {
    try {
        await ProductService.deleteProduct(req.params.id);
        res.end();
        logger.info("DELETE /product")
    } catch (error) {
        nex(error)
    }
}

async function updateProduct(req, res, nex) {
    try {
        let product = req.body;

        if (!product.product_id || !product.name || !product.description || !product.value || !product.stock || !product.supplier_id) {
            throw new Error("Name, Description, Value, Stock and Supplier Id are necessary!")
        }

        //ProductService
        product = await ProductService.updateProduct(product)
        res.send(product);

        logger.info(`PUT /product - ${JSON.stringify(product)}`);
    } catch (error) {
        nex(error)
    }
}


export default {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct
}