# Event Platform Server

API para gerenciamento de eventos, pedidos, assentos e ingressos. O projeto usa
Node.js 22, TypeScript, Express, Drizzle ORM, PostgreSQL e integração com o TMDB.

## Requisitos

- Node.js 22 ou superior
- npm
- PostgreSQL local ou uma instância PostgreSQL no Neon

## Instalação

```bash
npm install
```

Crie um arquivo `.env` na raiz do projeto. O arquivo `.env` não deve ser
versionado.

## Variáveis de ambiente

```env
PORT=3333
CORS_ORIGINS=http://localhost:3000
POSTGRES_URL=...
JWT_SECRET_TOKEN=uma-chave-com-no-minimo-32-caracteres
TMDB_API_TOKEN=seu-token-da-api-do-tmdb
```

`PORT` é opcional e usa `3333` como padrão. `CORS_ORIGINS` deve conter os
domínios autorizados separados por vírgula. As outras três variáveis são
obrigatórias.

Exemplo com frontend publicado:

```env
CORS_ORIGINS=https://app.exemplo.com,https://admin.exemplo.com
```

Informe somente as origens completas, incluindo `https://`, sem barra final.
Não use `*` em produção.

### PostgreSQL via Docker

O arquivo `docker-compose.yml` cria um PostgreSQL com estas credenciais:

```yaml
POSTGRES_USER: docker
POSTGRES_PASSWORD: docker
POSTGRES_DB: events-plataform
```

Inicie o banco:

```bash
docker compose up -d db
```

Com o banco local iniciado, preencha o `.env` assim:

```env
POSTGRES_URL=postgres://docker:docker@localhost:5432/events-plataform
```

### PostgreSQL via Neon

Crie um projeto no Neon, copie a connection string fornecida pelo Neon e use-a
diretamente no `.env`:

```env
POSTGRES_URL=sua-url-de-conexao-fornecida-pelo-neon
```

Não substitua ou monte manualmente a URL do Neon. Use exatamente a URL gerada
no painel do banco.

## Banco de dados

Depois de preencher o `POSTGRES_URL`, gere as migrations quando alterar os
schemas:

```bash
npm run db:generate
```

Execute as migrations no banco configurado:

```bash
npm run db:migrate
```

## Seed

O seed cria um usuário de cada perfil e não duplica usuários com o mesmo
e-mail. Os usuários criados são:

| E-mail                     | Perfil       | Senha      |
| -------------------------- | ------------ | ---------- |
| `cliente1@example.com`     | `CLIENT`     | `12345678` |
| `organizador1@example.com` | `ORGANIZER`  | `12345678` |
| `porteiro1@example.com`    | `GATEKEEPER` | `12345678` |

Execute o seed depois das migrations:

```bash
npm run db:seed
```

## Executar em desenvolvimento

```bash
npm run dev
```

A API ficará disponível em `http://localhost:3333` quando `PORT=3333` estiver
definido.

## Build

```bash
npm run build
```

## Executar em produção

```bash
npm run start
```

O projeto usa o suporte do Node.js 22 para executar TypeScript diretamente.

## Documentação

Os requisitos funcionais foram definidos em [docs/REQUISITOS.md](docs/REQUISITOS.md).

## Decisões e processo de desenvolvimento

Esta seção descreve as decisões tomadas durante o desenvolvimento e a forma
como a IA foi utilizada como assistente de implementação.

### Arquitetura

A estrutura inicial foi definida manualmente antes da implementação das
funcionalidades. O projeto foi dividido em camadas para manter as regras de
negócio independentes do Express, do PostgreSQL e do TMDB:

- `routes`: define os endpoints e os middlewares aplicados;
- `controllers`: recebe a requisição, valida os dados de entrada e devolve a
  resposta HTTP;
- `use-cases`: concentra as regras de negócio;
- `repositories`: define contratos para acesso a dados;
- `repositories/drizzle`: implementa os contratos usando Drizzle ORM;
- `repositories/tmdb`: encapsula a integração com a API externa de filmes.

Essa separação permite trocar a implementação do banco ou do provedor externo
sem mover as regras de negócio para os controllers.

### Como as rotas foram pensadas

As rotas foram desenhadas a partir dos perfis e dos fluxos descritos em
[docs/REQUISITOS.md](docs/REQUISITOS.md). A autenticação é aplicada somente
onde existe uma operação protegida:

- usuários: cadastro e autenticação;
- filmes: catálogo e detalhes protegidos para `ORGANIZER`;
- eventos: listagem pública e criação protegida para `ORGANIZER`;
- pedidos: criação, listagem e alteração de status somente para o usuário
  autenticado;
- tickets: consulta compartilhada pública e validação protegida para
  `GATEKEEPER`.

As rotas foram agrupadas por recurso e montadas no router principal com os
prefixos `/users`, `/session`, `/movies`, `/events`, `/orders` e `/tickets`.
Assim, cada recurso possui seus próprios controllers e middlewares, evitando
que regras de autorização fiquem espalhadas pela aplicação.

### Fluxo de eventos e pedidos

No cadastro de eventos, os dados obrigatórios são validados antes da gravação e
o usuário precisa possuir o perfil `ORGANIZER`. A listagem geral permanece
pública, enquanto a listagem dos eventos do organizador usa autenticação.

Para pedidos, foi escolhido o envio de um array `seatIds`, permitindo reservar
um ou vários assentos no mesmo order. Todos os assentos são validados para
confirmar que pertencem ao evento e estão disponíveis.

A criação do pedido e a reserva dos assentos são feitas em uma transação do
PostgreSQL. Dessa forma, se uma etapa falhar, o order não fica criado sem seus
assentos ou deixa reservas parciais. Quando o pagamento simulado altera o order
para `APPROVED`, os assentos relacionados passam para `SOLD` e um ticket é
gerado para cada assento.

### Segurança dos tickets

Cada ticket recebe um hash aleatório de oito caracteres, formado por letras
maiúsculas e números. O conteúdo usado no QR Code inclui o ticket, o pedido, o
evento e o assento, além de uma assinatura HMAC criada com o segredo da
aplicação.

Na portaria, o ingresso pode ser localizado pelo hash ou pelo conteúdo do QR
Code. A validação confirma a assinatura, o evento, o status `VALID` e o perfil
`GATEKEEPER`. A alteração para `USED` é condicional ao status `VALID` no banco,
o que também impede duas validações concorrentes do mesmo ingresso.

### Uso da IA durante o desenvolvimento

A IA foi orientada a trabalhar sobre a estrutura já definida, respeitando os
contratos de repository, os casos de uso e o padrão dos arquivos existentes.
As solicitações foram feitas de forma incremental, sempre partindo de um
requisito específico, por exemplo:

1. criar os repositories Drizzle para eventos, pedidos, assentos e tickets;
2. criar as rotas de eventos e aplicar a autorização de organizador;
3. permitir vários `seatIds` na criação de um pedido;
4. gerar tickets ao aprovar um order;
5. criar a validação de tickets por hash ou QR Code para `GATEKEEPER`;
6. adaptar a entrada do Express para o deploy serverless da Vercel;
7. documentar instalação, banco, migrations, seed, build e execução.

A IA foi usada para propor e implementar alterações, mas as decisões de
produto, os perfis, os fluxos e a organização geral foram definidos no
projeto. Cada mudança foi conferida contra os requisitos, os arquivos atuais e
as interfaces existentes. Quando surgiu um problema com operações assíncronas
de `map`, por exemplo, o fluxo foi revisado e substituído por transação para
garantir consistência dos dados.
