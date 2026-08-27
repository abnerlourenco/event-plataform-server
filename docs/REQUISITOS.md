# Especificação de Requisitos da Aplicação

---

## Cadastro e Autenticação de Usuários

### RF

- Deve ser possível cadastrar um novo usuário. - OK
- Deve ser possível realizar a autenticação (login) do usuário. - OK

### RN

- Não deve ser possível cadastrar um usuário com e-mail já existente. - OK
- As senhas devem ser salvas de forma criptografada no banco de dados. - OK
- O perfil padrão do usuário ao se cadastrar deve ser `CLIENT` (Cliente). - OK
- Apenas usuários com perfil administradores podem cadastrar outros usuários com perfis especiais (`ORGANIZER` ou `GATEKEEPER`).

---

## Importação de Catálogo Externo

### RF

- Deve ser possível buscar de filmes de APIs externas (TMDb). - OK

### RN

- Apenas usuários administradores ou com perfil `ORGANIZER` podem realizar a busca e importação do catálogo externo. - OK

---

## Gestão de Eventos

### RF

- Deve ser possível cadastrar um novo evento. -OK
- Deve ser possível listar os eventos cadastrados pelo organizador. -OK

### RN

- Ao agendar um evento, deve-se salvar a referência do provedor (`event_provider`) e o identificador externo (`external_id`) para evitar duplicidade. -OK
- Não deve ser possível cadastrar um evento sem definir local, data/hora, capacidade total e preço. -OK
- Não deve ser possível cadastrar um evento caso o usuário não seja do perfil `ORGANIZER`. -OK
- Ao cadastrar um evento, a aplicação deve gerar automaticamente o mapa de assentos associado.

---

## Listagem e Busca de Eventos

### RF

- Deve ser possível listar todos os eventos disponíveis na plataforma. -OK
- Deve ser possível buscar e filtrar eventos por título, data.

### RN

- Não deve ser necessário estar logado para listar ou buscar eventos. -OK

---

## Reserva e Checkout de Ingressos

### RF

- Deve ser possível criar um order com um ou mais assentos(`seat`). -OK
- Deve ser possível criar um pedido (`order`) para reserva e pagamento. -OK
- Deve ser possível simular o fluxo de pagamento com aprovação, recusa ou cancelamento. -OK

### RN

- O usuário deve estar logado na aplicação para realizar a reserva e compra do ingresso. -OK
- Não deve ser possível reservar um assento que já esteja marcado com status `RESERVED` ou `SOLD`. -OK
- Não deve ser possível vender uma quantidade de ingressos de pista superior à capacidade (`capacity`) total do evento. -OK
- Ao aprovar o pagamento do pedido, os ingressos (`ticket`) correspondentes devem ser gerados com o status `VALID`.
- Caso o pagamento seja recusado ou cancelado, os assentos e ingressos selecionados devem retornar ao status disponível.

---

## Visualização e Compartilhamento de Ingressos

### RF

- Deve ser possível visualizar a lista de ingressos do usuário logado ("Meus Ingressos"). -OK
- Deve ser possivel compartilhar um ingresso via link publico.(qualquer pessoa com link pode abrir) -OK
- Deve ser possível exibir o QR Code e o código hash de um ingresso individual. -OK

### RN

- O usuário deve estar logado para acessar a sua área de "Meus Ingressos".
- O código hash do ingresso (`hash_code`) deve ser assinado digitalmente para evitar adulteração e falsificação. -OK

---

## Validação na Portaria

### RF

- Deve ser possível validar um ingresso utilizando a leitura do QR Code pela câmera. -OK
- Deve ser possível validar um ingresso digitando manualmente o seu código hash (`hash_code`). -OK

### RN

- Não deve ser possível validar um ingresso caso o usuário logado não seja do perfil `GATEKEEPER` (Portaria). -OK
- Ao validar um ingresso com status `VALID`, o seu status deve ser alterado para `USED` e devem ser registrados o horário (`validated_at`) e o responsável (`validated_by`). -OK
- Não deve ser possível validar um ingresso que já esteja com o status `USED` (retornar mensagem de "Ingresso já utilizado"). -OK
- Não deve ser possível validar um ingresso que pertença a outro evento ou que possua um hash inexistente. -OK

---
