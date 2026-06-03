const store = require('../lib/jsonStore');
const AppError = require('../lib/AppError');
const { validateProductId } = require('../lib/validators');

const ordersPath = store.resolveDataPath('orders.json');
const productsPath = store.resolveDataPath('products.json');

const PAYMENT_OPTIONS = ['Pix', 'Dinheiro'];
const ORDER_TYPES = ['reserva', 'compra'];

function nextId(items) {
  return items.reduce((max, item) => Math.max(max, item.id || 0), 0) + 1;
}

async function create(request, response) {
  const produtoId = validateProductId(request.body.produtoId);
  const { tamanho, pagamento } = request.body;
  const tipo = request.body.tipo || 'reserva';

  if (!tamanho || typeof tamanho !== 'string') {
    throw new AppError('O tamanho é obrigatório.', 400);
  }

  if (!PAYMENT_OPTIONS.includes(pagamento)) {
    throw new AppError('Forma de pagamento inválida.', 400);
  }

  if (!ORDER_TYPES.includes(tipo)) {
    throw new AppError('Tipo de pedido inválido.', 400);
  }

  const products = await store.read(productsPath);
  const product = products.find((item) => item.id === produtoId);

  if (!product || !product.disponivel) {
    throw new AppError('Produto não encontrado ou indisponível.', 404);
  }

  if (!product.tamanhos.includes(tamanho)) {
    throw new AppError('Tamanho indisponível para este produto.', 400);
  }

  const order = await store.update(ordersPath, (orders) => {
    const id = nextId(orders);
    const newOrder = {
      id,
      numero: `HPX-${String(id).padStart(4, '0')}`,
      userId: request.user.id,
      tipo,
      produto: {
        id: product.id,
        nome: product.nome,
        preco: product.preco,
      },
      tamanho,
      pagamento,
      status: tipo === 'compra' ? 'aguardando pagamento' : 'reservado',
      createdAt: new Date().toISOString(),
    };

    return { value: [...orders, newOrder], result: newOrder };
  });

  return response.status(201).json({
    message:
      tipo === 'compra'
        ? 'Pedido realizado com sucesso.'
        : 'Reserva registrada com sucesso.',
    order,
  });
}

async function listMine(request, response) {
  const orders = await store.read(ordersPath);
  const mine = orders
    .filter((order) => order.userId === request.user.id)
    .sort((a, b) => b.id - a.id);

  return response.json(mine);
}

module.exports = {
  create,
  listMine,
};
