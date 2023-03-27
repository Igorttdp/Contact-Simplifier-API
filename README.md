# Contact Simplifier API

Esta é a documentação da API Contact Simplifier, que permite aos usuários gerenciar contatos.

## Como Rodar o APP

<br>
No terminal, digite:

```
git clone git@github.com:Igorttdp/Contact-Simplifier-API.git
```

```
cd Contact-Simplifier-API
```

<br>

Instale as dependências

```
npm install

ou

yarn install
```

<br>

Configure o arquivo .env com suas credenciais:

```
PGHOST=localhost
PGPORT=5432
PGUSER=seuUsuário
PGPASSWORD=suaSenha
PGDATABASE=suaDatabase
SECRET_KEY=suaSecretKey
```

<br>

Rode as migrações:

```
npx typeorm migration:run -d src/data-source.ts

ou

yarn typeorm migration:run -d src/data-source.ts
```

<br>

Inicialize a aplicação:

```
npm run dev

ou

yarn dev
```

<br>

Se tudo ocorrer bem você verá algo assim no seu terminal:

```
$ yarn dev
yarn run v1.22.19
$ ts-node-dev --ignore-watch node_modules src/server.ts
[INFO] 05:04:13 ts-node-dev ver. 2.0.0 (using ts-node ver. 10.9.1, typescript ver. 5.0.2)
query: SELECT * FROM current_schema()
query: CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
query: SELECT version();
Server running on port 3000
```

<br>

## Autenticação

Todos os endpoints da API, com exceção do endpoint /users que é utilizado para criar novos usuários, requerem autenticação através do token JWT.

Para obter o token JWT, envie uma requisição POST para /auth com as credenciais de um usuário existente.

Exemplo de requisição:

```
POST /login HTTP/1.1
Content-Type: application/json

{
  "email": "exemplo@exemplo.com",
  "password": "senha123"
}
```

Exemplo de resposta:

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

Inclua o token JWT retornado na resposta em todas as requisições subsequentes no header `Authorization`, como no exemplo abaixo:

```
Authorization: {
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

<br>

## Endpoints

A API possui os seguintes endpoints:

<br><br>

## POST `/users`

Este endpoint cria um novo usuário.

Parâmetros da requisição:

<ul>
    <li>name</li>
    <li>email</li>
    <li>password</li>
    <li>confirmPassword</li>
    <li>phone</li>
</ul>

Retorno

<ul>
    <li>status 201 - Usuário criado com sucesso</li>
    <li>status 400 - Erro de validação nos dados de entrada</li>
    <li>status 500 - Erro interno do servidor</li>
</ul>

Exemplo de requisição:

```
POST /users HTTP/1.1
Content-Type: application/json

{
  "name": "Exemplo",
  "email": "exemplo@exemplo.com",
  "password": "senha123"
  "confirmPassword": "senha123"
  "phone": "11222223333"
}
```

<br>

Exemplo de resposta:

```
{
  "id": "8ae4fa1d-eb7c-44c5-8e8e-a749140e76ef",
  "name": "Exemplo",
  "email": "exemplo@exemplo.com",
  "phone": 11222223333,
  "created_at": "2022-03-29T20:40:00.000Z",
  "updated_at": "2022-03-29T20:40:00.000Z"
}
```

<br><br>

## POST `/login`

Parâmetros da requisição:

<ul>
    <li>email</li>
    <li>password</li>
</ul>

Retorno

<ul>
    <li>status 200 - Login feito com sucesso</li>
    <li>status 400 - Erro de validação nos dados de entrada</li>
    <li>status 500 - Erro interno do servidor</li>
</ul>

Exemplo de requisição:

```
POST /login HTTP/1.1
Content-Type: application/json

