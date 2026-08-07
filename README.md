# ocelot-website

## Entering the development environment

```sh
nix develop
```

## Installing dependencies

```sh
npm install -D @my-dependency/here
```

## Developing

Start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open

# or start the server and make it available on the local network
npm run dev -- --host
```

## Exiting the development environment

```sh
exit
```

## Building

To create a production version of your app:

```sh
nix build
```
You can preview the production build with `nix run`.

To create a Docker container for your app:

```sh
nix build .#docker
```

## Example Compose

To run the build with Docker Compose:

```docker
services:
  ocelot-website:
    image: ghcr.io/realhypnoticocelot/ocelot-website:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```
