# Projeto Loja (Fase 1 + Fase 2 + MongoDB)

**Integrantes:**
- Tony Anderson Ferreira Tomaz

Domínio: **Categorias** e **Produtos** (loja de hardware/games).

## Estrutura

```
projeto-loja/
 ├── loja-api/    Fase 1 - API Java (Spring Boot 3, Java 17, H2)
 ├── loja-front/  Fase 2 - Angular 19 consumindo a API
 └── mongodb/     Script com os 17 operadores
```

## Como rodar

Pré-requisitos: Java 17+, Maven, Node 18.19+ (ou 20+), MongoDB/mongosh (só para a parte Mongo).

### 1. Back-end (porta 8080)
```
cd loja-api
mvn spring-boot:run
```
Ou abra a pasta `loja-api` no IntelliJ/Eclipse/VS Code como projeto Maven e rode `LojaApplication`.

Teste: http://localhost:8080/api/categorias e http://localhost:8080/api/produtos
Console do banco: http://localhost:8080/h2-console (JDBC URL `jdbc:h2:mem:lojadb`, usuário `sa`, senha vazia)

### 2. Front-end (porta 4200)
```
cd loja-front
npm install
npx ng serve
```
Abra http://localhost:4200 (com o back-end rodando).

### 3. MongoDB
```
cd mongodb
mongosh --file script_mongodb.js
```
Ou cole o conteúdo no MongoSH do Compass.

## Endpoints

| Método | Rota | Ação |
| --- | --- | --- |
| GET | /api/{categorias,produtos} | Listar todos |
| GET | /api/{categorias,produtos}/{id} | Buscar por ID (404 se não existir) |
| POST | /api/{categorias,produtos} | Criar |
| PUT | /api/{categorias,produtos}/{id} | Editar |
| DELETE | /api/{categorias,produtos}/{id} | Deletar |
