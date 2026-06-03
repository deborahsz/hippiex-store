# Hippiex Store

Aplicativo mobile desenvolvido para a marca Hippiex, com o objetivo de apresentar camisetas e facilitar reservas/pedidos de forma simples.

O projeto foi feito como atividade acadêmica de React Native, com frontend em Expo e backend em Node.js.

## Sobre o projeto

A Hippiex é uma pequena marca de camisetas que fazia o atendimento principalmente por redes sociais e WhatsApp. A proposta do aplicativo é centralizar os produtos em um catálogo e permitir que o cliente escolha uma camiseta, selecione tamanho, forma de pagamento e finalize uma **reserva** ou uma **compra**.

O app não possui pagamento real integrado. A escolha entre Pix e Dinheiro é registrada apenas como parte do pedido, e o pagamento é combinado fora do aplicativo.

## Tecnologias utilizadas

### Frontend

- React Native
- Expo SDK 54
- React Navigation (com fluxo autenticado e não autenticado)
- Context API (estado de autenticação)
- AsyncStorage (sessão persistente)
- Axios (com interceptor de token JWT)

### Backend

- Node.js
- Express
- API REST
- Autenticação com JWT (`jsonwebtoken`)
- Hash de senha com `bcryptjs`
- Arquivos JSON para armazenamento local (escrita atômica e serializada)

## Estrutura de pastas

```txt
.
├── backend
│   ├── src
│   │   ├── config        # configuração via variáveis de ambiente
│   │   ├── controllers
│   │   ├── data          # produtos, usuários, pedidos e imagens
│   │   ├── lib           # store JSON seguro, validadores, helpers
│   │   ├── middlewares   # autenticação e tratamento de erros
│   │   └── routes
│   └── test              # testes (node:test)
└── frontend
    └── src
        ├── components
        ├── context       # AuthContext
        ├── navigation
        ├── screens
        ├── services      # cliente axios
        └── utils         # formatação
```

## Funcionalidades

- Cadastro de usuário (senha protegida com hash)
- Login com geração de token JWT
- Sessão persistente (continua logado ao reabrir o app) e logout
- Catálogo de camisetas
- Detalhes do produto
- Reserva **ou** compra (com escolha de tamanho e forma de pagamento)
- Registro de pedido vinculado ao usuário autenticado
- Histórico de pedidos do usuário
- Confirmação com número do pedido

## Como executar o projeto

Antes de começar, instale as dependências do backend e do frontend.

### Backend

```bash
cd backend
npm install
cp .env.example .env   # opcional em desenvolvimento
npm run dev            # usa nodemon (recarrega ao salvar)
```

A API ficará disponível em:

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

Depois, escaneie o QR Code com o aplicativo Expo Go no celular.

Para limpar o cache do Expo, use:

```bash
npx expo start -c
```

## Variáveis de ambiente (backend)

As variáveis ficam em `backend/.env` (veja `backend/.env.example`):

| Variável         | Descrição                                                        | Padrão (dev)             |
| ---------------- | ---------------------------------------------------------------- | ------------------------ |
| `PORT`           | Porta da API                                                     | `3333`                   |
| `NODE_ENV`       | `development` ou `production`                                    | `development`            |
| `JWT_SECRET`     | Segredo para assinar tokens (**obrigatório em produção**)        | valor inseguro de dev    |
| `JWT_EXPIRES_IN` | Expiração do token (ex.: `7d`, `12h`)                            | `7d`                     |
| `BCRYPT_ROUNDS`  | Custo do hash bcrypt                                             | `10`                     |
| `CORS_ORIGIN`    | `*` ou lista de origens separadas por vírgula                   | `*`                      |

## Configuração da URL da API (frontend)

A URL base é resolvida automaticamente em `src/services/api.js`:

1. Se `EXPO_PUBLIC_API_URL` estiver definida, ela é usada (ex.: API publicada).
2. Em dispositivo físico via Expo Go, usa o host do Metro automaticamente.
3. Em emulador Android, usa `10.0.2.2`; em simulador iOS/web, usa `localhost`.

Para forçar uma URL específica, crie `frontend/.env`:

```txt
EXPO_PUBLIC_API_URL=http://192.168.0.10:3333
```

## Endpoints da API

```txt
POST /auth/register     -> cria conta e retorna { token, user }
POST /auth/login        -> autentica e retorna { token, user }
GET  /products          -> lista de produtos (público)
GET  /products/:id      -> detalhes de um produto (público)
POST /orders            -> cria pedido (requer Authorization: Bearer <token>)
GET  /orders            -> pedidos do usuário autenticado
GET  /health            -> verificação de status
```

As rotas de pedidos exigem o cabeçalho `Authorization: Bearer <token>`.

## Testes e qualidade

```bash
# Backend
cd backend
npm test     # testes de unidade e integração (node:test)
npm run lint # ESLint

# Frontend
cd frontend
npm run lint # ESLint (config do Expo)
```

## Observações para testar no celular

- O computador e o celular precisam estar na mesma rede Wi-Fi.
- O backend precisa estar rodando antes de usar o app.
- O projeto está usando Expo SDK 54, compatível com Expo Go 54.
- Para fazer login, primeiro crie uma conta na tela de cadastro.

## Segurança e dependências

- Senhas nunca são armazenadas em texto puro: são salvas com hash bcrypt e
  jamais retornadas pela API.
- O `npm audit` do frontend reporta vulnerabilidades **moderadas** restritas ao
  toolchain de build do Expo (`@expo/cli`, `config-plugins`, `postcss`, `uuid`).
  São dependências de desenvolvimento, não vão para o bundle do app, e o único
  "fix" disponível é atualizar o Expo SDK (mudança breaking). Por isso não são
  corrigidas com `npm audit fix --force`; elas se resolvem ao subir o SDK.

## Produtos cadastrados

O catálogo inicial possui 4 camisetas da marca Hippiex, cada uma com nome, preço, descrição, imagem e tamanhos disponíveis.

## Autora

Deborah Alves Correia Vigliar
