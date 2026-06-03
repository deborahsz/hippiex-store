# Hippiex Store

Aplicativo mobile da Hippiex para catálogo de camisetas, reservas e pedidos.

O projeto foi desenvolvido como atividade acadêmica de React Native. Ele reúne um frontend em Expo e uma API em Node.js, com autenticação, catálogo de produtos, registro de pedidos e histórico por usuário.

## Sobre

A Hippiex atende clientes interessados em camisetas estampadas. A ideia do app é deixar esse fluxo mais organizado: o cliente cria uma conta, consulta os produtos, escolhe tamanho e forma de pagamento, e registra uma reserva ou compra.

O pagamento não é processado dentro do aplicativo. As opções Pix e Dinheiro ficam salvas no pedido para combinar o acerto fora do app.

## Funcionalidades

- Cadastro e login de usuário
- Senhas salvas com hash bcrypt
- Autenticação com token JWT
- Sessão persistente no aplicativo
- Catálogo com imagens e detalhes das camisetas
- Reserva ou compra com seleção de tamanho
- Registro de pedidos por usuário autenticado
- Histórico de pedidos
- Testes automatizados no backend

## Tecnologias

### Frontend

- React Native
- Expo SDK 54
- React Navigation
- Context API
- AsyncStorage
- Axios

### Backend

- Node.js
- Express
- JWT
- bcryptjs
- Arquivos JSON para dados locais
- node:test
- ESLint

## Estrutura

```txt
.
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── data
│   │   ├── lib
│   │   ├── middlewares
│   │   └── routes
│   └── test
└── frontend
    └── src
        ├── components
        ├── context
        ├── navigation
        ├── screens
        ├── services
        └── utils
```

## Como executar

Instale as dependências em cada pasta.

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

A API roda em:

```txt
http://localhost:3333
```

### Frontend

Em outro terminal:

```bash
cd frontend
npm install
npx expo start
```

Depois, abra pelo Expo Go ou pelo emulador.

Para limpar o cache do Expo:

```bash
npx expo start -c
```

## Variáveis de ambiente

As variáveis do backend ficam em `backend/.env`. Use `backend/.env.example` como base.

| Variável | Descrição | Padrão em desenvolvimento |
| --- | --- | --- |
| `PORT` | Porta da API | `3333` |
| `NODE_ENV` | Ambiente da aplicação | `development` |
| `JWT_SECRET` | Segredo usado nos tokens | valor local de desenvolvimento |
| `JWT_EXPIRES_IN` | Tempo de validade do token | `7d` |
| `BCRYPT_ROUNDS` | Custo do hash bcrypt | `10` |
| `CORS_ORIGIN` | Origens liberadas no CORS | `*` |

## URL da API no app

O frontend tenta descobrir automaticamente a URL da API durante o desenvolvimento. Em celular físico pelo Expo Go, ele usa o host do Metro. No emulador Android, usa `10.0.2.2`. Em iOS/web, usa `localhost`.

Para definir manualmente:

```txt
EXPO_PUBLIC_API_URL=http://192.168.0.10:3333
```

## Endpoints

```txt
POST /auth/register
POST /auth/login
GET  /products
GET  /products/:id
POST /orders
GET  /orders
GET  /health
```

As rotas de pedidos exigem `Authorization: Bearer <token>`.

## Testes

Backend:

```bash
cd backend
npm test
npm run lint
```

Frontend:

```bash
cd frontend
npm run lint
```

## Produtos

O catálogo inicial possui quatro camisetas da Hippiex, cada uma com nome, preço, descrição, imagem e tamanhos disponíveis.

## Autora

Deborah Alves Correia Vigliar
