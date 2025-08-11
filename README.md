# Projeto AmorSaúde - Sistema de Gestão de Clínicas

Sistema completo **AmorSaúde**, que inclui backend em **Laravel** e frontend em **Angular** para gerenciamento de clínicas médicas.

---

## Link da Demo do Sistema Frontend (Angular)

Você pode acessar a versão online e funcional do frontend Angular neste link:  
👉 https://amorsaude-demo.netlify.app/login

---

## Sobre o Projeto

O sistema permite:

- Cadastrar, editar, visualizar e excluir clínicas.
- Navegação e visualização responsiva com Bootstrap.
- Estrutura backend RESTful com Laravel para CRUD das clínicas.
- Frontend moderno em Angular com interface amigável.

---

## Estrutura do Repositório

- `/backend` - Backend Laravel (API, controllers, models, rotas).  
- `/frontend` - Frontend Angular (componentes, serviços, páginas).  
- `/database` - Scripts SQL para criação e povoamento do banco de dados (ex: estrutura.sql).  

---

## Scripts SQL para o Banco de Dados

No diretório `/database` está o arquivo com as queries SQL que criam as tabelas e/ou povoam o banco de dados. Para utilizar:

1. Importe o arquivo SQL no seu servidor MySQL local, usando comandos como:  


2. Alternativamente, você pode abrir o arquivo no seu client MySQL favorito e executar as queries manualmente.

---

## Como Rodar o Projeto Localmente

### Backend (Laravel)

1. Entre na pasta `backend`:


2. Instale as dependências:


3. Configure o arquivo `.env`, crie o banco e rode as migrações (caso queira usar migrations ao invés do SQL):


4. Inicie o servidor Laravel:

### Frontend (Angular)

1. Entre na pasta `frontend`:



2. Instale dependências:



3. Inicie a aplicação Angular:

