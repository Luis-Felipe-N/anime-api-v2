# anime-api-v2
Esta API foi desenvolvida com os princípios do DDD, visando a separação completa da lógica de domínio da sua implementação externa. Isso permite a integração de dados provenientes de diversas fontes sem afetar a estrutura interna da lógica.

## Documentação da Aplicação :weight_lifting:
Este repositório contém a implementação da api de animes, uma aplicação construída em:

- Node.js 18
- NPM 9.8.1

## Instalação e configuração :computer:
- Faça o clone deste repositório: `git clone`
- Certifique-se de ter o Node.js 18 e NPM 9.8.1 instalados em sua máquina.
- Copie o arquivo **.env.example** para **.env** na raiz do projeto e defina as variáveis de ambiente necessárias para o seu ambiente.
- Execute `npm install` na pasta raiz do projeto para criar instalar as dependências.
- Por fim, execute `npm run dev` para subir a aplicação em modo de desenvolvimento.

## Autenticação :closed_lock_with_key:
A aplicação utiliza o modo de Credentials.

## RFs (Requisitos funcionais)
- [ ] Deve ser possível pegar animes do ***animesonlinecc.to***;
- [ ] Deve ser possível pegar animes do ***crunchyroll***;
- [ ] Deve ser possível pegar filmes do ***vizer.tv***;

- [x] Deve ser possível listar todos episódios de um anime - com paginação;
- [ ] Deve ser possível listar os comentários de um episódio - com paginação;
- [x] Deve ser possível buscar um episódio pelo slug;
- [ ] Deve ser possível buscar o próximo episódio;
- [ ] Deve ser possível buscar o episódio anterior;
- [ ] Deve ser possível salvar o bookmarking do usuário;
- [ ] Deve ser possível listar o histórico de visualização;
- [ ] Deve ser possível marcar um episódio como assistido;
- [ ] Deve ser possível avaliar um episódio;

- [ ] Deve ser possível listar todos animes - com paginação;
- [x] Deve ser possível buscar um anime pelo slug;

## RNs (Regras de negócio)

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] A ação de favoritar um anime não deve ser possível para um usuário que não está logado;
- [ ] Usuário não deve comentar em um anime caso nao esteja logado;

## RNFs (Requisitos não-funcionais)
<!-- - [ ] Alterar o background de acordo com o cover da música; -->