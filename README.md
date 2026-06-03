# Hippiex Store

Aplicativo mobile desenvolvido para a marca Hippiex, com o objetivo de apresentar camisetas e facilitar reservas/pedidos de forma simples.

O projeto foi feito como atividade acadêmica de React Native, com frontend em Expo e backend em Node.js.

## Sobre o projeto

A Hippiex é uma pequena marca de camisetas que fazia o atendimento principalmente por redes sociais e WhatsApp. A proposta do aplicativo é centralizar os produtos em um catálogo e permitir que o cliente escolha uma camiseta, selecione tamanho, forma de pagamento e finalize uma reserva.

O app não possui pagamento real integrado. A escolha entre Pix e Dinheiro é registrada apenas como parte do pedido.

## Tecnologias utilizadas

### Frontend

- React Native
- Expo SDK 54
- React Navigation
- Axios
- useState
- useEffect

### Backend

- Node.js
- Express
- API REST
- Arquivos JSON para armazenamento local

## Estrutura de pastas

```txt
.
├── backend
│   └── src
│       ├── controllers
│       ├── data
│       └── routes
└── frontend
    └── src
        ├── assets
        ├── components
        ├── navigation
        ├── screens
        └── services
```

## Funcionalidades

- Cadastro de usuário
- Login
- Catálogo de camisetas
- Detalhes do produto
- Escolha de tamanho
- Escolha da forma de pagamento
- Registro de pedido/reserva
- Confirmação com número do pedido

## Como executar o projeto

Antes de começar, instale as dependências do backend e do frontend.

### Backend

Abra um terminal na pasta do projeto e rode:

```bash
cd backend
npm install
npm run dev
```

A API ficará disponível em:

```txt
http://localhost:3333
```

### Frontend

Abra outro terminal na pasta do projeto e rode:

```bash
cd frontend
npm install
npx expo start
```

Depois, escaneie o QR Code com o aplicativo Expo Go no celular.

Para limpar o cache do Expo, use:

```bash
npx expo start -c
```

## Observações para testar no celular

- O computador e o celular precisam estar na mesma rede Wi-Fi.
- O backend precisa estar rodando antes de usar o app.
- O projeto está usando Expo SDK 54, compatível com Expo Go 54.
- Para fazer login, primeiro crie uma conta na tela de cadastro.

## Endpoints da API

```txt
POST /auth/register
POST /auth/login
GET /products
GET /products/:id
POST /orders
```

## Produtos cadastrados

O catálogo inicial possui 4 camisetas da marca Hippiex, cada uma com nome, preço, descrição, imagem e tamanhos disponíveis.

## Autora

Deborah Alves Correia Vigliar
