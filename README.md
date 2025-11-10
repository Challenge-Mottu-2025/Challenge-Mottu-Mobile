<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** Reference style links for readability.
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="./assets/icon.png" alt="Logo" width="200" height="200">
  </a>

<h3 align="center">Organizador Mottu</h3>

  <p align="center">
    Uma startup da FIAP ajudando a Mottu com o objetivo de organizar as motos que estão nos pátios da Mottu, trazendo mais controle, praticidade e eficiência no gerenciamento da frota.
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Sumário</summary>
  <ol>
    <li>
      <a href="#sobre-o-projeto">Sobre o projeto</a>
      <ul>
        <li><a href="#ferramentas-utilizadas">Ferramentas utilizadas</a></li>
        <li><a href="#estrutura-de-pastas">Estrutura de Pastas</a></li>
      </ul>
    </li>
    <li>
      <a href="#começando">Começando</a>
      <ul>
        <li><a href="#pré-requisitos">Pré-requisitos</a></li>
        <li><a href="#instalação">Instalação</a></li>
      </ul>
    </li>
    <li><a href="#uso">Uso</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contribuições">Contribuições</a></li>
    <li><a href="#criadores">Criadores</a></li>
    <li><a href="#contato">Contato</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## Sobre o projeto

O projeto tem como principal meta otimizar a organização das motos disponíveis nos pátios da Mottu, uma empresa que atua fortemente no ramo de mobilidade urbana. Com o crescimento da frota, to[...]

Pensando nisso, o aplicativo "Organizador Mottu" foi criado para proporcionar uma solução prática e tecnológica, que permite o registro e visualização das motos de forma rápida e intuitiva.[...]

Com essa solução, a equipe da Mottu ganha em eficiência operacional, controle de inventário em tempo real e agilidade na tomada de decisões, contribuindo diretamente para a produtividade dos [...]

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

### Ferramentas utilizadas

* ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
* ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
* ![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
* ![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

## Estrutura de Pastas

Estrutura idêntica à do projeto conforme arquivos disponíveis (excluindo dependências de `node_modules/`). Caso novos arquivos sejam adicionados, atualize esta seção.

```text
.
├── App.js
├── index.js
├── app.json
├── package.json
├── package-lock.json
├── README.md
├── assets
│   ├── icon.png
│   ├── logo-mottu.png
│   ├── mottu-sport.webp
│   ├── mottu-e.webp
│   └── mottu-pop.webp
├── components
│   ├── Button.js
│   ├── Input.js
│   └── ThemeToggleButton.js
├── constants
│   ├── colors.js
│   └── theme.js
├── screens
│   ├── AdminScreen.js
│   ├── DashboardScreen.js
│   ├── DetailsScreen.js
│   ├── HomeScreen.js
│   ├── LoginScreen.js
│   ├── MotoScreen.js
│   ├── OpcoesScreen.js
│   ├── RegisterScreen.js
│   ├── UserLoginScreen.js
│   └── UserRegisterScreen.js
├── services
│   ├── api.js
│   └── authStorage.js
├── theme
│   └── ThemeContext.js
└── utils
    └── auth.js
```

Descrição rápida:
- assets: Imagens e ícones usados nas telas (logo e imagens das motos).
- components: Componentes reutilizáveis (botões, inputs e FAB de troca de tema).
- constants: Tokens/cores e temas claros/escuros.
- screens: Telas do aplicativo organizadas por funcionalidade.
- services: Integrações (API base e armazenamento seguro de token).
- theme: Contexto de tema (ThemeProvider e hook).
- utils: Utilidades (funções de autenticação/local storage).
- App.js / index.js: Entradas principais (registro e configuração de navegação).
- app.json: Configurações do Expo.
- package.json / lock: Metadados e dependências.

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

## Começando

Este projeto foi desenvolvido utilizando React Native com Expo, o que facilita o processo de desenvolvimento e execução em diferentes dispositivos. Siga os passos abaixo para clonar o repositór[...]

### Pré-requisitos

Você precisa instalar o instalador de pacotes "npm" para conseguir rodar o projeto.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Instalação

1. Clone o repositório
   ```sh
   git clone https://github.com/Challenge-Mottu-2025/Challenge-Mottu-Mobile.git
   ```
2. Instale os pacotes com npm
   ```sh
   npm install
   ```
3. Altere a URL remota do Git para evitar envios acidentais ao projeto base
   ```sh
   git remote set-url origin https://github.com/Challenge-Mottu-2025/Challenge-Mottu-Mobile.git
   git remote -v # Confirme as mudanças
   ```

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

## Uso

Com tudo pronto e o ambiente corretamente configurado, o usuário já pode explorar o sistema de CRUD de motos da Mottu. É possível cadastrar, visualizar, editar e excluir motos de maneira simp[...]

Além disso, o projeto conta com uma interface animada, fluida e visualmente agradável, garantindo uma experiência moderna e intuitiva para o gerenciamento da frota nos pátios da Mottu.

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

## Contribuições

Contribuições são o que tornam a comunidade de código aberto um lugar incrível para aprender, inspirar e criar. Qualquer contribuição que você fizer será muito bem-vinda.

Se você tiver alguma sugestão para melhorar este projeto, faça um fork do repositório e envie um pull request. Você também pode simplesmente abrir uma issue com a tag "enhancement" (melhori[...]  
Não se esqueça de deixar uma estrela no projeto! Muito obrigado!

1. Dê "Fork" no projeto  
2. Crie sua branch (`git checkout -b feature/AmazingFeature`)  
3. Commit suas alterações (`git commit -m 'Add some AmazingFeature'`)  
4. Sincronize com sua branch (`git push origin feature/AmazingFeature`)  
5. Abra um "Pull Request"  

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

### Principais contribuidores

<a href="https://github.com/Challenge-Mottu-2025/Challenge-Mottu-Mobile/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Challenge-Mottu-2025/Challenge-Mottu-Mobile" alt="contrib.rocks image" />
</a>

## Contato

João Broggine - https://www.linkedin.com/in/joaobroggine/ | joaovitorbrogginelopes@gmail.com

João Vitor Cândido - https://www.linkedin.com/in/jvictor0507/

Eduardo Augusto Pelegrino Einsfeldt - https://www.linkedin.com/in/eduardo-augusto-pelegrino-einsfeldt-289722247/

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>
