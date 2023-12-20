# :desktop_computer: Amigo Secreto Application

<img src="./assets/cover.png" alt="Cover projeto" />

## :briefcase: Stacks

- Next (TypeScript/JavaScript)
- Node (Express)
- SQL (PostgreSQL/Prisma)

## :hammer: Tools

- Git
- NodeJs
- Yarn
- VS Code

## :fire: Run

- Serve Development Migrate: `yarn migrate:dev`
- Server Development (Port 3000): `yarn dev`

- Serve Build Migrate: `yarn migrate:deploy`
- Server Build: `yarn build`
- Server Start: `yarn start`
- Server Forever: `yarn forever:start`

- Web Development (Port 3001): `yarn dev`
- Web Build: `yarn build`

## :triangular_flag_on_post: Environment Variables

- Server Ambient Environment: `NODE_ENV`
- Server Port: `PORT`
- Server Database URL: `DATABASE_URL`
- Server Security Token: `DEFAULT_TOKEN`
- Server SSL KEY: `SSL_KEY`
- Server SSL CERTIFICATE: `SSL_CERT`

- Web Server URL: `NEXT_SERVER_URL`

## :page_facing_up: Docs

<details>
<summary>:rocket: Regras de Negócio</summary>

#### 1 - REQUISITOS PROJETO:

**Painel Administrativo:**
    - Cadastrar EVENTOS
    - Cadastrar GRUPOS
    - Cadastrar PESSOAS

**Site:**
    - Acessar tela do EVENTO

**Características:**
    - O banco não pode identificar quem tirou quem
    - Sorteio ocoore no momento do CADASTRO
    - O painel de administação deve ter senha única

</details>

<details>
<summary>:ledger: Banco de Dados</summary>

#### 2 - BANCO DE DADOS:
    - EVENTO
    - GRUPO
    - PESSOA

**events:**
    - id INT PK AUTO_INCREMENT
    - status BOOLEAN default=false
    - title VARCHAR
    - description VARCHAR
    - grouped BOOLEAN default=false

**eventGroups:**
    - id INT PK AUTO_INCREMENT
    - id_event INT (events.id)
    - name VARCHAR

**eventPeople:**
    - id INT PK AUTO_INCREMENT
    - id_event INT (events.id)
    - id_group INT (eventGroups.id)
    - name VARCHAR
    - cpf VARCHAR
    - matched VARCHAR default=""

</details>


<details>
<summary>:bus: Rotas</summary>

#### 3 - ROTAS:

**Privada:**
    - POST /admin/login

    - GET /admin/events
    - GET /admin/events/:id
    - POST /admin/events
    - PUT /admin/events/:id
    - DELETE /admin/events/:id

    - GET /admin/events/:id_event/groups
    - GET /admin/events/:id_event/groups/:id
    - POST /admin/events/:id_event/groups
    - PUT /admin/events/:id_event/groups/:id
    - DELETE /admin/events/:id_event/groups/:id

    - GET /admin/events/:id_event/groups/:id_group/people
    - GET /admin/events/:id_event/groups/:id_group/people/:id
    - POST /admin/events/:id_event/groups/:id_group/people
    - PUT /admin/events/:id_event/groups/:id_group/people/:id
    - DELETE /admin/events/:id_event/groups/:id_group/people/:id

**Pública:**
    - GET /events/:id
    - GET /events/:id_event/people?cpf=123

    - /
    - /events/[id_event]

</details>
