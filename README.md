# 📚 Backend Challenge - Dot Digital Group

## 🎯 Objetivo

Desenvolver uma **REST API em Node.js** para gerenciamento de cursos, turmas e usuários.

### Requisitos

1. Deve ser possível criar, atualizar e excluir um curso. O curso deve possuir título, descrição, temas (inovação, tecnologia, marketing, empreendedorismo, agro) e URL de imagem ;
2. Deve ser possível criar, atualizar e excluir uma turma para um curso. Um curso pode ter múltiplas turmas. A turma deve possuir título, descrição, quantidade de vagas, status (disponível, encerrado), data de início e data de fim;
3. Deve ser possível criar e excluir um usuário. O usuário deve possuir nome e email.

### Casos de uso

1. Deve ser possível criar um curso e criar turmas para esse curso;
2. Cursos com turmas disponíveis devem ser listadas em um endpoint para visualização e deve possuir os seguintes filtros: filtro por título e filtro por temas;
3. Deve ser possível matricular um usuário em uma turma disponível;
4. Não deve permitir matricular um usuário em turmas encerradas ou fora da data de início e fim;
5. Deve ser possível listar todos os cursos que um usuário está matriculado;
6. Um usuário não deve conseguir se matricular em mais de uma turma para o mesmo curso.

### Fora de escopo

1. Não é necessário implementar login e autenticação para o usuário.

## 🛠️ Tecnologias Utilizadas

- **Node.js** → runtime do backend.
- **Express.js** → framework para criação dos endpoints REST.
- **MySQL** → banco de dados relacional.
- **TypeORM** → ORM para modelagem e persistência.
- **Jest** → testes unitários.
- **Supertest** → testes de integração para endpoints HTTP.
- **Docker & Docker Compose** → containerização da aplicação e banco.
- **Dotenv** → gerenciamento de variáveis de ambiente.
- **Nodemon** → hot reload em desenvolvimento.
- **Swagger (OpenAPI)** → documentação dos endpoints.

## 🧪 Metodologia

- **DDD (Domain Driven Design)** → Implementação parcial e adaptada da organização do código em camadas (domain, application, infrastructure).
- **DTOs (Data Transfer Objects)** → Padronização e tratamento de entrada e saída de dados.

## 📂 Estrutura de Pastas (sugestão)

```
<root>
├── src/
│    ├── database/migrations
│    ├── domains/
│    │    ├── course/
│    │    │    ├── dto/
│    │    │    ├── entities/
│    │    │    ├── usecases/
│    │    │    ├── validations/
│    │    │    └── controllers/
│    │    ├── cohort/
│    │    ├── user/
│    │    └── enrollment/
│    ├── middlewares/
│    ├── routes/
│    ├── swagger/
│    ├── utils/
│    ├── app.js
│    ├── data-source.js
│    └── index.js
└── tests/
     ├── integration/
     └── unit/
```

## 🚀 Etapas de Desenvolvimento

<details>
    <summary>✅ 1. Configuração inicial</summary>

- Criar projeto Node.js com Express
- Configurar TypeORM + MySQL
- Configurar Docker

</details>

<details>
    <summary>✅ 2. Implementação do CRUD de Cursos (Courses)</summary>

- Criar Migrations e definir Entidade nos parâmetros do ORM
- Definir Rotas
- Implementar Controller e UseCases
- Aplicar Validações e Tratamentos através de DTOs em entradas e saídas

</details>

<details>
    <summary>✅ 3. Testes Unitários/Integração para Cursos</summary>

- Teste Unitários com Jest
- Teste Integração com Supertest
- Cobrir casos de sucesso e falha

</details>

<details>
    <summary>✅ 4. Documentar Endpoints de Cursos</summary>

- Configurar Swagger
- Implementar documentações para Endpoints e DTOs

</details>

<details>
    <summary>✅ 5. Implementação do CRUD de Turmas (Cohorts)</summary>
