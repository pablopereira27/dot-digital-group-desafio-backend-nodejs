# 📚 Backend Challenge - Dot Digital Group

## 🎯 Objetivo
Desenvolver uma **REST API em Node.js** para gerenciamento de cursos, turmas e usuários.  
O sistema deve permitir:
- CRUD de cursos e turmas.  
- CRUD de usuários.  
- Matrícula de usuários em turmas disponíveis.  
- Listagem de cursos e turmas com filtros.  
- Aplicação de regras de negócio:  
  - Não permitir matrícula em turmas encerradas ou fora da data.  
  - Usuário não pode se matricular em mais de uma turma do mesmo curso.  

---

## 🛠️ Tecnologias Utilizadas
- **Node.js** → runtime do backend.  
- **Express.js** → framework para criação dos endpoints REST.  
<!-- - **MySQL** → banco de dados relacional.  
- **TypeORM** → ORM para modelagem e persistência.  
- **Jest** → testes unitários.  
- **Supertest** → testes de integração para endpoints HTTP.  
- **Docker & Docker Compose** → containerização da aplicação e banco.  
- **Dotenv** → gerenciamento de variáveis de ambiente.  
- **Nodemon** → hot reload em desenvolvimento.  
- **Swagger (OpenAPI)** → documentação dos endpoints.   -->

<!-- ---

## 🧪 Metodologia
- **TDD (Test Driven Development)** → escrever testes antes da implementação.  
- **DDD (Domain Driven Design)** → organização do código em camadas (domain, application, infrastructure).  
- **DTOs (Data Transfer Objects)** → padronização de entrada e saída de dados.   -->

---

## 📂 Estrutura de Pastas (sugestão)

```
src/
├── modules/
│    ├── courses/
│    │    ├── dto/
│    │    ├── entities/
│    │    ├── repositories/
│    │    ├── services/
│    │    └── controllers/
│    ├── users/
│    └── enrollments/
├── config/
├── database/
├── tests/
└── app.ts
```

---

## 🚀 Etapas de Implementação
1. **Configuração inicial**
   - Criar projeto Node.js com Express.
   - Configurar TypeORM + MySQL.
   - Configurar Docker.

2. **Modelagem de entidades**
   - Curso (Course).
   - Turma (Cohort, para que o nome Class não conflite com termo reservado da linguagem).
   - Usuário (User).
   - Matrícula (Enrollment).

3. **Criação dos endpoints**
   - CRUD de cursos e turmas.
   - CRUD de usuários.
   - Matrícula de usuários em turmas.
   - Listagem de cursos e turmas com filtros.

4. **Regras de negócio**
   - Validação de status e datas da turma.
   - Restrição de múltiplas matrículas no mesmo curso.

5. **Documentação**
   - Configurar Swagger para endpoints.

6. **Testes**
   - Unitários com Jest.
   - Integração com Supertest.
   - Cobrir casos de sucesso e falha.

7. **Finalização**
   - Ajustes finais.
   - Geração do pacote ZIP para entrega.