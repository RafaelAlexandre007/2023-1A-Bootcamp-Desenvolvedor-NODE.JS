import SaleRepository from "../repositories/sale.repository.js";
import ClientRepository from "../repositories/client.repository.js";
import ProductRepository from "../repositories/product.repository.js";

async function createSale(sale) {
    let errors = "";
    if (!await ClientRepository.getClient(sale.client_id)) {
        errors = "The client_id not exist.";
    }

    const product = await ProductRepository.getProduct(sale.product_id);

    if (!product) {
        errors += "The product_id not exist.";
    }
    if (errors) {
        throw new Error(errors);
    }

    if (product.stock > 0) {

        sale = await SaleRepository.insertSale(sale);

        product.stock--;
        await ProductRepository.updateProduct(product);

        return sale;

    } else {
        throw new Error("Not exist Stock for the Product.")
    }


}

async function getSales(productId) {
    if (productId) {
        return await SaleRepository.getSalesByProductId(productId);
    }

    return await SaleRepository.getSales();
}

async function getSale(id) {
    return await SaleRepository.getSale(id);
}

async function deleteSale(id) {
    const sale = await SaleRepository.getSale(id);

    if (sale) {
        const product = await ProductRepository.getProduct(sale.product_id);
        await SaleRepository.deleteSale(id);

        product.stock++;
        await ProductRepository.updateProduct(product);
    } else {
        throw new Error("The id of sale not exist!");
    }

}

async function updateSale(sale) {

    const errors = [];
    if (!await ClientRepository.getClient(sale.client_id)) {
        errors.push("The client_id not exist!")
    }
    if (!await ProductRepository.getProduct(sale.product_id)) {
        errors.push("The product_id not exist!")
    }
    if (errors) {
        throw new Error(errors);
    }

    await SaleRepository.updateSale(sale);
}



export default {
    createSale,
    getSales,
    getSale,
    deleteSale,
    updateSale
}