Obs: Turma se chamará Cohort, pois o nome Class conflitaria com termo reservado da linguagem

- Criar Migrations e definir Entidade nos parâmetros do ORM
- Definir Rotas
- Implementar Controller e UseCases
- Aplicar Validações e Tratamentos através de DTOs em entradas e saídas

</details>

<details>
    <summary>✅ 6. Testes Unitários/Integração para Turmas</summary>

- Teste Unitários com Jest
- Teste Integração com Supertest
- Cobrir casos de sucesso e falha

</details>

<details>
    <summary>✅ 7. Documentar Endpoints de Turmas</summary>

- Implementar documentações para Endpoints e DTOs

</details>

<details>
    <summary>✅ 8. Implementação do CRUD de Usuários (Users)</summary>

- Criar Migrations e definir Entidade nos parâmetros do ORM
- Definir Rotas
- Implementar Controller e UseCases
- Aplicar Validações e Tratamentos através de DTOs em entradas e saídas

</details>

<details>
    <summary>✅ 9. Testes Unitários/Integração para Usuários</summary>

- Teste Unitários com Jest
- Teste Integração com Supertest
- Cobrir casos de sucesso e falha

</details>

<details>
    <summary>✅ 10. Documentar Endpoints de Usuários</summary>

- Implementar documentações para Endpoints e DTOs

</details>

<details>
    <summary>⬜ 11. Implementação e Documentação de Turmas Disponíveis por Curso</summary>

- Adicionar filtro de turma disponível por curso (`status=disponível`) ao endpoint `GET /courses`
- Aplicar regras de negócio:
    - Apenas cursos com turmas disponíveis (`status=disponível` e `vacancies > 0`) devem ser retornados quando filtrados por `status=disponível`
- Criar testes unitários e de integração cobrindo esse novo filtro
- Documentar endpoint `GET /courses?status=disponível` com filtros (title, theme)

</details>

<details>
    <summary>⬜ 12. Implementação do CRUD de Matrículas (Enrollments)</summary>

- Criar Migrations e definir Entidade `Enrollment` com status (`ativo`, `trancado`, `abandonado`, `concluído`)
- Definir Rotas:
  - `POST /enrollments` → matricular usuário em turma disponível
  - `PATCH /enrollments/:id` → atualizar status da matrícula (mantendo histórico)
  - `GET /users/:id/courses` para listar cursos em que o usuário está ou esteve matriculado
- Implementar Controller e UseCases com regras de negócio:
  - Não permitir matrícula em turmas encerradas ou fora da data de início/fim
  - Impedir múltiplas matrículas ativas para o mesmo curso
  - Permitir nova matrícula em outra turma do mesmo curso se status anterior for diferente de `ativo`
- Aplicar validações e tratamentos via DTOs em entradas e saídas

</details>

<details>
    <summary>⬜ 13. Testes Unitários/Integração para Matrículas</summary>

- Testes Unitários com Jest para entidade, DTOs e regras de negócio
- Testes de Integração com Supertest para endpoints (`POST /enrollments`, `PATCH /enrollments/:id`, `GET /users/:id/courses`)
- Cobrir casos de sucesso e falha:
  - Matrícula válida
  - Tentativa em turma encerrada ou fora do período
  - Tentativa duplicada no mesmo curso
  - Atualização de status e re-matrícula em nova turma
  - Listagem de cursos disponíveis com filtros
  - Listagem de cursos do usuário com histórico de matrículas

</details>

<details>
    <summary>⬜ 14. Documentar Endpoints de Matrículas</summary>

- Documentar no Swagger/OpenAPI os endpoints de matrícula (`POST`, `PATCH`)
- Documentar DTOs de entrada e saída com exemplos de status (`ativo`, `trancado`, `abandonado`, `concluído`)
- Documentar endpoint `GET /users/:id/courses` incluindo histórico de matrículas e HATEOAS links

</details>

<details>
    <summary>⬜ 15. Finalização</summary>

- Ajustes finais

</details>
