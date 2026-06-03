const fs = require('fs/promises');
const path = require('path');

const productsPath = path.resolve(__dirname, '../data/products.json');

async function readProducts() {
  const data = await fs.readFile(productsPath, 'utf-8');
  return JSON.parse(data);
}

async function list(request, response) {
  const products = await readProducts();
  return response.json(products);
}

async function show(request, response) {
  const { id } = request.params;
  const products = await readProducts();
  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return response.status(404).json({
      message: 'Produto não encontrado.',
    });
  }

  return response.json(product);
}

module.exports = {
  list,
  show,
};