{
  "email": "exemplo@exemplo.com",
  "password": "senha123"
}
```

<br>

Exemplo de resposta:

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

<br><br>

## GET `/profile`

Endpoint para obter informações do perfil do usuário autenticado. Requer um token de autenticação válido para acessar.

Parâmetros
<br><br>
Nenhum.

Retorno

<ul>
    <li>status 200 - Requisição feita com sucesso</li>
    <li>status 401 - Retorna um erro de autenticação se o token fornecido não for válido.</li>
    <li>status 500 - Erro interno do servidor</li>
</ul>

<br>

Exemplo de resposta:

```
{
  "id": "8ae4fa1d-eb7c-44c5-8e8e-a749140e76ef",
  "name": "Exemplo",
  "email": "exemplo@exemplo.com",
  "phone": 11222223333,
  "created_at": "2022-03-29T20:40:00.000Z",
  "updated_at": "2022-03-29T20:40:00.000Z"
}
```

## PATCH `/profile`

Endpoint para atualizar as informações do perfil do usuário autenticado. Requer um token de autenticação válido para acessar.

Parâmetros da requisição:

<ul>
    <li>name</li>
    <li>email</li>
    <li>password</li>
    <li>phone</li>
</ul>

Retorno

<ul>
    <li>status 200 - Atualização feita com sucesso</li>
    <li>status 400 - Erro de validação nos dados de entrada</li>
    <li>status 401 - Erro de autenticação se o token fornecido não for válido.</li>
    <li>status 500 - Erro interno do servidor</li>
</ul>

<br>

Exemplo de resposta:

```
{
  "id": "8ae4fa1d-eb7c-44c5-8e8e-a749140e76ef",
  "name": "Atualizado",
  "email": "atualizado@exemplo.com",
  "phone": "99888887777",
  "created_at": "2022-03-29T20:40:00.000Z",
  "updated_at": "2022-03-29T22:00:00.000Z"
}
```

<br><br>

## DELETE `/profile`

Endpoint para excluir a conta do usuário autenticado. Requer um token de autenticação válido para acessar.

Parâmetros
<br>
Nenhum.

Retorno

<ul>
    <li>status 204 - Retorna uma resposta vazia se a conta foi excluída com sucesso.</li>
    <li>status 401 - Erro de autenticação se o token fornecido não for válido.</li>
    <li>status 500 - Erro interno do servidor</li>
</ul>

<br>

Exemplo de resposta:

```
DELETE /profile HTTP/1.1 204 No Content
```

<br><br>

## POST `/contacts`

Cria um novo contato para o usuário autenticado.

Parâmetros da requisição:

<ul>
    <li>name</li>
    <li>email</li>
    <li>secundary_email</li>
    <li>phone</li>
</ul>

Retorno

<ul>
    <li>status 200 - Atualização feita com sucesso</li>
    <li>status 400 - Erro de validação nos dados de entrada</li>
    <li>status 401 - Erro de autenticação se o token fornecido não for válido.</li>
    <li>status 500 - Erro interno do servidor</li>
</ul>

<br>

Exemplo de resposta:

```
POST /contacts HTTP/1.1
Content-Type: application/json

{
  "name": "Fulano de Tal",
  "email": "fulano@example.com",
  "secundary_email": "fulano@example.com"
  "phone": "11999999999",
  "user_id": "8ae4fa1d-eb7c-44c5-8e8e-a749140e76ef",
  "created_at": "2022-04-01T13:45:30.000Z",
  "updated_at": "2022-04-01T13:45:30.000Z"
}
```

<br><br>

## GET `/contacts`

Retorna uma lista de contatos do usuário autenticado.

Parâmetros
<br>
Nenhum.

Retorno

<ul>
    <li>status 200 - Listagem feita com sucesso</li>
    <li>status 401 - Erro de autenticação se o token fornecido não for válido.</li>
    <li>status 500 - Erro interno do servidor</li>
</ul>

<br>

Exemplo de respota:

```
[
	{
		"id": "65d243f3-502b-4c75-be35-3bd058dd96d6",
		"name": "John Doe",
		"email": "johndoe@gmail.com",
		"secundary_email": "doejohn@mail.com",
		"phone": "82999990001",
		"created_at": "2023-03-27T05:23:47.275Z",
		"updated_at": "2023-03-27T05:49:29.864Z"
	}
    	{
		"id": "5efa380b-0c79-4d83-963b-832913efaab8",
		"name": "Robert Lennon",
		"email": "robertlennon@gmail.com",
		"secundary_email": "lennonrobert@mail.com",
		"phone": "32987650121",
		"created_at": "2023-03-27T15:00:00.275Z",
		"updated_at": "2023-03-27T16:00:00.864Z"
	}
    ...
]
```

<br><br>

## PATCH `/contacts/:contactId`

Atualiza um contato existente de um usuário autenticado.

Parâmetros de URL:

<ul>
    <li>`contactId` (string): ID do contato a ser atualizado.</li>
</ul>

Parâmetros de requisição:

<ul>
    <li>name</li>
    <li>email</li>
    <li>secundary_email</li>
    <li>phone</li>
</ul>

<br>

Corpo da requisição:

```
{
  "name": "Novo nome do contato",
  "phone": "(11) 91234-5678"
}
```

Exemplo de resposta:

```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "b3d4a0be-fb16-482f-a41f-22ad29de1110",
  "name": "Novo nome do contato",
  "phone": "11912345678",
  "createdAt": "2022-04-01T18:30:00.000Z",
  "updatedAt": "2022-04-01T18:35:00.000Z"
}
```

<br><br>

## DELETE `/contacts/:contactId`

Deleta um contato existente de um usuário autenticado.

Parâmetros de URL:

<ul>
    <li>`contactId` (string): ID do contato a ser deletado.</li>
</ul>

<br>

Retorno

<ul>
    <li>status 204 - Deleção feita com sucesso</li>
    <li>status 404 - O contato com o ID especificado não foi encontrado.</li>
    <li>status 401 - Não há um token válido de autenticação ou o usuário autenticado não tem permissão para deletar o contato.</li>
    <li>status 500 - Erro interno do servidor</li>
</ul>

<br>

Exemplo de resposta:

```
HTTP/1.1 204 No Content
```
