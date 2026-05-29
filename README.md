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
│    │    ├── courses/
│    │    │    ├── dto/
│    │    │    ├── entities/
│    │    │    ├── usecases/
│    │    │    ├── validations/
│    │    │    └── controllers/
│    │    ├── users/
│    │    └── enrollments/
│    ├── middlewares/
│    ├── routes/
│    ├── swagger/
│    ├── utils/
│    ├── app.js
│    ├── data-source.js
│    └── index.js
└── tests/
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
    <summary>⬜ 7. Documentar Endpoints de Turmas</summary>

- Implementar documentações para Endpoints e DTOs

</details>

<details>
    <summary>⬜ 8. Implementação do CRUD de Usuários (Users)</summary>

- Criar Migrations e definir Entidade nos parâmetros do ORM
- Definir Rotas
- Implementar Controller e UseCases
- Aplicar Validações e Tratamentos através de DTOs em entradas e saídas

</details>

<details>
    <summary>⬜ 9. Testes Unitários/Integração para Usuários</summary>

- Teste Unitários com Jest
- Teste Integração com Supertest
- Cobrir casos de sucesso e falha

</details>

<details>
    <summary>⬜ 10. Documentar Endpoints de Usuários</summary>

- Implementar documentações para Endpoints e DTOs

</details>

<details>
    <summary>⬜ 11. Implementação do CRUD de Matrículas (Enrollments)</summary>

- Criar Migrations e definir Entidade nos parâmetros do ORM
- Definir Rotas
- Implementar Controller e UseCases
- Aplicar Validações e Tratamentos através de DTOs em entradas e saídas

</details>

<details>
    <summary>⬜ 12. Testes Unitários/Integração para Matrículas</summary>

- Teste Unitários com Jest
- Teste Integração com Supertest
- Cobrir casos de sucesso e falha

</details>

<details>
    <summary>⬜ 13. Documentar Endpoints de Matrículas</summary>

- Implementar documentações para Endpoints e DTOs

</details>

<details>
    <summary>⬜ 14. Finalização</summary>

- Ajustes finais

</details>