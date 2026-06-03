const store = require('../lib/jsonStore');
const AppError = require('../lib/AppError');
const { validateProductId } = require('../lib/validators');

const productsPath = store.resolveDataPath('products.json');

async function list(_request, response) {
  const products = await store.read(productsPath);
  return response.json(products);
}

async function show(request, response) {
  const id = validateProductId(request.params.id);
  const products = await store.read(productsPath);
  const product = products.find((item) => item.id === id);

  if (!product) {
    throw new AppError('Produto não encontrado.', 404);
  }

  return response.json(product);
}

module.exports = {
  list,
  show,
};
