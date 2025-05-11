* Installation steps:
npm install -g yarn
mkdir my-playwright-project
cd my-playwright-project
yarn init -y
yarn add -D @playwright/test typescript ts-node
yarn playwright install
yarn tsc --init
yarn add -D eslint prettier \
eslint-config-prettier eslint-plugin-prettier \
eslint-plugin-playwright \
@typescript-eslint/eslint-plugin @typescript-eslint/parser
yarn add -D allure-playwright
npm install -g allure-commandline --save-dev
yarn add -D allure-commandline
yarn add -D dotenv
yarn add winston
