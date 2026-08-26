# Event Platform Server

## Decisões e processo de desenvolvimento

### Estrutura definida sem IA

A estrutura inicial do backend foi conduzida manualmente por mim.
Foram definidos o escopo da API, a organização em camadas e a base técnica em
Node.js, TypeScript, Express, Drizzle ORM e PostgreSQL.

Também fazem parte dessa etapa a organização de `src/`, os contratos de
repositório, os casos de uso, controllers, rotas, schema de usuários e a
definição dos perfis `CLIENT`, `ORGANIZER` e `GATEKEEPER`. A intenção foi manter
as regras de negócio desacopladas de detalhes como banco de dados e serviços
externos.

### Apoio do Codex (IA) / Copilot

Após a definição da estrutura, a IA foi usado como assistente de
implementação para as rotas e integrações restantes. As decisões de produto detalhadas em
`/docs/REQUISITOS.md`

O apoio da IA foi aplicado nas seguintes partes:

- Integração com a API do TMDB em `src/repositories/tmdb/`. (Foi pedido para que fosse adicionado
  4 rotas distintas que fornece os filmes: em cartaz, populares, em breve, e uma geral)
