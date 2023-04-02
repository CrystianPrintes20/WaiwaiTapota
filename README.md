# Waiwai Tapota

<!---Esses são exemplos. Veja https://shields.io para outras pessoas ou para personalizar este conjunto de escudos. Você pode querer incluir dependências, status do projeto e informações de licença aqui--->

![GitHub repo size](https://img.shields.io/github/repo-size/iuricode/README-template?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/iuricode/README-template?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/iuricode/README-template?style=for-the-badge)
![Bitbucket open issues](https://img.shields.io/bitbucket/issues/iuricode/README-template?style=for-the-badge)
![Bitbucket open pull requests](https://img.shields.io/bitbucket/pr-raw/iuricode/README-template?style=for-the-badge)

<img src="exemplo-image.png" alt="exemplo imagem">

> Linha adicional de texto informativo sobre o que o projeto faz. Sua introdução deve ter cerca de 2 ou 3 linhas. Não exagere, as pessoas não vão ler.

### Ajustes e melhorias

O projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas nas seguintes tarefas:

- [ ] Enviar email ao usuário para confirmar cadastro na plataforma.
- [ ] Trocar o input "categoria" por um combobox trazendo da API todas as categorias cadastradas e caso a que o usuário procure não esteja listada, deverá ser adicionado o campo para adicionar no banco de dados.

## Sobre o Waiwai Tapota

Waiwai Tapota é um projeto de tradução de linguas maternas brasileiras faciltando dividido em três partes principais: API manager, Aplicativo mobile e sistema web.

Vá para http://www.ufopa.edu.br/ufopa/ para obter mais informações e documentação.

## 🚀 Primeiros passos

Para instalar o Waiwai Tapota web, siga estas etapas:

### 1. Clone o repositório e instale dependências

```
git clone https://github.com/CrystianPrintes20/WaiwaiTapota.git
cd WaiwaiTranslator
```

### 2. Instalação do NVM

> _Caso ja tenha o node.js na versão v16 e NVM instado pode pular para o proximo passo._

Instalação do NVM Linux e macOS:

```
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

ou

$ wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
```

Instalação do NVM Windows:

```
Acesse para instalar o nvm: https://learn.microsoft.com/pt-br/windows/dev-environment/javascript/nodejs-on-windows
```

Instalar a versão do Node.js

```
 nvm install v16.13.0
```

### 3. Instalando as depencias do projeto

Ainda dentro da pasta WaiwaiTranslator execute o comando abaixo

```
 nvm install

 ou

 yarn
```

## ☕ Inicie o aplicativo

Apos concluir todas as etapas anteriores, execute o comando:

```
npm run dev

ou

yarn dev
```

## Executando com Docker

### Montando imagem

```
# Necessário instalar pacote
docker build -t waiwaitapota-frontend .
```

### Executando imagem

```
docker run -p 3000:3000 waiwaitapota-frontend
```

## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE.md) para mais detalhes.

[⬆ Voltar ao topo](#nome-do-projeto)<br>
