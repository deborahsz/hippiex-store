const fs = require('fs/promises');
const path = require('path');

const ordersPath = path.resolve(__dirname, '../data/orders.json');
const productsPath = path.resolve(__dirname, '../data/products.json');

async function readJson(filePath) {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

async function saveOrders(orders) {
  await fs.writeFile(ordersPath, JSON.stringify(orders, null, 2));
}

async function create(request, response) {
  const { produtoId, tamanho, pagamento } = request.body;

  if (!produtoId || !tamanho || !pagamento) {
    return response.status(400).json({
      message: 'Produto, tamanho e pagamento são obrigatórios.',
    });
  }

  const products = await readJson(productsPath);
  const product = products.find((item) => item.id === Number(produtoId));

  if (!product || !product.disponivel) {
    return response.status(404).json({
      message: 'Produto não encontrado ou indisponível.',
    });
  }

  if (!product.tamanhos.includes(tamanho)) {
    return response.status(400).json({
      message: 'Tamanho indisponível para este produto.',
    });
  }

  if (!['Pix', 'Dinheiro'].includes(pagamento)) {
    return response.status(400).json({
      message: 'Forma de pagamento inválida.',
    });
  }

  const orders = await readJson(ordersPath);
  const order = {
    id: orders.length + 1,
    numero: `HPX-${String(orders.length + 1).padStart(4, '0')}`,
    produto: {
      id: product.id,
      nome: product.nome,
      preco: product.preco,
    },
    tamanho,
    pagamento,
    status: 'realizado',
    createdAt: new Date().toISOString(),
  };

  orders.push(order);
  await saveOrders(orders);

  return response.status(201).json({
    message: 'Pedido realizado com sucesso.',
    order,
  });
}

module.exports = {
  create,
};
