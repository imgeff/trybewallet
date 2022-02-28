
# Boas vindas ao repositório do projeto Trybe Wallet!

---


# Sumário

---

# Habilidades
Neste projeto, foram exercitadas as seguintes habilidades:

  * Criar um store Redux em aplicações React

  * Criar reducers no Redux em aplicações React

  * Criar actions no Redux em aplicações React

  * Criar dispatchers no Redux em aplicações React

  * Conectar Redux aos componentes React

  * Criar actions assíncronas na sua aplicação React que faz uso de Redux.

---

# Entregáveis

## O que deverá ser desenvolvido

Neste projeto foi desenvolvido uma carteira de controle de gastos com conversor de moedas, ao utilizar essa aplicação um usuário poderá:
  - Adicionar, remover e editar um gasto;
  - Visualizar uma tabelas com seus gastos;
  - Visualizar o total de gastos convertidos para uma moeda de escolha;

## Desenvolvimento

Você deve desenvolver uma aplicação em React que use Redux como ferramenta de manipulação de estado.

Através dessa aplicação, será possível realizar as operações básicas de criação e manipulação de um estado de redux.
## Para contribuir

1. Clone o repositório
  * `git clone git@github.com:imgeff/trybewallet.git`
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd trybewallet`

2. Instale as dependências e inicialize o projeto
  * Instale as dependências:
    * `npm install`
  * Inicialize o projeto:
    * `npm start` (uma nova página deve abrir no seu navegador com um texto simples)

3. Crie uma branch a partir da branch `master`

  * Verifique que você está na branch `master`
    * Exemplo: `git branch`
  * Se não estiver, mude para a branch `master`
    * Exemplo: `git checkout master`
  * Agora, crie uma branch onde você vai guardar os commits do seu projeto
---

## Linter

Para garantir a qualidade do código, neste projeto foi utilizado o linter ESLint. Assim o código foi alinhado com as boas práticas de desenvolvimento, sendo mais legível e de fácil manutenção! Para rodar o *linter* localmente no projeto, execute o comando abaixo: 

`npm run lint`

Aqui encontram-se os requisitos do projeto. Em cada requisito você encontrara uma imagem de um protótipo de como sua aplicação deve ficar. Estilo da página não será avaliado.

---

## Configurando o Redux DevTools
Pra usarmos o Redux DevTools com o Redux-Thunk, vamos utilizar uma biblioteca chamada `composeWithDevTools`, ela já está no package.json, a única coisa que você vai precisar fazer é configurar a sua store, por exemplo:

```
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export default store;
```

---

## Documentação da API de Cotações de Moedas

A página _web_ consome os dados da API do _awesomeapi API de Cotações_ para realizar a busca de câmbio de moedas. no seguinte _endpoint_:

- https://economia.awesomeapi.com.br/json/all

O retorno desse endpoint será algo no formato:
```
{
   {
     "USD": {
       "code":"USD",
       "codein":"BRL",
       "name":"Dólar Comercial",
       "high":"5.6689",
       "low":"5.6071",
       "varBid":"-0.0166",
       "pctChange":"-0.29",
       "bid":"5.6173",
       "ask":"5.6183",
       "timestamp":"1601476370",
       "create_date":"2020-09-30 11:32:53"
       },
      ...
   }
}
```

Se você quiser aprender mais informações sobre a API, veja a [documentação](https://docs.awesomeapi.com.br/api-de-moedas).

---
## Lista de requisitos

### Página de Login

A página possibilita a pessoa usuária fazer login, com email e senha que foram salvos no localStorage através da página /register.

  ![image](login.gif)

### Página da Carteira

Na página /wallet é onde se pode gerenciar a carteira de gastos em diversas moedas, trazendo a despesa total com base na moeda real que é representado pelo código 'BRL'.

  ![image](carteira.gif)
### Formulário de adição de Despesa

No formulário de adição de Despesa, há 5 campos em que a pessoa usuária pode indicar um valor, descrição, moeda, forma de pagamento, tag e um botão para adicionar a despesa.
### Tabela de Gastos

  * A tabela possui 9 colunas com as seguintes opções. Descrição, Tag, Método de pagamento, Valor, Moeda, Câmbio utilizado, Valor convertido e Moeda de conversão e Editar/Excluir.

#### 8. Botão Excluir

    ![image](btnExcluir.gif)

  * O botão é o último item da linha da tabela representado por uma lixeira da cor vermelha`.

  * Ao ser clicado, o botão deleta a linha da tabela e recalcula o valor da despesa total.

#### 9. Botão Editar

    ![image](btnEditar.gif)

  * O botão fica ao lado do botão de excluir e é representado pelo ícone azul`

  * Ao ser clicado, o botão habilita um formulário para editar a linha da tabela. Ao clicar em "Editar despesa" a linha da tabela é atualizada com as novas informações preenchidas no formulário.
