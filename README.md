Desafio Fullstack: Os Anéis de Poder
Projeto SOLID + MVC
Descrição
Este repositório contém o projeto desenvolvido durante a aula sobre SOLID e MVC: uma API Rest completa com Node.js, TypeScript, Express e Prisma. O projeto permite o cadastro de produtos, além de possibilitar a venda e compra desses produtos, ajustando o estoque conforme necessário. Também inclui uma interface simples em React para visualizar e gerenciar os produtos.

SOLID
https://images.app.goo.gl/byPbYNPnq7DLFumQ8

MVC
https://images.app.goo.gl/nsXXTgZAxY6aHxsq7

Tecnologias Utilizadas
Backend
Node.js
TypeScript
Express
Prisma
SQLite
Jest (para testes unitários)
Frontend
React
Cypress (para testes end-to-end)
Axios (para requisições HTTP)
React Hook Form (para gerenciamento de formulários)
React Slick e Slick Carousel (para o carrossel de produtos)
TypeScript
Tailwind CSS (para estilos)
Estrutura do Projeto
Backend
Criar (POST) um novo anel

Endpoint: /api/rings
Requisitos: Nome, poder, portador, forjadoPor, imagem
Regras de Negócio:
Elfos: Máximo de 3 anéis
Anões: Máximo de 7 anéis
Homens: Máximo de 9 anéis
Sauron: Apenas 1 anel
Listar (GET) todos os anéis

Endpoint: /api/rings
Retorna uma lista com todos os anéis e suas propriedades.
Atualizar (PUT) um anel

Endpoint: /api/rings/:id
Atualiza as informações de um anel específico.
Deletar (DELETE) um anel

Endpoint: /api/rings/:id
Remove um anel do banco de dados.
Frontend
Tela de Criação/Atualização

Formulário para criar ou atualizar um anel.
Campos: Nome, poder, portador, forjadoPor, imagem.
Botões: Criar e Atualizar.
Tela de Visualização

Exibição dos anéis em um carrossel.
Mostra as informações de cada anel: nome, poder, portador, forjadoPor e imagem.
Instalação e Execução
Backend
Clone o repositório

bash
Copiar código
git clone <URL_DO_REPOSITORIO>
cd <DIRETORIO_DO_PROJETO>
Instale as dependências

bash
Copiar código
npm install
Configure o banco de dados

Edite o arquivo .env com as configurações do banco de dados.
Execute as migrações:
bash
Copiar código
npx prisma migrate dev
Inicie o servidor

bash
Copiar código
npm start
Frontend
Clone o repositório

bash
Copiar código
git clone <URL_DO_REPOSITORIO>
cd <DIRETORIO_DO_PROJETO>
Instale as dependências

bash
Copiar código
npm install
Inicie o servidor de desenvolvimento

bash
Copiar código
npm start
Testes
Backend
Testes unitários com Jest
bash
Copiar código
npm test
Frontend
Testes end-to-end com Cypress
bash
Copiar código
npx cypress open
root  do projeto final.
│
├── /backend
│   ├── /src
│   │   ├── /controllers
│   │   │   └── ring.controller.ts  // Controlador para lidar com as rotas relacionadas aos anéis
│   │   │
│   │   ├── /entities
│   │   │   └── ring.ts  // Definição da entidade Ring (Anel)
│   │   │
│   │   ├── /repositories
│   │   │   ├── ring.repository.ts  // Interface do repositório de anéis
│   │   │   └── ring.repository.prisma.ts  // Implementação usando Prisma
│   │   │
│   │   ├── /services
│   │   │   ├── ring.service.ts  // Interface RingService,DTO para entrada, saida, lista de anéis.
│   │   │   └── ring.service.implementation.ts  // Implementação do RingService
│   │   │
│   │   │
│   │   ├── /api
│   │   │   └── api.express.ts  // Definição das rotas da API relacionadas a anéis
│   │   │
│   │   ├── /controller
│   │   │   └── ring.controller.ts  // controller para tratamento de erros
│   │   │
│   │   ├── /prisma
│   │   │   └── schema.prisma  // Arquivo de esquema do Prisma para o banco de dados
│   │   │
│   │   ├── /config
│   │   │   └── database.config.ts  // Configuração do banco de dados
│   │   │
│   │   └── server.ts  // Arquivo principal para rodar o servidor Express
│   │
│   └── /tests
│       ├── /integration
│       │   └── ring.controller.test.ts  // Testes de integração para o controlador de anéis
│       └── /unit
│           └── ring.service.test.ts  // Testes unitários para o serviço de anéis
│
├── /frontend
│   ├── /src
│   │   ├── /components
│   │   │   ├── Header.tsx  // Componente do cabeçalho
│   │   │   ├── RingForm.tsx  // Formulário para criar/atualizar anéis
│   │   │   ├── RingList.tsx  // Componente para listar os anéis
│   │   │   └── Footer.tsx  // Componente do rodapé
│   │   │── api.ts  // Configuração de Axios ou métodos auxiliares para chamadas à API
│   │   │
│   │   │── /public 
│   │   │
│   │   ├── app.css  // Estilos globais do frontend
│   │   │     
│   │   │   
│   │   │
│   │   └── index.tsx  // Arquivo principal do React
│   │
│   └── /tests
│       ├── /e2e
│       │   └── ring.e2e.test.ts  // Testes de fim a fim com Cypress
│       └── /unit
│           └── ring.service.test.ts  // Testes unitários para o serviço de anéis no frontend
│
├── /docs
│   └── README.md  // Documentação do projeto com instruções de uso
│
│
├── package.json  // Configurações de dependências do projeto
├── tsconfig.json  // Configurações do TypeScript
├── tailwind.config.js  // Configuração do Tailwind para o projeto frontend

Licença
Este projeto é licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.