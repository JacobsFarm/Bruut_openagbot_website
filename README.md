# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

##Clone repo

```sh
git clone https://github.com/JacobsFarm/website.git
```
```sh
npm install
```
```sh
npm run build
```
```sh
npm run dev -- --open
```
or when want viewed on phone for example
```sh
npm run dev -- --open --host
```

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
npx sv@0.12.4 create --template minimal --types ts --add prettier eslint sveltekit-adapter="adapter:static" mdsvex paraglide="languageTags:en, nl+demo:yes" --install npm .
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Commit

```sh
git init
git add .
git commit -m "Lokale wijzigingen opslaan voor pull"
git pull origin main --rebase
git push origin main 
```
